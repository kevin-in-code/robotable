import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class RightTurnCommand implements Command {
    performOn(simulator: Simulator): void {
        simulator.turnRobot(-90);
    }
}

async function parseRightTurnCommandBody(scanner: Scanner): Promise<RightTurnCommand> {
    return new RightTurnCommand();
}

export {
    RightTurnCommand,
    parseRightTurnCommandBody,
}