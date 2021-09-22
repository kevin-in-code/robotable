import { addVectors, subtractVectors } from "../util/vector";

import { formatOrientation, Orientation } from "./orientation";
import { formatPosition, Position } from "./position";

interface Robot {
    centre: Position;
    orientation: Orientation;
    size: number;
}

function createRobot(position: Position, orientation: Orientation, size: number = 1): Robot {
    return {
        centre: addVectors(position, [ 0.5 * size, 0.5 * size ]),
        orientation,
        size,
    };
}

function getReferenceRobotPosition(robot: Robot): Position {
    return subtractVectors(robot.centre, [0.5 * robot.size, 0.5 * robot.size]);
}

function getRobotState(robot: Robot) {
    const position = formatPosition(
        getReferenceRobotPosition(robot)
    );
    const orientation = formatOrientation(
        robot.orientation
    )

    return `${position},${orientation}`;
}

export {
    Robot,
    createRobot,
    getReferenceRobotPosition,
    getRobotState,
}
