import { formatOrientation, Orientation, rotateOrientation } from "../concepts/orientation";
import { PathFinder } from "../concepts/path-finder";
import { equalPositions, move, Position } from "../concepts/position";
import { getReferenceRobotPosition, Robot } from "../concepts/robot";
import { PlaySurface } from "../contracts/play-surface";

interface State {
    position: Position;
    orientation: Orientation;
}

function describe(state: State) {
    return `${state.position[0]}-${state.position[1]}-${formatOrientation(state.orientation)}`;
}

const breadthFirstSearch: PathFinder = (surface: PlaySurface, robot: Robot, goal: Position) => {
    const start: State = { position: getReferenceRobotPosition(robot), orientation: robot.orientation };

    const uniqueStates = new Map<string, State>();
    uniqueStates.set(describe(start), start);

    const makeUnique = (state: State) => {
        const description = describe(state);
        if (uniqueStates.has(description)) return uniqueStates.get(description)!;

        uniqueStates.set(description, state);
        return state;
    };

    const nextMoves = (from: State) => {
        const moves: Move[] = [];

        moves.push({ source: from, action: 'LEFT', destination: makeUnique({ position: from.position, orientation: rotateOrientation(from.orientation, 90) }) });
        moves.push({ source: from, action: 'RIGHT', destination: makeUnique({ position: from.position, orientation: rotateOrientation(from.orientation, -90) }) });

        const advancedPosition = move(from.position, from.orientation);

        if (surface.isAvailablePosition(advancedPosition)) {
            moves.push({ source: from, action: 'MOVE', destination: makeUnique({ position: advancedPosition, orientation: from.orientation }) });
        }

        return moves;
    };

    const isGoal = (state: State) => equalPositions(state.position, goal);

    return bfs(
        start,
        nextMoves,
        isGoal,
    );
}

interface Move {
    action: string;
    source: State;
    destination: State;
}

function bfs(start: State, nextMoves: (from: State) => Move[], isGoal: (state: State) => boolean) {
    const howReached = new Map<State, Move | null>();
    const queue: State[] = [start];
    let finalState: State | undefined = undefined;
    howReached.set(start, null);
    console.log(describe(start));

    let state: State | undefined;
    while (state = queue.shift()) {
        console.log(getPath(howReached, state));
        if (isGoal(state)) {
            finalState = state;
            break;
        }

        const moves = nextMoves(state);
        for (const move of moves) {
            if (!howReached.has(move.destination)) {
                howReached.set(move.destination, move);
                queue.push(move.destination);
                console.log(describe(move.destination));
            }
        }
    }

    if (finalState === undefined) return undefined;

    const actions = [];
    let currentState = finalState;
    while (howReached.has(currentState) && howReached.get(currentState) !== null) {
        const move = howReached.get(currentState)!;
        actions.unshift(move.action);
        currentState = move.source;
    }
    return actions;
}

function getPath(howReached: Map<State, Move | null>, state: State) {
    const path = [describe(state)];
    let currentState = state;
    while (howReached.has(currentState) && howReached.get(currentState) !== null) {
        const move = howReached.get(currentState)!;
        path.unshift(describe(move.source));
        currentState = move.source;
    }
    return path.join(' -> ');
}

export {
    breadthFirstSearch,
};
