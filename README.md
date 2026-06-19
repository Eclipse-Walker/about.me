# about.me

Personal portfolio of **Phisanurat W.** — a terminal/code-themed single-page site
built with React 19 and Rsbuild, deployed to GitHub Pages.

## Tech stack

- **Framework:** React 19
- **Bundler:** [Rsbuild](https://rsbuild.rs) (Rspack)
- **Animation:** Framer Motion
- **Tooling:** Biome (lint + format), TypeScript (strict), Rstest + Testing Library
- **Contact form:** EmailJS + Google reCAPTCHA v2

## Setup

Install dependencies:

```bash
bun install
```

Configure environment variables for the contact form:

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

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server at [http://localhost:3000](http://localhost:3000) |
| `bun run build` | Build for production into `dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run typecheck` | Type-check with `tsc --noEmit` |
| `bun run lint` | Lint and format check with Biome |
| `bun run format` | Auto-format with Biome |
| `bun run test` | Run the test suite (Rstest) |
| `bun run check` | Run typecheck + lint + test (the CI gate) |

## Security notes

- `PUBLIC_*` variables are embedded into the client bundle. **Do not store secrets in them.**
- The contact form sends a reCAPTCHA token (`g-recaptcha-response`) to EmailJS. For the
  token to actually be verified, **enable reCAPTCHA verification in the EmailJS template**
  — otherwise the captcha is decorative only.
- Restrict allowed domains in the EmailJS dashboard to your real site origins.
- Configure rate limits / anti-spam settings in the EmailJS service/template.
- The form also includes a client-side honeypot field, submission throttle, input-length
  limits, and an origin allowlist (`PUBLIC_ALLOWED_ORIGINS`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs typecheck → lint →
test → audit, bumps the patch version, builds, and publishes `dist/` to the `gh-pages`
branch.
