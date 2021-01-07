const axios = require('axios');

function serachIcon(strlink) {
    let rel = strlink.match(/(?<=rel=['"]).+?(?=['"])/);
    if (null === rel) return undefined;
    rel = (rel[0]).toLowerCase();
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
const TAB = "    ";

async function loadOneIcon(item, count) {
    const URL = item.url;
    const PREFIX = URL.match(/^https/) ? 'https://' : 'http://';
    const ERROR = [];
    let host = undefined;
    let path = undefined;
    let favicon = undefined;
    console.log(`${TAB}start: ${URL}`);

    await axios({
        method: 'get',
        url: URL,
        headers: HEADERS,
        // timeout: 5 * 1000,
        // maxContentLength: 1000 * 1024,
        // maxRedirects: 5,
    }).then(res => {
        // [ 'status', 'statusText', 'headers', 'config', 'request': [], 'data' ]
        host = res.request.connection['_host'];
        path = res.request.path;

        const icon = getIcon(res.data);
        // console.log(`${TAB}${TAB}match: ${icon}`);

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
                ERROR.push('match');
            }
        }
    }).catch(err => {
        ERROR.push(`1@${err}`);
    });

    // 尝试再匹配
    if (undefined === favicon && undefined !== host) {
        const test = `${PREFIX}${host}${getBasePath(path)}/favicon.ico`;
        await axios({
            method: 'get',
            url: test,
            headers: HEADERS,
            timeout: 3 * 1000,
            maxRedirects: 0,
        }).then(res => {
            if (200 === res.status) {
                favicon = test;
            }
        }).catch(err => {
            ERROR.push(`2@${err}`);
        });;
    }

    // 写回
    if (undefined === favicon) {
        item.icon = "";
        console.log(`${TAB}error: ${URL}`, ERROR);
    } else {
        item.icon = favicon;
        console.log(`${TAB}done: ${URL}`, favicon);
    }
    count.num++;
}

function loadIcon(data) {
    let count = {
        num: 0,
        sum: data.length
    };
    for (let item of data) {
        if (undefined !== item.icon) { count.num++; continue; }
        // if (undefined !== item.icon && item.icon.length > 0) { count.num++; continue; }
        loadOneIcon(item, count);
    }
    return new Promise((resolve, reject) => {
        let last = 0;
        setInterval(() => {
            if (count.sum === count.num) {
                resolve();
            } else {
                if(last !== count.num) {
                    console.log(`${TAB}${count.num}/${count.sum}`);
                    last = count.num;
                }
            }
        }, 10);
    });
}

module.exports = {
    loadIcon
};