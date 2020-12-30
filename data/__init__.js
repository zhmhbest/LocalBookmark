const path = require('path');
const fs = require('fs');
// const crypto = require('crypto');


/**
 * @callback ReadDirectoryCallback
 * @param {string} name
 * @param {fs.Stats} stat
 */
/**
 * 枚举目录下所有文件和文件夹
 * @param {string} location
 * @param {ReadDirectoryCallback} callback
 */
const openDirectory = (location, callback) => {
    try {
        const stat = fs.statSync(location);
        if(!stat.isDirectory()) return false;
        callback(location, stat);
    } catch(err) { return false }
    const files = fs.readdirSync(location);
    for (let file of files) {
        const name = path.join(location, file);
        const stat = fs.statSync(name);
        callback(name, stat);
        if (stat.isDirectory()) {
            openDirectory(name, callback);
        }
    }
    return true;
}

// 加载书签
function loadBookmarks() {
    let bookmarks = [];
    openDirectory(".", (name, stat) => {
        name = name.replace('\\', '/');
        if (stat.isFile() && name.match(/\.json$/)) {
            bookmarks = bookmarks.concat(require(`./${name}`));
        }
    });
    return bookmarks;
}

// const __to = "../src/assets/data/bookmark.json";
const __to = "./bookmark.json";
const bookmarks = loadBookmarks();
const fp = fs.openSync(path.join(__dirname, __to), 'w');
Buffer.from(JSON.stringify(bookmarks)).toString('base64')
fs.writeSync(fp, `${JSON.stringify(bookmarks)}`);
fs.closeSync(fp);
