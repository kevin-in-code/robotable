import { Scanner } from "../util/scanner";
import { Vector } from "../util/vector";

interface Orientation {
    theta: number;
};

function createOrientation(theta: number): Orientation {
    theta = ((theta % 360) + 360) % 360;
    return {
        theta,
    }
}

function rotateOrientation(orientation: Orientation, degrees: number): Orientation {
    return createOrientation(orientation.theta + degrees);
}

function getOrientationDirection(orientation: Orientation): Vector {
    switch (orientation.theta) {
        case 0:    return [1, 0];
        case 90:   return [0, 1];
        case 180:  return [-1, 0];
        case 270:  return [0, -1];
    }
    throw new Error('Non-compass orientation detected');
}

async function parseOrientation(scanner: Scanner): Promise<Orientation> {
    const word = await scanner.acceptWord();
    switch (word.toUpperCase())
    {
        case 'NORTH': return createOrientation(90);
        case 'EAST': return createOrientation(0);
        case 'SOUTH': return createOrientation(270);
        case 'WEST': return createOrientation(180);
    }
    throw new Error('Unknown orientation');
}

function formatOrientation(orientation: Orientation) {
    switch (orientation.theta) {
        case 0:    return 'EAST';
        case 90:   return 'NORTH';
        case 180:  return 'WEST';
        case 270:  return 'SOUTH';
    }
    throw new Error('Non-compass orientation detected');
}

export {
    Orientation,
    createOrientation,
    rotateOrientation,
    getOrientationDirection,
    parseOrientation,
    formatOrientation,
}
