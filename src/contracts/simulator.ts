import { Orientation } from "../concepts/orientation";
import { Position } from "../concepts/position";
import { Robot } from "../concepts/robot";

interface Simulator {
    placeRobot(position: Position, orientation: Orientation): void;
    advanceRobot(distance: number): void;
    turnRobot(degrees: number): void;

    reportRobotStatus(): void;
    reportRouteTo(goal: Position): void;
}

export {
    Simulator,
}
