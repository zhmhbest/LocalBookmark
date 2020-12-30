const path = require('path');
const file = require('./lib/file');


// 加载书签
function loadBookmarks() {
    const dataPath = path.relative(".", path.join(__dirname, "bookmarks"));
    let buffer = [];
    file.openDirectory(dataPath, (name, stat) => {
        if (stat.isFile() && name.match(/\.json$/)) {
            const filename = `./${path.relative(__dirname, name)}`.replace(/\\/g, '/');
            const bookmarks = require(filename);
            // for (let item of bookmarks) { item['ref'] = filename; }
            buffer = buffer.concat(bookmarks);
        }
    });
    return buffer;
}


function main(__to__) {
    const bookmarks = loadBookmarks();
    file.saveJSON(path.join(__dirname, __to__), bookmarks);
}


// main("../docs/data/bookmark.json");
main("../src/assets/data/bookmark.json");
// main("./bookmark.json");