import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Use globalThis.process for compatibility with Node and browser-like environments
const isGitHubActions =
  typeof globalThis !== 'undefined' &&
  typeof globalThis.process === 'object' &&
  Boolean(globalThis.process?.env?.GITHUB_ACTIONS);

const assetPrefix = isGitHubActions ? '/about.me/' : '/';

const siteUrl = 'https://eclipse-walker.github.io/about.me/';
const siteTitle = 'Phisanurat W. | Software Engineer';
const siteDescription =
  'Portfolio of Phisanurat W., a Software Engineer specializing in Office.js, Microsoft 365 Add-ins, and TypeScript.';
const ogImage = `${siteUrl}android-chrome-512x512.png`;

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://api.emailjs.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://api.github.com https://github.com https://github-contributions-api.jogruber.de",
  'frame-src https://www.google.com/recaptcha/',
].join('; ');

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: siteTitle,
    favicon: './public/favicon.ico',
    appIcon: {
      name: 'Phisanurat W.',
      icons: [
        {
          src: './public/apple-touch-icon.png',
          size: 180,
          target: 'apple-touch-icon',
        },
        {
          src: './public/android-chrome-192x192.png',
          size: 192,
          target: 'web-app-manifest',
        },
        {
          src: './public/android-chrome-512x512.png',
          size: 512,
          target: 'web-app-manifest',
        },
      ],
    },
    meta: {
      description: siteDescription,
      referrer: 'strict-origin-when-cross-origin',
    },
    tags: [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: contentSecurityPolicy,
        },
        head: true,
        append: false,
      },
      // Open Graph
      { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
      { tag: 'meta', attrs: { property: 'og:title', content: siteTitle } },
      {
        tag: 'meta',
        attrs: { property: 'og:description', content: siteDescription },
      },
      { tag: 'meta', attrs: { property: 'og:url', content: siteUrl } },
      { tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
      // Twitter
      {
        tag: 'meta',
        attrs: { name: 'twitter:card', content: 'summary_large_image' },
      },
      { tag: 'meta', attrs: { name: 'twitter:title', content: siteTitle } },
      {
        tag: 'meta',
        attrs: { name: 'twitter:description', content: siteDescription },
      },
      { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } },
      // Canonical
      { tag: 'link', attrs: { rel: 'canonical', href: siteUrl } },
    ],
  },
  server: {
    port: 3000,
    strictPort: true,
  },

  plugins: [pluginReact()],
  output: {
    assetPrefix,
  },
});
