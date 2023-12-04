import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.js';

export default [
  // browser-friendly UMD build
  {
    input,
    output: {
      name: 'base64url',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [terser()],
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
