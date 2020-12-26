
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


/**
 * 自动分配标签颜色
 */
import { randomSoftRGBColor } from "./random";
export class TagColorHolder {
    private __color_map__: Map<string, string>;
    constructor() {
        this.__color_map__ = new Map<string, string>();
    }
    // add(tagName: string) {
    //     if ( ! this.__color_map__.has(tagName)) {
    //         this.__color_map__.set(tagName, randomSoftRGBColor());
    //     }
    // }
    get(tagName: string): string {
        if (this.__color_map__.has(tagName)) {
            return this.__color_map__.get(tagName);
        } else {
            const color = randomSoftRGBColor();
            this.__color_map__.set(tagName, color);
            return color;
        }
    }
}


export default {
    parseArguements,
    filterBookmark,
    tagColorHolder: new TagColorHolder()
};