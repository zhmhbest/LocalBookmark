const axios = require('axios');

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

function getBasePath(path) {
    const pos = path.lastIndexOf('/');
    return path.substr(0, pos);
}

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};

async function loadIcon(data) {
    const TAB = "    ";

    for (let item of data) {
        if (undefined !== item.icon) continue;
        // if (undefined !== item.icon && item.icon.length > 0) continue;

        const URL = item.url;
        const PREFIX = URL.match(/^https/) ? 'https://' : 'http://';
        let host = undefined;
        let path = undefined;
        let favicon = undefined;
        console.log(`${TAB}url: ${URL}`);

        await axios({
            method: 'get',
            url: URL,
            headers: HEADERS,
            timeout: 5 * 1000,
            maxContentLength: 1000 * 1024,
            maxRedirects: 5,
        }).then(res => {
            // [ 'status', 'statusText', 'headers', 'config', 'request': [], 'data' ]
            host = res.request.connection['_host'];
            path = res.request.path;

            const icon = getIcon(res.data);
            console.log(`${TAB}${TAB}match: ${icon}`);

            if (undefined !== icon) {
                // 匹配到
                if (icon.match(/^https?:/)) {
                    //# http://
                    //# https://
                    favicon = icon;
                } else if (icon.match(/^\/[a-z]/)) {
                    //# /favicon
                    favicon = `${PREFIX}${host}${icon}`;
                } else if (icon.match(/^\/\/[a-z]/)) {
                    //# //favicon
                    favicon = `${PREFIX}${icon.substr(2)}`;
                } else if (icon.match(/^[a-z\.]/)) {
                    //# ./favicon
                    //# ../favicon 
                    //# favicon
                    if (path.match(/(html|htm)$/)) {
                        favicon = `${PREFIX}${host}${getBasePath(path)}/${icon}`;
                    } else {
                        favicon = `${PREFIX}${host}${path}/${icon}`;
                    }
                } else {
                    console.log(`${TAB}${TAB}error: match`);
                }
            }
        }).catch(err => {

            console.log(`${TAB}${TAB}${err}`);
        });

        // 尝试再匹配
        if (undefined === favicon && undefined !== host) {
            const test = `${host}favicon.ico`;
            console.log(test);
            // await axios.get(item.url, {}, HEADERS).then(res => {
            //     if(200 === res.status) {
            //         favicon = test;
            //     }
            // }).catch(err => {
            //     console.log("error retry:", url);
            // });
        }

        // 写回
        if (undefined === favicon) {
            item.icon = "";
            console.log(`${TAB}${TAB}error: none`);
        } else {
            item.icon = favicon;
            console.log(`${TAB}${TAB}favicon: ${favicon}`);
        }
    }
}

module.exports = {
    loadIcon
};