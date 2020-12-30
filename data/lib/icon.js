const axios = require('axios');
const file = require('./file');


function serachIcon(strlink) {
    let rel = strlink.match(/(?<=rel=['"]).+?(?=['"])/);
    if (null === rel) return undefined;
    rel = rel[0];
    if (
        'shortcut icon' !== rel &&
        'shortcut' !== rel &&
        'icon' !== rel
    ) return undefined;

    let href = strlink.match(/(?<=href=['"]).+?(?=['"])/);
    if (null === href) return undefined;
    // href = href[0];
    return href[0];
}

function getIconBySelf(url) {
    // axios.get(bookmark['url'], {}, {
    //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    // }).then(res => {
    //     if (200 === res.status) {
    //         const html = res.data.toString();
    //         const links = html.match(/\<link .+?\>/g);
    //         if (null === links) return;
    //         for (let link of links) {
    //             let icon = serachIcon(link);
    //             if (undefined === icon) return;
    //             //
    //             // console.log(icon);
    //             //
    //             bookmark['icon'] = icon;
    //         }
    //         // file.saveText("./test.txt", links.join('\n'));
    //     }
    // }).catch(err => {
    //     console.log('error:', bookmark['url']);
    // });
}


function getIconByApi(url, callback) {
    // https://ico.kucat.cn/get.php?url=
    axios.get(`https://ico.kucat.cn/get.php?url=${url}`, {}, {}).then(res => {
        // console.log(res);
        callback(
            true,
            Buffer.from(res.data).toString('base64')
        );
    }).catch(err => {
        callback(false);
    });
}

// https://github.com/zhmhbest/LocalBookmark/tree/version1/api/favicon
module.exports = function (bookmark, count) {
    function done() { count.num++; }
    if (undefined !== bookmark['icon']) { done(); return; }
    done();
    // getIconByApi(bookmark['url'], (ok, dat) => {
    //     if (ok) {
    //         // console.log(dat);
    //         bookmark['icon'] = dat;
    //     }
    //     done();
    //     return;
    // });
};