require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'dist/esm/index.js',
});
