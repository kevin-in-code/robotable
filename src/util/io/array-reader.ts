import { Reader } from "./reader";

/**
 * ArrayReader implements Reader for an array of string lines.
 * It is most useful as a mock substitute where StreamReader
 * might otherwise be the preferred Reader implementation.
 */
class ArrayReader implements Reader {
    private lines: string[];

    constructor(text: string);
    constructor(lines: string[]);
    constructor(lines: string[] | string);
    constructor(lines: string[] | string) {
        if (typeof lines === 'string' || lines instanceof String) {
            lines = lines.split(/\r?\n/);
        }
        this.lines = lines;
    }

    get ready(): boolean {
        return this.lines.length > 0;
    }

    get endOfText(): boolean {
        return this.lines.length == 0;
    }

    readLine(): Promise<string | undefined> {
        return Promise.resolve(this.lines.shift());
    }
}

export {
    ArrayReader,
}
