import { Bounds, boundsContains, createBounds } from "../concepts/bounds";
import { Position } from "../concepts/position";
import { PlaySurface } from "../contracts/play-surface";
import { Vector } from "../util/vector";

class TableSurface implements PlaySurface {
    private bounds: Bounds

    constructor(origin: Position, extents: Vector) {
        this.bounds = createBounds(origin, extents);
    }

    contains(position: Vector): boolean {
        return boundsContains(this.bounds, position);
    }
}

export {
    TableSurface,
}
