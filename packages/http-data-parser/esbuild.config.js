// https://souporserious.com/bundling-typescript-with-esbuild-for-npm/
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { clean } = require('esbuild-plugin-clean');
const { replace } = require('esbuild-plugin-replace');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins: [
    clean({
      patterns: ['./dist/*'],
    }),
    nodeExternalsPlugin(),
    // replace({
    //   'export default ': 'export = ',
    // }),
  ],
};

// build cjs + esm
build({ ...shared, outfile: 'dist/index.cjs.js', });
build({ ...shared, outfile: 'dist/index.esm.js', format: 'esm', });
