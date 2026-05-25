import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getActivePositions, COUNTRY_OPTIONS, EXPERIENCE_OPTIONS } from "@/data/career";
import { resolveResendFrom, trimStr } from "@/lib/resendFrom";

export const runtime = "nodejs";

const DEFAULT_TO = "gfa@glozonfintax.com";
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_CV_EXT = /\.(pdf|doc|docx)$/i;

const EMAIL_RE =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const POSITION_IDS = new Set([
  ...getActivePositions().map((p) => p.id),
  "other",
]);

function safeFilename(name) {
  return String(name || "CV")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 80);
}

async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return { error: "Expected multipart form data with CV file.", details: [] };
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return { error: "Could not read form data.", details: [] };
  }

  const fullName = trimStr(formData.get("fullName"));
  const email = trimStr(formData.get("email"));
  const country = trimStr(formData.get("country"));
  const mobile = trimStr(formData.get("mobile"));
  const positionId = trimStr(formData.get("positionId"));
  const positionOther = trimStr(formData.get("positionOther"));
  const experience = trimStr(formData.get("experience"));
  const linkedIn = trimStr(formData.get("linkedIn"));
  const message = trimStr(formData.get("message"));
  const cvFile = formData.get("cv");

  const details = [];
  const positions = getActivePositions();
  const position =
    positionId === "other"
      ? { id: "other", title: positionOther || "Other" }
      : positions.find((p) => p.id === positionId);

  if (!fullName) details.push("Full name is required.");
  else if (fullName.length < 2) details.push("Full name must be at least 2 characters.");
  else if (fullName.length > 200) details.push("Full name is too long.");

  if (!email) details.push("Email is required.");
  else if (/\s/.test(email) || !EMAIL_RE.test(email)) details.push("Please enter a valid email address.");

  if (!country) details.push("Country is required.");
  else if (!COUNTRY_OPTIONS.includes(country)) details.push("Please select a valid country.");

  if (!mobile) details.push("Mobile number is required.");
  else if (/[a-zA-Z]/.test(mobile) || !/^\+?[\d\s\-()]+$/.test(mobile)) {
    details.push("Please enter a valid mobile number.");
  } else {
    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 8) details.push("Mobile number must have at least 8 digits.");
    else if (digits.length > 15) details.push("Mobile number cannot exceed 15 digits.");
  }

  if (!positionId || !POSITION_IDS.has(positionId)) {
    details.push("Please select a position.");
  } else if (positionId === "other" && positionOther.length < 2) {
    details.push("Please specify the position you are applying for.");
  } else if (positionId !== "other" && !position) {
    details.push("Selected position is not available.");
  }

  if (!experience) details.push("Experience is required.");
  else if (!EXPERIENCE_OPTIONS.includes(experience)) details.push("Please select a valid experience level.");

  if (linkedIn && !/^https?:\/\/.+/i.test(linkedIn)) {
    details.push("LinkedIn URL must start with http:// or https://");
  }

  if (!message) details.push("Cover letter / message is required.");
  else if (message.length < 20) details.push("Message must be at least 20 characters.");
  else if (message.length > 8000) details.push("Message is too long.");

  if (!cvFile || typeof cvFile === "string") {
    details.push("CV / resume file is required.");
  } else {
    const name = cvFile.name || "cv";
    if (!ALLOWED_CV_EXT.test(name)) {
      details.push("CV must be a PDF, DOC, or DOCX file.");
    }
    if (cvFile.type && !ALLOWED_CV_TYPES.has(cvFile.type)) {
      details.push("CV file type is not allowed. Use PDF, DOC, or DOCX.");
    }
    if (cvFile.size > MAX_CV_BYTES) {
      details.push("CV file must be 5 MB or smaller.");
    }
    if (cvFile.size === 0) details.push("CV file is empty.");
  }

  if (details.length > 0) {
    return { error: "Validation failed.", details, record: null, cvBuffer: null, cvFilename: null };
  }

  const arrayBuffer = await cvFile.arrayBuffer();
  const cvBuffer = Buffer.from(arrayBuffer);
  const positionTitle = position?.title || positionOther;

  return {
    error: null,
    details: [],
    record: {
      fullName,
      email,
      country,
      mobile,
      positionId,
      positionTitle,
      experience,
      linkedIn,
      message,
      submittedAt: new Date().toISOString(),
    },
    cvBuffer,
    cvFilename: safeFilename(cvFile.name),
  };
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email is not configured.",
        details: ["Set RESEND_API_KEY and RESEND_FROM in .env.local or Vercel."],
      },
      { status: 503 }
    );
  }

  const parsed = await parseBody(request);
  if (parsed.error && parsed.details?.length === 0) {
    return NextResponse.json({ error: parsed.error, details: [] }, { status: 400 });
  }
  if (parsed.details?.length > 0 || !parsed.record) {
    return NextResponse.json(
      { error: parsed.error || "Validation failed.", details: parsed.details },
      { status: 422 }
    );
  }

  const to = (
    process.env.CONTACT_EMAIL ||
    process.env.CAREER_EMAIL ||
    process.env.TAX_AUTHORITY_EMAIL ||
    DEFAULT_TO
  ).trim();
  const from = resolveResendFrom(process.env.RESEND_FROM);
  const resend = new Resend(apiKey);
  const { record, cvBuffer, cvFilename } = parsed;

  const text = [
    "New career application from the Glozon FinTax website.",
    "",
    `Name: ${record.fullName}`,
    `Email: ${record.email}`,
    `Country: ${record.country}`,
    `Mobile: ${record.mobile}`,
    `Position: ${record.positionTitle}`,
    `Experience: ${record.experience}`,
    record.linkedIn ? `LinkedIn: ${record.linkedIn}` : "",
    `Submitted (UTC): ${record.submittedAt}`,
    "",
    "Cover letter / message:",
    record.message,
    "",
    `CV attached: ${cvFilename}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: record.email,
      subject: `Career application — ${record.positionTitle} (${record.fullName})`,
      text,
      attachments: [{ filename: cvFilename, content: cvBuffer }],
    });

    if (error) {
      console.error("[career]", error);
      return NextResponse.json(
        { error: error.message || "Resend rejected the request.", details: [] },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null, to });
  } catch (err) {
    console.error("[career]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Send failed.", details: [] },
      { status: 500 }
    );
  }
}
