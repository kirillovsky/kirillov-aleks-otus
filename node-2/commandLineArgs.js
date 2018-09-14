const commandLineArgs = require('command-line-args');
const optionDefinitions = [
  {
    name: 'generator.randomNumbers.count',
    type: Number,
    defaultValue: 100,
  },
  {
    name: 'generator.highWaterMark',
    type: Number,
    defaultValue: 10,
  },
  {
    name: 'consumer.highWaterMark',
    type: Number,
    defaultValue: 10,
  },
  {
    name: 'transformer.highWaterMark',
    type: Number,
    defaultValue: 10,
  },
  {
    name: 'consumer.deferredConsume.wait.mills',
    type: Number,
    defaultValue: 0,
  },
];
exports.commandLineArgs = () => commandLineArgs(optionDefinitions);