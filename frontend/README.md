# RAMBAI HR & Compliance Solutions

Production-ready React + Vite frontend for RAMBAI HR & COMPLIANCE SOLUTIONS.

## Development

Figma Make starts the development server automatically. Outside Make:

```bash
pnpm install
pnpm dev
```

Build with `pnpm build`.

## Environment

The consultation form is ready for a future enquiry API:

```bash
VITE_ENQUIRY_API_ENDPOINT=https://api.example.com/v1/enquiries
```

When configured, the frontend posts the validated enquiry payload to this exact endpoint. Without the variable, it clearly reports that online delivery is not configured and offers WhatsApp, phone, and email.

Only a public endpoint URL belongs in this frontend variable. Email credentials, WhatsApp Business access tokens, API keys, and webhook secrets must remain in the future backend.

The request and response contract, email format, WhatsApp format, and failure semantics are documented in [`docs/enquiry-backend-integration.md`](docs/enquiry-backend-integration.md).

## Content

Company, service, registration, and sample article data are centralised in `src/data/siteData.ts`. Reusable templates power all detail routes. Knowledge-centre content is clearly labelled educational sample content and avoids invented legal updates or deadlines.
