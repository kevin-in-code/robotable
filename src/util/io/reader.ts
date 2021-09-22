
interface Reader {
    get ready(): boolean;

    get endOfText(): boolean;

    readLine(): Promise<string | undefined>;
}

export {
    Reader,
}
