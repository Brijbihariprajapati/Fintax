# Glozon FinTax & Advisory

Next.js website for **Glozon FinTax & Advisory (P) Ltd.** — services pages, contact, and client tax authority onboarding with PDF generation and email delivery.

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` (see `.env.example`):

- `RESEND_API_KEY` — from [Resend](https://resend.com)
- `RESEND_FROM` — verified sender address
- `TAX_AUTHORITY_EMAIL` — inbox for submitted authority PDFs (e.g. `gfa@glozonfintax.com`)

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Client onboarding: `/client-onboarding`.

## Build

```bash
npm run build
npm start
```

## Notes

- Authority PDFs use `public/gfa-tax-authority-template.pdf` (official GFA blank form).
- Secrets stay in `.env.local` only — never commit env files with real keys.
