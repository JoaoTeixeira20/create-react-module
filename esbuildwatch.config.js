require('dotenv').config();
const esbuild = require('esbuild');
const http = require('http');

const reactPreviewServerPort = parseInt(process.env.REACT_PREVIEW_EXAMPLE_SERVER_PORT);
const sseServerPort = parseInt(process.env.HOT_RELOAD_SSE_SERVER_PORT);

const options = {
    hostname: 'localhost',
    port: sseServerPort,
    path: '/data',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

const plugins = [{
    name: 'fileChangeReload',
    setup(build) {
        build.onEnd(_ => {
            http.request(options).end();
            console.log('changed detected, reloading...')
        });
    },
}];

async function watch() {
    const ctx = await esbuild.context({
        entryPoints: ['src/Preview.tsx', 'sse-hot-reload-handler/sse-client.js'],
        bundle: true,
        minify: true,
        format: 'esm',
        sourcemap: true,
        outdir: 'public/js',
        plugins,
    })
    await ctx.watch()
    const server = await ctx.serve({
        servedir: 'public',
        port: reactPreviewServerPort,
    })

    console.log(`server started on http://localhost:${server.port}`);
}

watch();
