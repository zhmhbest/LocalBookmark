const path = require('path');
const file = require('./lib/file');


// 加载书签
function loadBookmarks() {
    const mapTags = (() => {
        const map = require('./manifest.json');
        return (tags) => {
            tags = new Set(tags.map((v, i) => {
                const val = map[v];
                return undefined === val ? v : val;
            }));
            return [...tags];
        }
    })();

    const dataPath = path.relative(".", path.join(__dirname, "bookmarks"));
    let buffer = [];
    file.openDirectory(dataPath, (name, stat) => {
        if (stat.isFile() && name.match(/\.json$/)) {

            const filename = `./${path.relative(__dirname, name)}`.replace(/\\/g, '/');
            const dirs = path.dirname(filename).match(/(?<=.+bookmarks\/).+/)[0].split('/');
            const base = path.basename(filename).match(/.+?(?=\.json)/)[0];
            const baseTags = (dirs.concat(base)).filter(x => '_' !== x);

            const bookmarks = require(filename);
            for (let item of bookmarks) {
                item.tag = mapTags(
                    undefined === item.tag ? baseTags : item.tag.concat(baseTags)
                ).sort();
            }
            buffer = buffer.concat(bookmarks);
        }
    });
    return buffer;
}


const bookmarks = loadBookmarks();
function saveBookmarks(__to__) {
    file.saveJSON(path.join(__dirname, __to__), bookmarks);
}


saveBookmarks("../docs/data/bookmark.json");
saveBookmarks("../src/assets/data/bookmark.json");
saveBookmarks("./bookmark.json");