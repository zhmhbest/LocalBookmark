const path = require('path');
const fs = require('fs');
// const crypto = require('crypto');

// 加载书签
let bookmarks = [];
for (let item of require('./__init__.json')) {
    bookmarks = bookmarks.concat(require(`./${item}.json`));
}
const fp = fs.openSync(path.join(__dirname, "data.js"), 'w');
// Buffer.from(JSON.stringify(bookmarks)).toString('base64')
fs.writeSync(fp, `var BOOKMARK_DATA=${JSON.stringify(bookmarks)}`);
fs.closeSync(fp);
