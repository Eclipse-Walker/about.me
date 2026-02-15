import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'Phisanurat W.',
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
