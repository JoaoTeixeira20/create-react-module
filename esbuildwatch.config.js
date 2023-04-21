require('dotenv').config();
const esbuild = require('esbuild');

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
];

async function watch() {
  const ctx = await esbuild.context({
    entryPoints: ['src/development/Preview.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: true,
    outdir: 'public/.js',
    define: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
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
