let fs = require('fs');
const crypto = require('crypto');

/**
 * @return {string}
 */
function AES(data) {
    let buffer = [];
    const iv = Buffer.alloc(16, 0);
    const key = crypto.scryptSync('', '', 16);
    // console.log(key);

    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    buffer.push(cipher.update(data, 'utf8', 'hex'));
    buffer.push(cipher.final('hex'));
    return buffer.join('');
}

function readLocalJson(filename, options) {
    fs.readFile(filename, (err, data) => {
        if (err) options.error(err);
        options.success(JSON.parse(data.toString()));
    });
}

function writeLocalJson(filename, data, header, wrap) {
    let buffer = [];
    wrap = wrap || '';
    if ('string'===typeof header) {
        buffer.push(header);
    }

    buffer.push(wrap);
    if (data instanceof Object) {
        buffer.push(JSON.stringify(data));
    } else {
        buffer.push(data);
    }
    buffer.push(wrap);

    fs.writeFile(filename,
        buffer.join(''),
        (err) => { if (err) throw err; }
    );
}

function loadBookmarkData(callback) {
    let bookmark_jsons = [];
    let config_total = -1;
    let config_count = 0;

    function addBookmark(name, index) {
        readLocalJson(name + ".json", {
            success: function (res) {
                bookmark_jsons[index] = res;
                config_count++;
            },
            error: function (err) {
                bookmark_jsons[index] = [];
                config_count++;
            }
        });
    }

    let handel = setInterval(function () {
        if (config_count === config_total) {
            clearInterval(handel);
            // 合成
            let bookmarks = [];
            for (let i=0; i<bookmark_jsons.length; i++) {
                bookmarks = bookmarks.concat(bookmark_jsons[i]);
            }
            // 回调
            callback(bookmarks)
        }
    }, 100);

    readLocalJson('./__init__.json', {
        success: function (res) {
            config_total = res.length;
            res.forEach((item, index)=>{
                // console.log(item, index);
                addBookmark(item, index);
            });
        }
    });
}

loadBookmarkData(function (data) {
    writeLocalJson('./data.js',
        AES(JSON.stringify(data)),
        'var BOOKMARK_DATA=',
        "'");
});
