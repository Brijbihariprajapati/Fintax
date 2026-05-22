import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const DEFAULT_TO = "gfa@glozonfintax.com";
const DEFAULT_FROM = "onboarding@resend.dev";
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const COUNTRY_OPTIONS = ["Australia", "Nepal", "India", "Dubai"];

function trimStr(v) {
  if (v == null) return "";
  return String(v).trim();
}

function resolveResendFrom(raw) {
  let v = trimStr(raw)
    .replace(/^["']|["']$/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
  if (!v) return DEFAULT_FROM;

  const named = v.match(/^(.+?)\s*<([^>]+)>$/);
  if (named) {
    const name = named[1].trim().replace(/^["']|["']$/g, "");
    const email = named[2].trim();
    if (EMAIL_RE.test(email)) return name ? `${name} <${email}>` : email;
  }

  if (EMAIL_RE.test(v)) return v;

  const embedded = v.match(/[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/);
  if (embedded && EMAIL_RE.test(embedded[0])) return embedded[0];

  return DEFAULT_FROM;
}

function validate(body) {
  const details = [];
  const fullName = trimStr(body.fullName);
  const email = trimStr(body.email);
  const country = trimStr(body.country);
  const mobile = trimStr(body.mobile);
  const subject = trimStr(body.subject);
  const message = trimStr(body.message);

  if (!fullName) details.push("Full name is required.");
  else if (fullName.length < 2) details.push("Full name must be at least 2 characters.");
  else if (fullName.length > 200) details.push("Full name is too long.");

  const emailRe =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
  if (!email) details.push("Email is required.");
  else if (/\s/.test(email) || !emailRe.test(email)) details.push("Please enter a valid email address.");

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

  if (!subject) details.push("Subject is required.");
  else if (subject.length < 3) details.push("Subject must be at least 3 characters.");
  else if (subject.length > 200) details.push("Subject is too long.");

  if (!message) details.push("Message is required.");
  else if (message.length < 10) details.push("Message must be at least 10 characters.");
  else if (message.length > 8000) details.push("Message is too long.");

  if (details.length > 0) return { details, record: null };

  return {
    details: [],
    record: {
      fullName,
      email,
      country,
      mobile,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    },
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

  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body.", details: [] }, { status: 400 });
  }

  const { details, record } = validate(raw);
  if (details.length > 0 || !record) {
    return NextResponse.json({ error: "Validation failed.", details }, { status: 422 });
  }

  const to = (
    process.env.CONTACT_EMAIL ||
    process.env.TAX_AUTHORITY_EMAIL ||
    DEFAULT_TO
  ).trim();
  const from = resolveResendFrom(process.env.RESEND_FROM);
  const resend = new Resend(apiKey);

  const text = [
    "New message from the Glozon FinTax website contact form.",
    "",
    `Name: ${record.fullName}`,
    `Email: ${record.email}`,
    `Country: ${record.country}`,
    `Mobile: ${record.mobile}`,
    `Subject: ${record.subject}`,
    `Submitted (UTC): ${record.submittedAt}`,
    "",
    "Message:",
    record.message,
  ].join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: record.email,
      subject: `Contact form — ${record.subject} (${record.fullName})`,
      text,
    });

    if (error) {
      console.error("[contact]", error);
      return NextResponse.json(
        { error: error.message || "Resend rejected the request.", details: [] },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null, to });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Send failed.", details: [] },
      { status: 500 }
    );
  }
}
