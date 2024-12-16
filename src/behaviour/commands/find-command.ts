import { Orientation, parseOrientation } from "../../concepts/orientation";
import { parsePosition, Position } from "../../concepts/position";
import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class FindCommand implements Command {
    private goal: Position;

    constructor(goal: Position) {
        this.goal = goal;
    }

    performOn(simulator: Simulator): void {
        simulator.reportRouteTo(this.goal);
    }
}

async function parseFindCommandBody(scanner: Scanner): Promise<FindCommand> {
    const goal = await parsePosition(scanner);
    return new FindCommand(goal);
}

export {
    FindCommand,
    parseFindCommandBody,
}
