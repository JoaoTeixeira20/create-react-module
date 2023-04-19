require('dotenv').config();

const fs = require('fs');

const reloadPort = parseInt(process.env.HOT_RELOAD_SSE_SERVER_PORT) || 3001;

const configContent = `
  window.RELOAD_PORT = "${reloadPort}";
`;

fs.writeFileSync('./public/js/config/config.js', configContent);
