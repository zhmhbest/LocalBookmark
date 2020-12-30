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

function getIcon(html) {
    const links = html.match(/\<link .+?\>/g);
    if (null == links) return undefined;
    for (let link of links) {
        let icon = serachIcon(link);
        if (undefined === icon) continue;
        return icon;
    }
    return undefined;
}


const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};

async function loadIcon(data) {
    for (let item of data) {
        if (undefined !== item.icon) continue;
        // console.log(item);
        await axios.get(item.url, {}, HEADERS).then(res => {
            console.log(res.data);
            // const icon = getIcon(res.data);
            // console.log(item);
            // console.log(icon);
            return;
        });
    }

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

module.exports = {
    loadIcon
};