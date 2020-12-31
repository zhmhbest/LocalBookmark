// const calendar = require("./calendar");

function getTimeGapInfo(gap) {
    let t = Math.ceil(gap / 1000);
    d = Math.floor(t / 86400); // 3600 * 24
    s = Math.floor(t % 60);
    t = t / 60;
    m = Math.floor(t % 60);
    t = t / 60;
    h = Math.floor(t % 60);
    t = t / 60;
    return [d, h, m, s];
}

function getLunarDate() {
    if (1 === arguments.length) {
        const date = new Date(arguments[0]);
        const lunar = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return [lunar.lYear, lunar.lMonth, lunar.lDay];
    } else if (3 === arguments.length) {
        const lunar = calendar.solar2lunar(arguments[0], arguments[1], arguments[2]);
        return [lunar.lYear, lunar.lMonth, lunar.lDay];
    }
    return null;
}

function getSolarDate() {
    if (1 === arguments.length) {
        const date = new Date(arguments[0]);
        const solar = calendar.lunar2solar(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return [solar.cYear, solar.cMonth, solar.cDay];
    } else if (3 === arguments.length) {
        const solar = calendar.lunar2solar(arguments[0], arguments[1], arguments[2]);
        return [solar.cYear, solar.cMonth, solar.cDay];
    }
    return null;
}

function getDateByArr(arr) {
    return new Date(`${arr[0]}-${arr[1]}-${arr[2]} 00:00:00`);
}

function getDiffDay(diff) {
    return Math.floor(diff / 1000 / 86400);
}

function getBirth(solor_y, solor_M, solor_d) {
    let [lunar_y, lunar_M, lunar_d] = getLunarDate(solor_y, solor_M, solor_d);

    const NOW = new Date();
    const NOW_SOLAR = getDateByArr([NOW.getFullYear(), NOW.getMonth() + 1, NOW.getDate()]);
    const NOW_LUNAR = getDateByArr(getLunarDate(NOW));
    // console.log(NOW_SOLAR.toLocaleDateString());
    // console.log(NOW_LUNAR.toLocaleDateString());
    const YEAR = NOW.getFullYear();

    const y1_birth_solar = getDateByArr([YEAR, solor_M, solor_d]);
    const y1_birth_lunar = getDateByArr([YEAR, lunar_M, lunar_d]);
    const y2_birth_solar = getDateByArr([YEAR + 1, solor_M, solor_d]);
    const y2_birth_lunar = getDateByArr([YEAR + 1, lunar_M, lunar_d]);
    // console.log(y1_birth_solar.toLocaleDateString());
    // console.log(y1_birth_lunar.toLocaleDateString());
    // console.log(y2_birth_solar.toLocaleDateString());
    // console.log(y2_birth_lunar.toLocaleDateString());

    let diff_solor = -1;
    let next_solor = -1;
    if (NOW_SOLAR <= y1_birth_solar) {
        diff_solor = getDiffDay(y1_birth_solar - NOW_SOLAR);
        next_solor = y1_birth_solar;
    } else if (NOW_SOLAR <= y2_birth_solar) {
        diff_solor = getDiffDay(y2_birth_solar - NOW_SOLAR);
        next_solor = y2_birth_solar;
    }
    // console.log(diff_solor, next_solor.toLocaleDateString());

    let diff_lunar = -1;
    let next_lunar = -1;
    if (NOW_LUNAR <= y1_birth_lunar) {
        diff_lunar = getDiffDay(y1_birth_lunar - NOW_LUNAR);
        next_lunar = y1_birth_lunar;
    } else if (NOW_LUNAR <= y2_birth_lunar) {
        diff_lunar = getDiffDay(y2_birth_lunar - NOW_LUNAR);
        next_lunar = y2_birth_lunar;
    }
    // console.log(diff_lunar, next_lunar.toLocaleDateString());

    return {
        solar: {
            diff: diff_solor,
            next: next_solor.toLocaleDateString()
        },
        lunar: {
            diff: diff_lunar,
            next: getDateByArr(getSolarDate(next_lunar)).toLocaleDateString()
        },
    };
}

// console.log(getBirth(1996, 1, 7));
// console.log(getBirth(1996, 10, 16));