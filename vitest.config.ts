import { defineConfig } from 'vitest/config';

// Tests run in Node without the Cloudflare and TanStack plugins; they cover
// the pure modules (content, search, validation, time) and the image script.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
    environment: 'node',
    testTimeout: 60000
  }
});
