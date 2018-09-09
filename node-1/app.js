const {tree} = require('./tree');

tree(pathArgument());

function pathArgument() {
  return process.argv.slice(2)[0];
}