import { PathFinder } from '@src/concepts/path-finder';
import { move, Position } from '../concepts/position';
import { Orientation, rotateOrientation } from '../concepts/orientation';
import { createRobot, getRobotState, Robot } from '../concepts/robot';
import { PlaySurface } from '../contracts/play-surface';
import { Simulator } from '../contracts/simulator'
import { Vector } from '../util/vector';


class RobotSimulator implements Simulator {
    private surface: PlaySurface;
    private pathFinder?: PathFinder;
    private publish?: (text: string) => void;
    private robot?: Robot;

    constructor(surface: PlaySurface, pathFinder?: PathFinder, publish?: (text: string) => void) {
        this.surface = surface;
        this.pathFinder = pathFinder;
        this.publish = publish;
    }

    placeRobot(position: Vector, orientation: Orientation): void {
        const robot = createRobot(position, orientation);

        if (this.surface.isAvailablePosition(robot.centre)) {
            this.robot = robot;
        }
    }

    advanceRobot(distance: number): void {
        if (!this.robot) return;
        
        const position = move(this.robot.centre, this.robot.orientation, distance);
        
        if (this.surface.isAvailablePosition(position)) {
            this.robot.centre = position;
        }
    }

    turnRobot(degrees: number): void {
        if (!this.robot) return;

        this.robot.orientation = rotateOrientation(
            this.robot.orientation,
            degrees);
    }

    reportRobotStatus(): void {
        if (!this.publish || !this.robot) return;

        const state = getRobotState(this.robot);
        this.publish(`Output: ${state}`);
    }

    reportRouteTo(goal: Position): void {
        if (!this.publish || !this.robot || !this.pathFinder) return;

        const script = this.pathFinder(this.surface, this.robot, goal);
        if (!script) {
            this.publish('NO ROUTE')
        } else {
            for (const action of script) {
                this.publish(`Step: ${action}`);
            }
        }
    }
}

export {
    RobotSimulator,
}
