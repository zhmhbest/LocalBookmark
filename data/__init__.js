let fs = require('fs');

function readLocalJson(filename, options) {
    fs.readFile(filename, (err, data) => {
        if (err) options.error(err);
        options.success(JSON.parse(data.toString()));
    });
}

function writeLocalJson(filename, data, header) {
    fs.writeFile(filename,
        (undefined===header)?(''):(header) + JSON.stringify(data),
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
    writeLocalJson('./data.js', data, 'var BOOKMARK_DATA=');
});
