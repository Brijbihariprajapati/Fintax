import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Microsoft 365 OneDrive only (via Power Automate).
 *
 * The website POSTs form data to your Power Automate "HTTP request" trigger.
 * Your flow (signed in with M365) writes files into OneDrive — no Azure app keys in this project.
 */

function trimStr(v) {
  if (v == null) return "";
  return String(v).trim();
}

function validateBody(body) {
  /** @type {string[]} */
  const details = [];

  const firstName = trimStr(body.firstName);
  const lastName = trimStr(body.lastName);
  const dob = trimStr(body.dob);
  const phone = trimStr(body.phone);
  const email = trimStr(body.email);

  if (!firstName) details.push("First name is required.");
  else if (firstName.length > 120) details.push("First name is too long.");

  if (!lastName) details.push("Last name is required.");
  else if (lastName.length > 120) details.push("Last name is too long.");

  if (!dob) details.push("Date of birth is required.");
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) details.push("Date of birth must be a valid date (YYYY-MM-DD).");

  if (!email) details.push("Email is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) details.push("Email format is invalid.");

  if (!phone) details.push("Phone is required.");
  else if (phone.replace(/\D/g, "").length < 5) details.push("Phone number looks too short.");

  const signaturePngBase64 = body.signaturePngBase64;
  if (signaturePngBase64 == null || typeof signaturePngBase64 !== "string") {
    details.push("Signature is required.");
  } else if (signaturePngBase64.length < 80) {
    details.push("Signature data is missing or invalid.");
  } else {
    try {
      const buf = Buffer.from(signaturePngBase64, "base64");
      if (buf.length < 80) details.push("Signature image is invalid or empty.");
    } catch {
      details.push("Signature is not valid base64.");
    }
  }

  const otherIncome = Array.isArray(body.otherIncome) ? body.otherIncome : [];
  const deductions = Array.isArray(body.deductions) ? body.deductions : [];
  if (body.otherIncome != null && !Array.isArray(body.otherIncome)) {
    details.push("Field otherIncome must be an array.");
  }
  if (body.deductions != null && !Array.isArray(body.deductions)) {
    details.push("Field deductions must be an array.");
  }

  const record = {
    firstName,
    lastName,
    dob,
    tfn: trimStr(body.tfn),
    phone,
    email,
    address: trimStr(body.address),
    residency: trimStr(body.residency),
    financialYear: trimStr(body.financialYear),
    employer: trimStr(body.employer),
    abn: trimStr(body.abn),
    grossIncome: trimStr(body.grossIncome),
    taxWithheld: trimStr(body.taxWithheld),
    otherIncome,
    deductions,
    notes: trimStr(body.notes),
    bankName: trimStr(body.bankName),
    accountName: trimStr(body.accountName),
    bsb: trimStr(body.bsb),
    accountNumber: trimStr(body.accountNumber),
    submittedAt: trimStr(body.submittedAt) || new Date().toISOString(),
  };

  return { details, record, signaturePngBase64: typeof signaturePngBase64 === "string" ? signaturePngBase64 : "" };
}

function safeFilePart(str) {
  return String(str || "unknown")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 48);
}

export async function POST(request) {
  try {
    const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      return NextResponse.json(
        {
          error: "OneDrive is not connected yet.",
          details: ["POWER_AUTOMATE_WEBHOOK_URL is missing in server configuration."],
          hint:
            "The client must create a Power Automate flow (HTTP trigger → Create file in OneDrive) and send you the POST URL. See CLIENT_ONEDRIVE_SETUP.txt in the project.",
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

    const { details, record, signaturePngBase64 } = validateBody(raw);
    if (details.length > 0) {
      return NextResponse.json({ error: "Validation failed.", details }, { status: 422 });
    }

    const stamp = Date.now();
    const base = `${safeFilePart(record.lastName)}_${safeFilePart(record.firstName)}_${stamp}`;
    const folder = (process.env.POWER_AUTOMATE_ONEDRIVE_FOLDER || "ClientOnboarding").replace(/^\/+|\/+$/g, "");

    const webhookBody = {
      ...record,
      signaturePngBase64,
      fileBaseName: base,
      folder,
    };

    const pRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookBody),
    });

    if (!pRes.ok) {
      const t = await pRes.text();
      return NextResponse.json(
        {
          error: `Could not reach OneDrive automation (${pRes.status}). Open Power Automate → run history for this flow.`,
          details: [t.slice(0, 500)],
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      destination: "microsoft_365_onedrive",
      saved: { folder, fileBaseName: base },
    });
  } catch (err) {
    console.error("[client-onboarding]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Submission failed.", details: [] },
      { status: 500 }
    );
  }
}
