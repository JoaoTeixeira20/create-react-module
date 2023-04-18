const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

// Create HTTP server
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const reqPath = reqUrl.pathname;
  const reqQuery = querystring.parse(reqUrl.query);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with appropriate origin
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    // Send 200 (OK) status code for OPTIONS requests
    res.writeHead(200);
    res.end();
    return;
  }

  // SSE endpoint
  if (reqPath === '/events') {
    // Set appropriate headers for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream', // Set content type to text/event-stream
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // Add an event listener for SSE events
    eventEmitter.on('data', (eventData) => {
      // Send event data to the client
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });

    // Remove the event listener when the client closes the connection
    res.on('close', () => {
      eventEmitter.removeListener('data', (eventData) => {
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
      });
    });

    // Send an initial event to the client
    // const eventData = { name: 'Event Name', data: 'Event Data' };
    // res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }
  // HTTP POST endpoint
  else if (reqPath === '/data' && req.method === 'POST') {
    let body = '';
    // eventEmitter.emit('data', (eventData) => {
    //     const eventData = { name: 'Event Name', data: 'Event Data' };
    // res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    // })
    req.on('data', (chunk) => {
      // Collect the request body
      body += chunk;
    });

    req.on('end', () => {
      // Parse the request body as JSON
      const postData = JSON.parse(body);
      console.log('Received data:', postData);

      // Emit an event with the received data
      eventEmitter.emit('data', postData);

      // Send a response to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success' }));
    });
  }
  else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3001
server.listen(3001, () => {
  console.log('HTTP server listening on http://localhost:3001');
});