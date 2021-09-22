import { Orientation } from "../concepts/orientation";
import { Position } from "../concepts/position";
import { Robot } from "../concepts/robot";

interface Simulator {
    placeRobot(position: Position, orientation: Orientation): void;
    advanceRobot(distance: number): void;
    turnRobot(degrees: number): void;

    report(): void;
}

export {
    Simulator,
}
