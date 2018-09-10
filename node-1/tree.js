const fs = require('fs');
const {promisify} = require('util');
const readdirAsync = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(path) {
    return readdirAsync(path)
        .then(items => toPaths(path, items))
        .then(extractFilesAndDirsNames)
        .then(filesAndDirsNames => {
            const nextLevelsResults = filesAndDirsNames.dirs.map(tree);
            return Promise.all(nextLevelsResults)
                .then(nextLevelsResult => mergeLevelResults(nextLevelsResult, filesAndDirsNames));
        });
}

function toPaths(pathPrefix, itemsNames) {
    return itemsNames.map((itemName) => `${pathPrefix}/${itemName}`);
}

function extractFilesAndDirsNames(itemNames) {
    return Promise.all(withStats(itemNames))
        .then(items => items.reduce((acc, item) => {
                if (item.stat.isFile()) {
                    acc.files.push(item.itemName);
                }
                else if (item.stat.isDirectory()) {
                    acc.dirs.push(item.itemName);
                }
                return acc;
            }, {files: [], dirs: []})
        );
}

function withStats(itemNames) {
    return itemNames.map(
        itemName => stat(itemName).then(stat => ({itemName, stat}))
    );
}

function mergeLevelResults(nextLevelResults, initialResult) {
    return nextLevelResults.reduce((acc, item) => ({
        dirs: acc.dirs.concat(item.dirs),
        files: acc.files.concat(item.files)
    }), initialResult);
}

exports.tree = tree;