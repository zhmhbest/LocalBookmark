/**
 *
 * @param {Object} dict_data
 * @return {string}
 */

function params2String(dict_data) {
    var buffer = [];
    for(var item in dict_data) {
        buffer.push(item + '=' + dict_data[encodeURIComponent(item)]);
    }
    return buffer.join('&');
}

/**
 *
 * @param str_data
 */
function paramsParse(str_data) {
    var items = str_data.split('&');
    var buffer = {};
    for (var i in items) {
        var kv = items[i].split('=');
        buffer[kv[0]] = decodeURIComponent(kv[1]);
    }
    return buffer;
}


/**
 *
 */
function paramsParseHash() {
    var hash = window.location.hash.substr(1);
    var buffer = {};
    if(0!==hash.length) {
        var items = hash.split('&');
        for (var i in items) {
            var kv = items[i].split('=');
            buffer[kv[0]] = decodeURIComponent(kv[1]);
        }
    }
    return buffer;
}
