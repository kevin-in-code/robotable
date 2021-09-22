import { getOrientationDirection, Orientation, rotateOrientation } from '../concepts/orientation';
import { createRobot, Robot } from '../concepts/robot';
import { PlaySurface } from '../contracts/play-surface';
import { Simulator } from '../contracts/simulator'
import { addVectors, Vector } from '../util/vector';


class RobotSimulator implements Simulator {
    private surface: PlaySurface;
    private reportReceiver?: (robot: Robot) => void;
    private robot?: Robot;

    constructor(surface: PlaySurface, reportReceiver?: (robot: Robot) => void) {
        this.surface = surface;
        this.reportReceiver = reportReceiver;
    }

    placeRobot(position: Vector, orientation: Orientation): void {
        const robot = createRobot(position, orientation);

        if (this.surface.contains(robot.centre)) {
            this.robot = robot;
        }
    }

    advanceRobot(distance: number): void {
        if (!this.robot) return;
        
        const [dx, dy] = getOrientationDirection(this.robot.orientation);
        const position = addVectors(
            this.robot.centre,
            [ dx * distance, dy * distance ]);
        
        if (this.surface.contains(position)) {
            this.robot.centre = position;
        }
    }

    turnRobot(degrees: number): void {
        if (!this.robot) return;

        this.robot.orientation = rotateOrientation(
            this.robot.orientation,
            degrees);
    }

    report(): void {
        if (this.reportReceiver && this.robot) {
            this.reportReceiver(this.robot);
        }
    }
}

export {
    RobotSimulator,
}
