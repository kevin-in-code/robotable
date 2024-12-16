import { Command } from "../contracts/command";
import { CommandSource } from "../contracts/command-source";
import { Reader } from "../util/io/reader";
import { END, Scanner } from "../util/scanner";

import { parseLeftTurnCommandBody } from "./commands/left-turn-command";
import { parseReportCommandBody } from "./commands/report-command";
import { parseRightTurnCommandBody } from "./commands/right-turn-command";
import { parseMoveCommandBody } from "./commands/move-command";
import { parsePlaceCommandBody } from "./commands/place-command";
import { NullCommand } from "./commands/null-command";
import { parseFindCommandBody } from "./commands/find-command";

class CommandReader implements CommandSource {
    private scanner: Scanner;

    constructor(reader: Reader, isTTY?: boolean) {
        this.scanner = new Scanner(reader, isTTY && 2 || undefined);
    }

    get isClosed(): boolean {
        return this.scanner.endOfText;
    }

    async getNextCommand(): Promise<Command> {
        try {
            const kind = await this.scanner.peek();
            if (kind === END) {
                return new NullCommand();
            }

            let word = await this.scanner.acceptWord();

            var command: Command;
            switch (word) {
                case 'PLACE':
                    command = await parsePlaceCommandBody(this.scanner);
                    break;

                case 'MOVE':
                    command = await parseMoveCommandBody(this.scanner);
                    break;

                case 'LEFT':
                    command = await parseLeftTurnCommandBody(this.scanner);
                    break;

                case 'RIGHT':
                    command = await parseRightTurnCommandBody(this.scanner);
                    break;

                case 'REPORT':
                    command = await parseReportCommandBody(this.scanner);
                    break;

                case 'FIND':
                    command = await parseFindCommandBody(this.scanner);
                    break;
        
                default:
                    throw new Error('Invalid command');
            }

            return command;

        } catch (e) {
            await this.scanner.sync();
            throw e;
        }
    }
}

export {
    CommandReader as CommandStreamReader,
}
