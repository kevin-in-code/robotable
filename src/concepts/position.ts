import { Scanner } from "../util/scanner";
import { Vector } from "../util/vector";

type Position = Vector;

async function parsePosition(scanner: Scanner): Promise<Position> {
    const x = await scanner.acceptNumber();
    await scanner.accept(',');
    const y = await scanner.acceptNumber();
    return [x, y];
}

function formatPosition(position: Position) {
    const [x, y] = position;
    return `${x},${y}`;
}

export {
    Position,
    parsePosition,
    formatPosition,
}
