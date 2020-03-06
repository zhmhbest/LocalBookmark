/**
 * 随机整数
 * @param num1: returns [0, num1)
 * @param num2: returns [num1, num2]
 * @returns {number}
 */
function randomInteger(num1, num2) {
    /**
     * @param {number} l: 左值（可达）
     * @param {number} r: 右值（不可达）
     * @returns {number}
     */
    function randInt(l, r) {
        // console.log(l, r);
        return parseInt(Math.random() * (r - l) + l, 10);
    }

    switch (arguments.length) {
        case 1:
            return randInt(0, arguments[0]);
        case 2:
            return randInt(arguments[0], arguments[1] + 1);
        default:
            return 0;
    }
}

function getRandomIntegers(num, l, r) {
    var buffer = [];
    for (var i=0; i<num; i++) {
        buffer.push(randomInteger(l, r))
    }
    return buffer;
}


/**
 * 获取随机颜色
 * @param {[number, number]} [mod]: rgb | rgba
 * @param {[number, number]} [r]: [0, 255]
 * @param {[number, number]} [g]: [0, 255]
 * @param {[number, number]} [b]: [0, 255]
 * @param {[number, number]} [a]: [0, 100]
 * @param {[number, number]} [dev]: 方差范围 [0, 5000]
 * @returns {string}
 */
function randomColor(mod, r, g, b, a, dev) {
    mod = mod || 'rgb';
    r = r || [0, 255];
    g = g || [0, 255];
    b = b || [0, 255];
    dev = dev || [0, 5000];

    var buffer = [];
    buffer.push(mod);
    buffer.push('(');
    // -----------------
    var rr, gg, bb, mean, deviation;
    do {
        rr = randomInteger(r[0], r[1]);
        gg = randomInteger(g[0], g[1]);
        bb = randomInteger(b[0], b[1]);
        mean = (rr + gg + bb) / 3;
        deviation = (
            Math.pow(rr-mean, 2) +
            Math.pow(gg-mean, 2) +
            Math.pow(bb-mean, 2)
        ) / 3;
        console.log(deviation);
    } while (deviation < dev[0] || deviation > dev[1]);
    // -----------------
    buffer.push(rr); buffer.push(',');
    buffer.push(gg); buffer.push(',');
    buffer.push(bb);
    // -----------------
    if ('rgba' === mod) {
        a = a || [0, 100];
        buffer.push(',');
        buffer.push(randomInteger(a[0], a[1]));
        buffer.push('%');
    }
    buffer.push(')');
    return buffer.join('');
}


function randomLightRGBColor() {
    return randomColor('rgb', [50, 255], [50, 255], [50, 255], undefined)
}


function randomCommonRGBColor() {
    return randomColor('rgb', [80, 220], [60, 200], [100, 200], undefined, [800, 1800])
}

function getRandomColors(num) {
    var buffer = [];
    for (var i = 0; i < num; i++) {
        buffer.push(randomCommonRGBColor())
    }
    return buffer;
}