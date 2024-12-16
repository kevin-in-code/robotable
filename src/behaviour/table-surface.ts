import { Bounds, boundsContains, createBounds } from "../concepts/bounds";
import { Position } from "../concepts/position";
import { PlaySurface } from "../contracts/play-surface";
import { readAllLines, Reader } from "../util/io/reader";
import { Vector } from "../util/vector";

class TableSurface implements PlaySurface {
    private surfaceBounds: Bounds
    private obstacles: Bounds[];

    constructor(origin: Position, extents: Vector, obstacles: Bounds[] = []) {
        this.surfaceBounds = createBounds(origin, extents);
        this.obstacles = obstacles;
    }

    isValidPosition(position: Vector): boolean {
        return boundsContains(this.surfaceBounds, position);
    }

    isAvailablePosition(position: Position): boolean {
        return this.isValidPosition(position) && !this.findObstacle(position);
    }

    private findObstacle(position: Position): Bounds | undefined {
        return this.obstacles.find(obstacleBounds => boundsContains(obstacleBounds, position));
    }
}

/**
 * Read a play surface encoded as text.
 * 
 * The input should consist of a grid of ASCII text with the following symbol key:
 *   - X denotes an obstacle
 *   - . denotes a traversable location
 * 
 * Example:
 * 
 *   XX...X
 *   X..X..
 *   X.XXX.
 *   ...X..
 *   XX...X
 * 
 * @param source Reader instance
 */
async function readSurfaceAsync(source: Reader): Promise<PlaySurface> {
    const lines = (await readAllLines(source)).reverse();

    let width = 0;
    let height = 0;

    let obstableBounds: Bounds[] = [];

    for (const line of lines) {
        height++;
        if (!!width && line.length !== width) {
            throw new Error(`Inconsistent row width on row ${height}`);
        } else {
            width = line.length;
        }

        for (let c = 0; c < line.length; c++) {
            const ch = line[c];
            switch (ch) {
                case 'X':
                    obstableBounds.push(createBounds([c, height - 1], [1, 1]));
                    break;
                case '.':
                    break;
                default:
                    throw new Error(`Unexpected character on row ${height}`);
            }
        }
    }
    
    return new TableSurface([0, 0], [width, height], obstableBounds);
}

export {
    TableSurface,
    readSurfaceAsync,
}
