import { Vector } from "../util/vector";
import { Position } from "./position";

interface Bounds {
    origin: Position;
    extents: Vector;
}

function createBounds(origin: Position, extents: Vector): Bounds {
    return {
        origin,
        extents,
    }
}

function boundsContains(bounds: Bounds, position: Position) {
    const [x, y] = position;

    const minX = Math.min(bounds.origin[0], bounds.origin[0] + bounds.extents[0]);
    const minY = Math.min(bounds.origin[1], bounds.origin[1] + bounds.extents[1]);
    const maxX = Math.max(bounds.origin[0], bounds.origin[0] + bounds.extents[0]);
    const maxY = Math.max(bounds.origin[1], bounds.origin[1] + bounds.extents[1]);

    return (minX <= x) && (x < maxX) && (minY <= y) && (y < maxY);
}

export {
    Bounds,
    createBounds,
    boundsContains,
}