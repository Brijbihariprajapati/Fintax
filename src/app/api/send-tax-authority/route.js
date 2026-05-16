import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const DEFAULT_TO = "gfa@glozonfintax.com";
const DEFAULT_FROM = "onboarding@resend.dev";
const MAX_PDF_BYTES = 6 * 1024 * 1024;

/** Resend requires `email@domain.com` or `Name <email@domain.com>`. */
function resolveResendFrom(raw) {
  let v = trimStr(raw).replace(/^["']|["']$/g, "");
  if (!v) return DEFAULT_FROM;

  const named = v.match(/^(.+?)\s*<([^>]+)>$/);
  if (named) {
    const name = named[1].trim().replace(/^["']|["']$/g, "");
    const email = named[2].trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return name ? `${name} <${email}>` : email;
    }
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return v;

  return null;
}

function trimStr(v) {
  if (v == null) return "";
  return String(v).trim();
}

function validate(body) {
  const details = [];

  const firstName = trimStr(body.firstName);
  const lastName = trimStr(body.lastName);
  const email = trimStr(body.email);
  const phone = trimStr(body.phone);
  const businessType = trimStr(body.businessType).toLowerCase();
  const signatoryName = trimStr(body.signatoryName);
  const signDate = trimStr(body.signDate);
  const submittedAt = trimStr(body.submittedAt) || new Date().toISOString();

  if (!firstName) details.push("First name is required.");
  else if (firstName.length > 120) details.push("First name is too long.");

  if (!lastName) details.push("Last name is required.");
  else if (lastName.length > 120) details.push("Last name is too long.");

  if (!email) details.push("Email is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) details.push("Email format is invalid.");

  if (!phone) details.push("Contact number is required.");
  else if (phone.replace(/\D/g, "").length < 5) details.push("Contact number looks too short.");

  if (businessType !== "individual" && businessType !== "entity") {
    details.push("Type of business must be Individual or Entity.");
  }

  const tfn = trimStr(body.tfn);
  const dob = trimStr(body.dob);
  const abn = trimStr(body.abn);

  if (businessType === "individual") {
    if (!tfn) details.push("Tax File Number (TFN) is required for individuals.");
    if (!dob) details.push("Date of birth is required for individuals.");
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) details.push("Date of birth must be YYYY-MM-DD.");
  } else if (businessType === "entity") {
    if (!tfn) details.push("Tax File Number (TFN) is required for entities.");
    if (abn.length > 32) details.push("ABN is too long.");
  }

  if (body.authorityConfirmed !== true) details.push("Authority to Act must be confirmed.");

  if (!signatoryName) details.push("Printed name is required.");
  if (!signDate) details.push("Signature date is required.");

  const pdfBase64 = body.pdfBase64;
  let pdfBuffer = null;
  if (pdfBase64 == null || typeof pdfBase64 !== "string") {
    details.push("PDF data is missing.");
  } else {
    const raw = pdfBase64.replace(/^data:application\/pdf;base64,/, "").replace(/\s/g, "");
    if (raw.length < 100) details.push("PDF data is invalid or empty.");
    else {
      try {
        const buf = Buffer.from(raw, "base64");
        if (buf.length < 100) details.push("PDF file is empty.");
        else if (buf.length > MAX_PDF_BYTES) details.push("PDF file is too large.");
        else pdfBuffer = buf;
      } catch {
        details.push("PDF is not valid base64.");
      }
    }
  }

  const record =
    details.length === 0 && pdfBuffer
      ? {
          firstName,
          lastName,
          email,
          phone,
          businessType,
          tfn,
          dob: businessType === "individual" ? dob : "",
          abn: businessType === "entity" ? abn : "",
          signatoryName,
          signDate,
          submittedAt,
        }
      : null;

  return { details, record, pdfBuffer };
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email is not configured.",
        details: ["Set RESEND_API_KEY (and RESEND_FROM) in .env.local. See .env.example."],
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

  const parsed = validate(raw);
  if (parsed.details.length > 0) {
    return NextResponse.json({ error: "Validation failed.", details: parsed.details }, { status: 422 });
  }

  const { record, pdfBuffer } = parsed;
  const to = (process.env.TAX_AUTHORITY_EMAIL || DEFAULT_TO).trim();
  const from = resolveResendFrom(process.env.RESEND_FROM);
  if (!from) {
    return NextResponse.json(
      {
        error: "Invalid RESEND_FROM on server.",
        details: [
          'Set RESEND_FROM in Vercel to a plain email (e.g. onboarding@resend.dev) or Name <email@domain.com>.',
          "If the value has spaces, paste the full line in Vercel without breaking at the first space.",
        ],
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const stamp = Date.now();
  const safe = (s) =>
    String(s || "unknown")
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .slice(0, 40);
  const filename = `GFA_TaxAuthority_${safe(record.lastName)}_${safe(record.firstName)}_${stamp}.pdf`;

  const text = [
    "A new GFA tax authority form was submitted from the website.",
    "",
    `Name: ${record.firstName} ${record.lastName}`,
    `Email: ${record.email}`,
    `Contact: ${record.phone}`,
    `Business type: ${record.businessType}`,
    `Submitted (UTC): ${record.submittedAt}`,
    "",
    "The completed PDF is attached.",
  ].join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: record.email,
      subject: `GFA tax authority — ${record.firstName} ${record.lastName}`,
      text,
      attachments: [{ filename, content: pdfBuffer }],
    });

    if (error) {
      console.error("[send-tax-authority]", error);
      return NextResponse.json(
        { error: error.message || "Resend rejected the request.", details: [] },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null, to, filename });
  } catch (err) {
    console.error("[send-tax-authority]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Send failed.", details: [] },
      { status: 500 }
    );
  }
}
