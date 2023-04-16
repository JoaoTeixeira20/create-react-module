require('esbuild').build({
    entryPoints: ['src/Preview.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: true,
    outfile: 'public/js/output.js',
    // external: ['react', 'react-dom'], 
  })