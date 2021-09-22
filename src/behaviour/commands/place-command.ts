import { Orientation, parseOrientation } from "../../concepts/orientation";
import { parsePosition, Position } from "../../concepts/position";
import { Command } from "../../contracts/command";
import { Simulator } from "../../contracts/simulator";
import { Scanner } from "../../util/scanner";

class PlaceCommand implements Command {
    private position: Position;
    private orientation: Orientation;

    constructor(position: Position, orientation: Orientation) {
        this.position = position;
        this.orientation = orientation;
    }

    performOn(simulator: Simulator): void {
        simulator.placeRobot(this.position, this.orientation);
    }
}

async function parsePlaceCommandBody(scanner: Scanner): Promise<PlaceCommand> {
    const position = await parsePosition(scanner);
    await scanner.accept(',');
    const orientation = await parseOrientation(scanner);
    return new PlaceCommand(position, orientation);
}

export {
    PlaceCommand,
    parsePlaceCommandBody,
}
