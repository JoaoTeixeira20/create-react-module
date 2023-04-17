require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    format: 'cjs',
    target: ['es6'],
    outfile: 'dist/index.js',
    external: ['@react-spring/web','react','react-dom']
});
