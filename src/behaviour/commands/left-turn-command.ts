import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class LeftTurnCommand implements Command {
    performOn(simulator: Simulator): void {
        simulator.turnRobot(90);
    }
}

async function parseLeftTurnCommandBody(scanner: Scanner): Promise<LeftTurnCommand> {
    return new LeftTurnCommand();
}

export {
    LeftTurnCommand,
    parseLeftTurnCommandBody,
}
