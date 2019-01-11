const commandLineArgs = require('command-line-args');
const settings = [
  {
    name: 'serverHostname',
    type: String,
  },
  {
    name: 'serverPort',
    type: Number,
  },
  {
    name: 'requestCount',
    type: Number,
  },
  {
    name: 'communicationType',
    type: String
  }
];

module.exports = commandLineArgs(settings);