const commandLineArgs = require('command-line-args');
const settings = [
  {
    name: 'timeout',
    type: Number,
  },
  {
    name: 'hostname',
    type: String,
  },
  {
    name: 'port',
    type: Number,
  },
];

module.exports = commandLineArgs(settings);