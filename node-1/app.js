const {tree} = require('./tree');

tree(path())
    .then((result) => console.log(JSON.stringify(result)));

function path() {
    return process.argv.slice(2)[0];
}