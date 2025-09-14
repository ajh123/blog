// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import preact from '@astrojs/preact';

import posthog from './src/lib/posthog';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    preact(),
    posthog('phc_n17zLe4q3Ejrry0lUNzOti6FzeDBVuevjuL91eoxpSa', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2025-05-24'
    })
  ]
});