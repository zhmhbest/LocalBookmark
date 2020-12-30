const path = require('path');
const file = require('./lib/file');
const icon = require('./lib/icon');


function openData() {
    const buffer = [];
    const dataPath = path.relative(".", path.join(__dirname, "bookmarks"));
    file.openDirectory(dataPath, (name, stat) => {
        if (stat.isFile() && name.match(/\.json$/)) {
            buffer.push([
                `./${path.relative(__dirname, name)}`.replace(/\\/g, '/'),
                name
            ]);
        }
    });
    return buffer;
}


async function main() {
    for (let [pack, name] of openData()) {
        const data = require(pack);
        // await icon.loadIcon(data);
        // break;
        file.saveJSON(name, data, '    ');
    }
}
main();