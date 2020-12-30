const path = require('path');
const file = require('./lib/file');
const icon = require('./lib/icon');

// 加载书签
function loadBookmarks() {
    let bookmarks = [];
    file.openDirectory("./bookmarks", (name, stat) => {
        if ( stat.isFile() && name.match(/\.json$/) ) {
            // console.log(name);
            bookmarks = bookmarks.concat(require(`./${name}`));
        }
    }); return bookmarks;
}

const __to = "../src/assets/data/bookmark.json";
// const __to = "./bookmark.json";
const bookmarks = loadBookmarks();
// for (let bookmark of bookmarks) {
//     icon(bookmark);
//     break;
// }
file.saveJSON(path.join(__dirname, __to), bookmarks);
