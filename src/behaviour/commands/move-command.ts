import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class MoveCommand implements Command {
    performOn(simulator: Simulator): void {
        simulator.advanceRobot(1);
    }
}

async function parseMoveCommandBody(scanner: Scanner): Promise<MoveCommand> {
    return new MoveCommand();
}

export {
    MoveCommand,
    parseMoveCommandBody,
}