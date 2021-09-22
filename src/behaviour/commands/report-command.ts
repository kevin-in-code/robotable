import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class ReportCommand implements Command {
    performOn(simulator: Simulator): void {
        simulator.report();
    }
}

async function parseReportCommandBody(scanner: Scanner): Promise<ReportCommand> {
    return new ReportCommand();
}

export {
    ReportCommand,
    parseReportCommandBody,
}