/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['./tests/pw/*'],
    include: ['./tests/vitest/*'],
    globals: true,
    root: __dirname,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: ['./tests/setup-test.ts'],
  },
});
