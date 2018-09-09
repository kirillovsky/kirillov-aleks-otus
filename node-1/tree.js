const fs = require('fs');
const {promisify} = require('util');
const readdirAsync = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(path) {
  return readdirAsync(path).
      then((items) => toPaths(path, items)).
      then(splitFilesAndDirs).
      then(({fileNames, dirNames}) => {
        const nextLevelsResults = dirNames.map(tree);
        return Promise.all(nextLevelsResults).then(
            result => mergeLevelResults(result, fileNames, dirNames),
        );
      });
}

function toPaths(pathPrefix, itemsNames) {
  return itemsNames.map((itemName) => `${pathPrefix}/${itemName}`);
}

function splitFilesAndDirs(itemNames) {
  return Promise.all(withStats(itemNames)).
      then(results => results.reduce((acc, item) => {
            if (item.stat.isFile()) {
              acc['fileNames'].push(item.itemName);
            }
            else if (item.stat.isDirectory()) {
              acc['dirNames'].push(item.itemName);
            }
            return acc;
          }, {fileNames: [], dirNames: []}),
      );
}

function withStats(itemNames) {
  return itemNames.map(itemName =>
      stat(itemName).then(stat => {
        return {
          itemName: itemName,
          stat: stat,
        };
      }),
  );
}

function mergeLevelResults(nextLevelResults, fileNames, dirNames) {
  return nextLevelResults.reduce((acc, item) => {
    return {
      dirs: acc.dirs.concat(item.dirs),
      files: acc.files.concat(item.files),
    };

  }, {dirs: dirNames, files: fileNames});
}

exports.tree = tree;