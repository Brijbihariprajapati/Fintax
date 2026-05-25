const DEFAULT_FROM = "onboarding@resend.dev";
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function trimStr(v) {
  if (v == null) return "";
  return String(v).trim();
}

/** Resend requires `email@domain.com` or `Name <email@domain.com>`. */
export function resolveResendFrom(raw, fallback = DEFAULT_FROM) {
  let v = trimStr(raw)
    .replace(/^["']|["']$/g, "")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'");
  if (!v) return fallback;

  const named = v.match(/^(.+?)\s*<([^>]+)>$/);
  if (named) {
    const name = named[1].trim().replace(/^["']|["']$/g, "");
    const email = named[2].trim();
    if (EMAIL_RE.test(email)) return name ? `${name} <${email}>` : email;
  }

  if (EMAIL_RE.test(v)) return v;

  const embedded = v.match(/[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/);
  if (embedded && EMAIL_RE.test(embedded[0])) return embedded[0];

  return fallback;
}
