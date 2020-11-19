
/**
 * 随机整数
 * @param {number|[number,number]} num: [0, numMax) or [numMin,numMax]
 * @param {number} [numMax]: [num, numMax]
 * @returns {number}
 */
function randomInteger(num, numMax) {
    /**
     * @param {number} l: 左值（可达）
     * @param {number} r: 右值（不可达）
     * @returns {number}
     */
    function randInt(l, r) {
        // console.log(l, r);
        return Math.floor(Math.random() * (r - l) + l);
    }
    switch (arguments.length) {
        case 1:
            if (num instanceof Array) {
                return randInt(num[0], num[1] + 1);
            } else {
                return randInt(0, num);
            }
        case 2:
            return randInt(num, numMax + 1);
        default:
            return 0;
    }
}


/**
 * 生成颜色
 * @param {string} m: rgb | rgba
 * @param {number} r: 0~255
 * @param {number} g: 0~255
 * @param {number} b: 0~255
 * @param {number} a: 0~100
 * }
 */
function makeRGBAColor(m, r, g, b, a) {
    var buffer = [];
    buffer.push(m);
    buffer.push('(');
    buffer.push(r); buffer.push(',');
    buffer.push(g); buffer.push(',');
    buffer.push(b);
    if (undefined !== a) {
        buffer.push(',');
        buffer.push(a);
        buffer.push('%');
    }
    buffer.push(')');
    return buffer.join('');
}


/**
 * 获取随机颜色
 * @param {object} [params]: {
 *     [mode]: undefined=rgb | rgb | rgba
 *     [rr]: undefined=[0, 255]
 *     [gg]: undefined=[0, 255]
 *     [bb]: undefined=[0, 255]
 *     [aa]: undefined=[0, 100]
 *     [dev]: undefined=[0, 9999]
 *
 * }
 * @returns {string}
 */
function randomColor(params) {
    params.mode = params.mode || 'rgb';
    params.rr = params.rr || [0, 255];
    params.gg = params.gg || [0, 255];
    params.bb = params.bb || [0, 255];
    params.dev = params.dev || [0, 9999];

    var a;
    if('rgba' === params.mode) {
        params.aa = params.aa || [0, 100];
        a = randomInteger(params.aa);
    }

    var r, g, b;
    var mean, deviation;
    for(;;) {
        r = randomInteger(params.rr);
        g = randomInteger(params.gg);
        b = randomInteger(params.bb);

        // 检查方差限制
        mean = (r + g + b) / 3;
        deviation = (
            Math.pow(r-mean, 2) +
            Math.pow(g-mean, 2) +
            Math.pow(b-mean, 2)
        ) / 3;
        // console.log(deviation);
        if(deviation < params.dev[0] || deviation > params.dev[1]) {
            continue;
        }
        break;
    }
    return makeRGBAColor(params.mode, r, g, b, a);
}


function randomSoftRGBColor() {
    return randomColor({
        rr: [30, 200],
        gg: [20, 150],
        bb: [20, 220],
        dev: [2000, 6000]
    });
}
