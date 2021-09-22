import { Readable } from 'node:stream'
import { createInterface } from 'readline'

import { LineBuffer } from "./line-buffer";
import { Reader } from "./reader";

/**
 * StreamReader implements Reader for files and standard input.
 * It essentially converts the non-promise functional NodeJS Readable
 * into an promise-based interface for reading lines of text.
 */
class StreamReader implements Reader {
    private lines: LineBuffer;

    constructor(stream: Readable) {
        this.lines = new LineBuffer();

        let rl = createInterface({
            input: stream,
        })
        rl.on('line', line => {
            this.lines.add(line);
        });
        rl.on('close', () => {
            this.lines.end();
        })
    }

    get ready(): boolean {
        return this.lines.ready;
    }

    get endOfText(): boolean {
        return this.lines.endOfText;
    }

    readLine(): Promise<string | undefined> {
        return this.lines.readLine();
    }
}

export {
    StreamReader,
}
