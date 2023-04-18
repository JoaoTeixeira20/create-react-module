import esbuild, { WatchOptions, ServeOptions, PluginBuild, OnStartResult, BuildResult, OnLoadOptions, OnLoadResult, BuildOptions } from 'esbuild';
import { ServeOnRequestArgs } from 'esbuild';

import axios from 'axios';

axios.post('http://localhost:3001/data', { data: 'hi' }, { headers: { "Content-Type": 'application/json' } })

const plugins = [{
    name: 'my-plugin',
    setup(build: PluginBuild) {
        cons p1: BuildOptions
        build.initialOptions: Build
        build.onEnd((result: BuildResult) => {
            console.log('changed:', result.outputFiles, 'reloading...')
        });
    },
}];

const p1: BuildOptions

const ctx = await esbuild.context({
    entryPoints: ['src/Preview.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: true,
    outfile: 'public/js/output.js',
    plugins,
});

ctx.watch()

ctx.serve({
    onRequest: (args: ServeOnRequestArgs) => {
        console.log('i got a request');
    },


})