const axios = require('axios');
const file = require('./file');

// https://github.com/zhmhbest/LocalBookmark/tree/version1/api/favicon
module.exports = function (bookmark) {
    console.log(bookmark);
    if (undefined !== bookmark['icon']) return;
    axios.get(bookmark['url'], {}, {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }).then(res => {
        if (200 === res.status) {
            const html = res.data.toString();
            const links = html.match(/\<link .+?\>/g);
            file.saveText("./test.txt", links.join('\n'));
        }
    });
};