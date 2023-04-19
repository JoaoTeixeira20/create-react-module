require('dotenv').config();
const http = require('http');
const url = require('url');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

const reactPreviewServerPort = parseInt(process.env.REACT_PREVIEW_EXAMPLE_SERVER_PORT) || 3000;
const sseServerPort = parseInt(process.env.HOT_RELOAD_SSE_SERVER_PORT) || 3001;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const reqPath = reqUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${reactPreviewServerPort}`);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (reqPath === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    eventEmitter.on('refresh', () => {
      res.write(`data: {"status":"refresh"}\n\n`);
    });

    res.on('close', () => {
      eventEmitter.removeAllListeners('refresh')
      res.end('Finished eventSource');
    });
  }

  else if (reqPath === '/data' && req.method === 'POST') {
    eventEmitter.emit('refresh', () => {
      console.log('emmited on POST data');
    })
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'success' }));
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(sseServerPort, () => {
  console.log(`Hot reload listening on host:localhost and port:${sseServerPort}`);
});
