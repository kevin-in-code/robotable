import { Position } from "../concepts/position";

interface PlaySurface {
    contains: (position: Position) => boolean;
}

export {
    PlaySurface,
}
