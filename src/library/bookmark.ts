

function filterBookmark(
    data: Array<{ 'tag': Array<string> }>,
    include: undefined | string | Array<string>, exclude: undefined | string | Array<string>
): Array<object> {
    include = include || [];
    exclude = exclude || [];
    if ('string' === typeof include) include = include.split(',');
    if ('string' === typeof exclude) exclude = exclude.split(',');

    const buffer: Array<object> = [];
    for (let item of data) {
        const tag: Set<string> = new Set(item['tag']);
        // exclude
        const hasExclude: number = new Set(exclude.filter(x => tag.has(x))).size;
        if (hasExclude > 0) continue;
        // include
        const hasInclude: number = new Set(include.filter(x => tag.has(x))).size;
        if (hasInclude !== include.length) continue;

        buffer.push(item);
    }
    return buffer;
}


export default {
    filterBookmark
};