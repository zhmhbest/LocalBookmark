const path = require('path');
const file = require('./lib/file');
const icon = require('./lib/icon');

// 加载书签
function loadBookmarks() {
    let buffer = [];
    file.openDirectory("./bookmarks", (name, stat) => {
        if (stat.isFile() && name.match(/\.json$/)) {
            // console.log(name);
            const filename = `./${name}`;
            const bookmarks = require(filename);
            for (let item of bookmarks) {
                item['ref'] = filename;
            }
            buffer = buffer.concat(bookmarks);
        }
    });
    return buffer;
}


function main(__to__) {
    const bookmarks = loadBookmarks();
    let count = {
        num: 0,
        sum: bookmarks.length
    };
    for (let bookmark of bookmarks) {
        icon(bookmark, count);
    }
    const interval = setInterval(() => {
        console.log(`${count.num}/${count.sum}`);
        if (count.num === count.sum) {
            clearInterval(interval);
            for (let bookmark of bookmarks) {
                delete bookmark['ref'];
            }
            file.saveJSON(path.join(__dirname, __to__), bookmarks);
        }
    }, 100);
}

main("./bookmark.json");
// const __to = "../src/assets/data/bookmark.json";