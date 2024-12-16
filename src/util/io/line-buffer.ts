
/**
 * LineBuffer implements a buffer of text lines that may be filled
 * by any asynchronous activity, while exposing a promise-based API
 * for extracting the lines of text from the buffer.
 */
class LineBuffer {
    private lastLineReceived: boolean = false;
    private lines: string[] = [];
    private allLines: string[] = [];
    private newLineDelivered?: Promise<void>;
    private resolve?: () => void;

    constructor() {
        this.newLineDelivered = new Promise((resolve, _) => {
            this.resolve = resolve;
        })
    }

    get ready(): boolean {
        return this.lines.length > 0;
    }

    get endOfText(): boolean {
        return this.lines.length === 0 && this.lastLineReceived;
    }

    add(line: string) {
        if (!this.lastLineReceived) {
            this.lines.push(line);
            this.allLines.push(line);
            this.releaseReader();
        }
    }

    end() {
        this.lastLineReceived = true;
        this.releaseReader();
    }

    async readLine(): Promise<string | undefined> {
        // If we have run out of buffered lines, we need to wait
        // for a line to arrive.
        if (this.lines.length === 0 && !this.lastLineReceived) {
            await this.newLineDelivered;
        }

        // Here, we either have the next line, or we have come
        // to the end of the input.
        if (this.lines.length > 0) {
            return this.lines.shift();
        } else {
            return undefined;
        }
    }

    private releaseReader() {
        // Release the current reader to continue.
        if (this.resolve) {
            this.resolve();
            this.resolve = undefined;
        }

        // Create a synchronisation event for the reader of a future line.
        if (!this.lastLineReceived) {
            this.newLineDelivered = new Promise((resolve, _) => {
                this.resolve = resolve;
            });
        }
    }
}

export {
    LineBuffer,
}
