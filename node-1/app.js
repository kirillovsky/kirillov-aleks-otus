const {tree} = require('./tree');

tree(pathArgument())
.then((result) => console.log(JSON.stringify(result)));

function pathArgument() {
  return process.argv.slice(2)[0];
}