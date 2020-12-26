const path = require('path');
const fs = require('fs');
// const crypto = require('crypto');

// 加载书签
let bookmarks = [];
for (let item of require('./__init__.json')) {
    bookmarks = bookmarks.concat(require(`./${item}.json`));
}
const fp = fs.openSync(path.join(__dirname, "../src/assets/data/bookmark.json"), 'w');
// Buffer.from(JSON.stringify(bookmarks)).toString('base64')
fs.writeSync(fp, `${JSON.stringify(bookmarks)}`);
fs.closeSync(fp);
