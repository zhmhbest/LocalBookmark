const path = require('path');
const file = require('./lib/file');


// 加载书签
function loadBookmarks() {
    let buffer = [];
    file.openDirectory("./bookmarks", (name, stat) => {
        if (stat.isFile() && name.match(/\.json$/)) {
            // console.log(name);
            const filename = `./${name}`;
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


main("../src/assets/data/bookmark.json");
// main("./bookmark.json");