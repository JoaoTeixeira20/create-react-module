require('dotenv').config();
const esbuild = require('esbuild');
// const path = require('path');
const postCssPlugin = require('esbuild-style-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer')

const esbuildPort = parseInt(process.env.ESBUILD_SERVER_PORT) || 3000;

const plugins = [
  {
    name: 'reload',
    setup(build) {
      build.onEnd(() => {
        console.log(`refreshed content`);
      });
    },
  },
  postCssPlugin({
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  }),
];

async function watch() {
  const ctx = await esbuild.context({
    entryPoints: ['src/development/Preview.tsx','src/development/style.css'],
    bundle: true,
    minifySyntax: true,
    minifyWhitespace: true,
    format: 'esm',
    sourcemap: true,
    outdir: 'public/.bundle',
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
    //sourceRoot: 'vscode://' + path.resolve(__dirname, 'src') + path.normalize('/'),
    plugins,
  });
  await ctx.watch();

  ctx
    .serve({
      servedir: 'public',
      port: esbuildPort,
    })
    .then((server) => {
      console.log(`server started at http://localhost:${server.port}`);
    });
}

watch();
