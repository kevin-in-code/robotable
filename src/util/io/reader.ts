
interface Reader {
    get ready(): boolean;

    get endOfText(): boolean;

    readLine(): Promise<string | undefined>;
}

async function readAllLines(source: Reader): Promise<string[]> {
    const lines = [];
    while (!source.endOfText) {
        const line = await source.readLine();
        if (line !== undefined) lines.push(line);
    }
    return lines;
}

export {
    Reader,
    readAllLines,
}
