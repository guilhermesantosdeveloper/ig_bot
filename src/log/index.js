const pino = require('pino');
const path = require('path');

const caminho = path.resolve(__dirname, 'app.log');

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: caminho},

});

module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);
