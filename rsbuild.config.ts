import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://api.emailjs.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://api.github.com https://github.com",
  'frame-src https://www.google.com/recaptcha/',
].join('; ');

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'Phisanurat W.',
    meta: {
      description: 'Portfolio website of Phisanurat W.',
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
    ],
  },
  server: {
    port: 3000,
    strictPort: true,
  },

  plugins: [pluginReact()],
  output: {
    // Use globalThis.process for compatibility with Node and browser-like environments
    assetPrefix:
      typeof globalThis !== 'undefined' &&
      typeof globalThis.process === 'object' &&
      globalThis.process?.env?.GITHUB_ACTIONS
        ? '/about.me/'
        : '/',
  },
});
