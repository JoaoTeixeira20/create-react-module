const esbuild = require('esbuild');
const http = require('http');
const axios = require('axios');


const options = {
    hostname: 'localhost',
    port: 3001,
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
            axios.post('http://localhost:3001/data', { data: 'hi' }, { headers: { "Content-Type": 'application/json' } })
            console.log('changed detected, reloading...')
        });
    },
}];

async function watch() {
    const ctx = await esbuild.context({
        entryPoints: ['src/Preview.tsx'],
        bundle: true,
        minify: true,
        format: 'esm',
        sourcemap: true,
        outfile: 'public/js/output.js',
        plugins,
    })
    const result = await ctx.watch()
    const server = await ctx.serve({
        servedir: 'public',
        port: 3000,
    })

    console.log('server started on host: ', server.host, ' and port: ', server.port);
}

watch();
