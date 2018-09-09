const fs = require('fs');
const {promisify} = require('util');
const readdirAsync = promisify(fs.readdir);

function tree(path) {
  const files = [];
  return readdirAsync(path).then((items) => {
    files.push(...(items.map((fileName) => `${path}/${fileName}`)));
    return {
      dirs: [],
      files: files,
    };
  });
}

exports.tree = tree;