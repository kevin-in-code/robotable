import { Orientation } from "@src/concepts/orientation";
import { Position } from "@src/concepts/position";
import { Simulator } from "@src/contracts/simulator";

class MockSimulator implements Simulator {
    position: Position = [0, 0];
    orientation: Orientation = { theta: 0 };

    advances: number = 0;
    turns: number = 0;
    reports: number = 0;

    totalDistance: number = 0;
    totalDegrees: number = 0;

    placeRobot(position: Position, orientation: Orientation) {
        this.position = position;
        this.orientation = orientation;
    }

    advanceRobot(distance: number) {
        this.advances++;
        this.totalDistance += Math.abs(distance);
    }

    turnRobot(degrees: number) {
        this.turns++;
        this.totalDegrees += Math.abs(degrees);
    }

    report() {
        this.reports++;
    }
}

export {
    MockSimulator,
}
