# Rsbuild project

## Setup

Install the dependencies:

```bash
bun install
```

Set environment variables for EmailJS:

```bash
cp .env.example .env
```

Required variables:

- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_KEY`
- `PUBLIC_RECAPTCHA_SITE_KEY`
- `PUBLIC_ALLOWED_ORIGINS` (comma-separated, e.g. `http://localhost:3000,https://<your-username>.github.io`)

EmailJS SDK docs: https://www.emailjs.com/docs/sdk/installation/

Security notes:

- `PUBLIC_*` variables are embedded into client bundles. Do not store secrets in them.
- Restrict allowed domains in EmailJS dashboard to your real site origins only.
- Configure rate limits/anti-spam settings in EmailJS template/service.

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
bun run dev
```

Build the app for production:

```bash
bun run build
```

Run lint checks:

```bash
bun run lint
```

Run test suite:

```bash
bun run test
```

Preview the production build locally:

```bash
bun run preview
```

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!
