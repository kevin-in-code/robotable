import { Command } from "./command";

interface CommandSource {
    get isClosed(): boolean;

    getNextCommand(): Promise<Command>;
}

export {
    CommandSource,
}
