require('dotenv').config();
const esbuild = require('esbuild');
const http = require('http');

const reactPreviewProxyPort = parseInt(process.env.REACT_PREVIEW_PROXY_PORT) || 3000;
const esbuildServerPort = parseInt(process.env.ESBUILD_SERVER_PORT);

const plugins = [{
    name: 'reload',
    setup(build) {
        build.onEnd(() => {
            clients.forEach((res) => res.write("data: update\n\n"));
            console.log(`refreshed clients`);
            clients.length = 0;
        })
    }
}]

const clients = [];

async function watch() {
    const ctx = await esbuild.context({
        entryPoints: ['src/Preview.tsx'],
        bundle: true,
        minify: true,
        format: 'esm',
        sourcemap: true,
        banner: {
            js: `(() => new EventSource("http://localhost:${reactPreviewProxyPort}/event").onmessage = () => location.reload())();`,
        },
        outdir: 'public/js',
        plugins,
    })
    await ctx.watch();

    const server = await ctx.serve({
        servedir: 'public',
        ...{...esbuildServerPort && {port: esbuildServerPort}}
    })

    http.createServer((req, res) => {
        const options = {
            hostname: server.host,
            port: server.port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        }

        const proxyReq = http.request(options, proxyRes => {
            if (req.url === "/event")
                return clients.push(
                    res.writeHead(200, {
                        "Content-Type": "text/event-stream",
                        "Cache-Control": "no-cache",
                        "Connection": "keep-alive",
                    })
                );

            if (proxyRes.statusCode === 404) {
                console.log(`failed requesting ${options.path} from ${options.hostname}:${options.port}`);
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.end('<h1>A custom 404 page</h1>')
                return
            }

            res.writeHead(proxyRes.statusCode, proxyRes.headers)
            proxyRes.pipe(res, { end: true })
        })

        req.pipe(proxyReq, { end: true })
    }).listen(reactPreviewProxyPort)

    console.log(`esbuild server on localhost at port ${server.port}`);
    console.log(`hot reload server started at http://localhost:${reactPreviewProxyPort}`);
}

watch();
