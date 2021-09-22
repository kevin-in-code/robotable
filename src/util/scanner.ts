import { Reader } from "./io/reader";

const TERMINALS = /((\s+)|([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)|(\w+))/;

const END     = 0
const EOL     = 1
const SPACING = 2;
const NUMBER  = 3;
const WORD    = 4;
const OTHER   = 5;
const SYNC    = -1;
const ERROR   = -2;

class Token {
    readonly kind: number;
    readonly text: string;
    readonly lineNo?: number;
    readonly index?: number;

    constructor(kind: number, text: string, lineNo: number, index: number) {
        this.kind = kind;
        this.text = text;
        this.lineNo = lineNo;
        this.index = index;
    }
}

class Scanner {
    private currentLine?: string;
    private source: Reader;
    private maxConsecutiveEmptyLines?: number;
    private lineNo = 0;
    private index = 0;

    private pendingTokenKind?: number;
    private currentTokenKind?: number;
    private currentTokenText?: string;
    private currentTokenLineNo?: number;
    private currentTokenIndex?: number;

    constructor(reader: Reader, maxConsecutiveEmptyLines?: number) {
        this.source = reader;
        this.maxConsecutiveEmptyLines = maxConsecutiveEmptyLines;
    }

    get token() {
        if (!this.currentTokenKind) return undefined;

        return new Token(
            this.currentTokenKind,
            this.currentTokenText ?? '',
            this.currentTokenLineNo ?? 1,
            this.currentTokenIndex ?? 1);
    }

    private error(message: string): Error {
        const text = `${this.currentTokenLineNo ?? 1}:${this.currentTokenIndex ?? 1} ${message}`;
        return new Error(text);
    }

    private extract(size: number, kind: number): number {
        this.currentTokenText = this.currentLine!.substring(0, size);
        this.currentLine = this.currentLine!.substring(size);
        this.index += size;
        return kind;
    }

    private async advanceLine(): Promise<string | undefined> {
        const line = await this.source.readLine();
        if (line !== undefined) {
            this.lineNo++;
            this.index = 1;
        }
        return line;
    }

    private async scan(): Promise<number> {
        this.currentTokenText = '';

        if (this.currentTokenKind === SYNC) return SYNC;
        if (this.currentTokenKind === END) return END;
        if (this.currentTokenKind === ERROR) return SYNC;

        if (this.currentLine === undefined) {
            // If we are at the end of text, we remain there.
            if (this.source.endOfText ||
                undefined === (this.currentLine = await this.advanceLine())
            ) {
                return END;
            }
        }

        this.currentTokenLineNo = this.lineNo;
        this.currentTokenIndex = this.index;

        if (this.currentLine === '') {
            this.currentLine = await this.advanceLine();
            return EOL;
        }
        
        const match = TERMINALS.exec(this.currentLine);
        if (match) {
            if (match.index) {
                return this.extract(match.index, OTHER);
            }
            for (var kind = SPACING; kind <= WORD; kind++) {
                if (match[kind] !== undefined) {
                    return this.extract(match[kind].length, kind);
                }
            }
        }

        return this.extract(this.currentLine.length, OTHER);
    }

    private async scanToken() : Promise<number> {
        let kind = await this.scan();
        let countEOL = (this.index === 1) ? 1 : 0;
        while (kind === SPACING || kind === EOL) {
            if (kind === EOL) {
                countEOL++;

                // We optionally can abort processing after observing empty lines.
                if (this.maxConsecutiveEmptyLines && countEOL > this.maxConsecutiveEmptyLines) {
                    kind = END;
                    break;
                }
            }
            kind = await this.scan();
        }
        this.currentTokenKind = kind;
        this.pendingTokenKind = kind;
        return kind;
    }

    private async nextToken(acceptIt: boolean): Promise<number> {
        if (this.pendingTokenKind === undefined) await this.scanToken();
        if (acceptIt) {
            this.pendingTokenKind = undefined;
        }
        return this.currentTokenKind!;
    }

    get endOfText(): boolean {
        return this.currentTokenKind === END;
    }

    async peek(): Promise<number> {
        return await this.nextToken(false);
    }

    async acceptAny(): Promise<string> {
        const kind = await this.nextToken(true);

        return this.currentTokenText ?? '';
    }

    async accept(text: string): Promise<string> {
        const kind = await this.nextToken(true);

        if (this.currentTokenText === text) return text;

        throw this.error(`expected \'${text.replace('\'', '\\\'')}\'`);
    }

    async acceptWord(): Promise<string> {
        const kind = await this.nextToken(true);

        if (this.currentTokenKind === WORD) return this.currentTokenText!;

        throw this.error(`expected word`);
    }

    async acceptNumber(): Promise<number> {
        const kind = await this.nextToken(true);

        if (this.currentTokenKind === NUMBER) return parseFloat(this.currentTokenText!);

        throw this.error(`expected number`);
    }

    async acceptEnd(): Promise<void> {
        const kind = await this.nextToken(true);

        if (this.currentTokenKind === END) return;

        throw this.error(`expected end of text`);
    }

    async sync(): Promise<void> {
        if (this.currentTokenKind === ERROR || this.currentTokenKind === SYNC) {
            while (this.currentTokenKind !== END && this.currentTokenKind !== EOL) {
                this.currentTokenKind = undefined;
                this.currentTokenKind = await this.scan();
            }
        }
    }
}

export {
    Scanner,
    END,
    EOL,
    SPACING,
    NUMBER,
    WORD,
    OTHER,
    SYNC,
    ERROR,
}
