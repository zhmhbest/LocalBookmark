const fs = require('fs');
const path = require('path');
// const crypto = require('crypto');


/**
 * @callback ReadDirectoryCallback
 * @param {string} name
 * @param {fs.Stats} stat
 */
/**
 * 枚举目录下所有文件和文件夹
 * @param {string} location
 * @param {ReadDirectoryCallback} callback
 */
const openDirectory = (location, callback) => {
    try {
        const stat = fs.statSync(location);
        if (!stat.isDirectory()) return false;
        callback(location.replace(/\\/g, '/'), stat);
    } catch (err) {
        return false
    }
    const recursion = (loc) => {
        const files = fs.readdirSync(loc);
        for (let file of files) {
            const name = path.join(loc, file);
            const stat = fs.statSync(name);
            callback(name.replace(/\\/g, '/'), stat);
            if (stat.isDirectory()) {
                recursion(name);
            }
        }
    };
    recursion(location);
    return true;
}


function saveText(location, text) {
    const fp = fs.openSync(location, 'w');
    fs.writeSync(fp, text);
    fs.closeSync(fp);
}


function saveJSON(location, data, space) {
    const fp = fs.openSync(location, 'w');
    // Buffer.from(JSON.stringify(data)).toString('base64')
    fs.writeSync(fp, `${JSON.stringify(data, undefined, space)}`);
    fs.closeSync(fp);
}


module.exports = {
    openDirectory,
    saveText,
    saveJSON
};