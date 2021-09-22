import { CommandSource } from "../contracts/command-source";
import { Simulator } from "../contracts/simulator";

async function runSimulation(simulator: Simulator, commandSource: CommandSource) {
    while (!commandSource.isClosed) {
        const command = await commandSource.getNextCommand();

        command.performOn(simulator);
    }
}

export {
    runSimulation,
}
