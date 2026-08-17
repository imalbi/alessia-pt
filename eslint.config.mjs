import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Build output. Not covered by the defaults, and linting a bundled worker
    // buries the real findings under twenty thousand warnings about minified
    // code we did not write.
    '.open-next/**',
    '.preview/**',
    'playwright-report/**',
    'test-results/**',
  ]),
]);

export default eslintConfig;
