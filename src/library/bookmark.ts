
export interface RawHashArguements {
    include?: undefined | string | Array<string>;
    exclude?: undefined | string | Array<string>;
}
export interface HashArguements {
    include: Set<string>;
    exclude: Set<string>;
}
export interface Bookmark {
    tag: Array<string>;
}

function parseArguements(args: RawHashArguements): HashArguements {
    let include = args.include || new Set();
    let exclude = args.exclude || new Set();
    if ('string' === typeof include) include = new Set(include.split(','));
    if ('string' === typeof exclude) exclude = new Set(exclude.split(','));
    return {
        include,
        exclude
    } as HashArguements;
}


function filterBookmark(
    data: Array<Bookmark>,
    args: HashArguements
): Array<Bookmark> {
    const include = args.include;
    const exclude = args.exclude;
    const buffer: Array<Bookmark> = [];

    for (let item of data) {
        const tag: Set<string> = new Set(item['tag']);
        // exclude
        const hasExclude: number = new Set(Array.from(exclude).filter(x => tag.has(x))).size;
        if (hasExclude > 0) continue;
        // include
        const hasInclude: number = new Set(Array.from(include).filter(x => tag.has(x))).size;
        if (hasInclude !== include.size) continue;

        buffer.push(item);
    }
    return buffer;
}


export default {
    parseArguements,
    filterBookmark
};