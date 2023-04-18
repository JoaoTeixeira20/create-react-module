require('dotenv').config();

const fs = require('fs');

const reloadPort = parseInt(process.env.HOT_RELOAD_SSE_SERVER_PORT);

const configContent = `
  window.RELOAD_PORT = "${reloadPort}";
`;

fs.writeFileSync('./public/js/config/config.js', configContent);
