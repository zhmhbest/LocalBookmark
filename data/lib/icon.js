const axios = require('axios');
// const file = require('./file');

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
        const url = item.url.match(/\/$/) ? item.url : `${item.url}/`;
        let favicon = undefined;
        await axios.get(item.url, {}, HEADERS).then(res => {
            // [ 'status', 'statusText', 'headers', 'config', 'request': [], 'data' ]
            const host = res.request.connection['_host'];
            const icon = getIcon(res.data);
            if (undefined !== icon) {
                // 匹配到
                if (icon.match(/^\/[a-z]/)) { // /favicon
                    favicon = `http://${host}${icon}`;
                } else if (icon.match(/^\/\/[a-z]/)) { // //favicon
                    favicon = `http://${icon.substr(2)}`;
                } else if (icon.match(/^[a-z]/)) { // favicon
                    favicon = `${url}${icon}`;
                } else {
                    console.log("error:", url, icon);
                }
            }
        }).catch(err => {
            console.log("error first:", url);
        });

        // // 尝试再匹配
        // if (undefined === favicon) {
        //     const test = `${url}favicon.ico`;
        //     await axios.get(item.url, {}, HEADERS).then(res => {
        //         if(200 === res.status) {
        //             favicon = test;
        //         }
        //     }).catch(err => {
        //         console.log("error retry:", url);
        //     });
        // }

        // 写回
        if (undefined !== favicon) {
            item.icon = favicon;
            console.log(favicon);
        } else {
            console.log("error:", url, 'none');
        }
    }
}

module.exports = {
    loadIcon
};