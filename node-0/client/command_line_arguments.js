const commandLineArgs = require('command-line-args');
const settings = [
  {
    name: 'server.hostname',
    type: String,
  },
  {
    name: 'server.port',
    type: Number,
  },
  {
    name: 'n',
    type: Number,
  },
  {
    name: 'requestsType',
    type: String
  }
];

module.exports = commandLineArgs(settings);