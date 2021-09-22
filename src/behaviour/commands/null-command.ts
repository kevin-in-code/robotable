import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class NullCommand implements Command {
    performOn(simulator: Simulator): void {
    }
}

export {
    NullCommand,
}
