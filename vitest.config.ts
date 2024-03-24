/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: __dirname,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: ['./tests/setup-test.ts'],
  },
});
