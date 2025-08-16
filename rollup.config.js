import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'bin/executable.js',
  output: {
    file: 'package/lib/aux4-adapter.js',
    format: 'cjs'
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      exportConditions: ['node'],
      browser: false
    }),
    commonjs({
      include: ['node_modules/**', 'lib/**', 'bin/**']
    }),
    json()
  ],
  external: []
};