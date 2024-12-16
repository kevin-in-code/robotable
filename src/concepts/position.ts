import { Scanner } from "../util/scanner";
import { addVectors, Vector } from "../util/vector";
import { getOrientationDirection, Orientation } from "./orientation";

type Position = Vector;

async function parsePosition(scanner: Scanner): Promise<Position> {
    const x = await scanner.acceptNumber();
    await scanner.accept(',');
    const y = await scanner.acceptNumber();
    return [x, y];
}

function move(position: Position, direction: Orientation, distance: number = 1) {
    const [dx, dy] = getOrientationDirection(direction);
    return addVectors(position, [ dx * distance, dy * distance ]);
}

function equalPositions(a: Position, b: Position) {
    return (Math.abs(a[0] - b[0]) < 0.0000001) && (Math.abs(a[1] - b[1]) < 0.0000001);
}

function formatPosition(position: Position) {
    const [x, y] = position;
    return `${x},${y}`;
}

export {
    Position,
    equalPositions,
    move,
    parsePosition,
    formatPosition,
}
