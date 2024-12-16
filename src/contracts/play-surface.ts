import { Position } from "../concepts/position";

interface PlaySurface {
    isValidPosition: (position: Position) => boolean;

    isAvailablePosition: (position: Position) => boolean;
}

export {
    PlaySurface,
}
