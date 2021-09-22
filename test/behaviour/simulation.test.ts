import { Position } from "@src/concepts/position"
import { getRobotState, Robot } from "@src/concepts/robot"
import { ArrayReader } from "@src/util/io/array-reader"
import { Vector } from "@src/util/vector"
import { CommandStreamReader } from "@src/behaviour/command-stream-reader"
import { RobotSimulator } from "@src/behaviour/robot-simulator"
import { runSimulation } from "@src/behaviour/simulation"
import { TableSurface } from "@src/behaviour/table-surface"

async function recordSimulation(
    origin: Position,
    extents: Vector,
    input: string[]): Promise<string[]> {

    var output: string[] = [];
    const collector = (robot: Robot) => {
        output.push(getRobotState(robot));
    }
    
    const surface = new TableSurface(origin, extents);
    const simulator = new RobotSimulator(surface, collector);
    const stream = new CommandStreamReader(new ArrayReader(input));

    await runSimulation(simulator, stream);

    return output;
}

function expectEqualArrays(actual: any[], expected: any[]) {
    expect(actual.length).toStrictEqual(expected.length);
    for (var c = 0; c < actual.length; c++) {
        expect(actual[c]).toStrictEqual(expected[c]);
    }
}

test('simulation remains on table', async () => {
    const expected = [ '0,4,NORTH' ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 0,0,NORTH',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})

test('simulation without placement does nothing', async () => {
    const expected: string[] = [ ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'MOVE',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})

test('simulation 1', async () => {
    const expected = [ '0,1,NORTH' ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 0,0,NORTH',
            'MOVE',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})

test('simulation 2', async () => {
    const expected = [ '0,0,WEST' ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 0,0,NORTH',
            'LEFT',
            'REPORT'
        ]
    );

    expectEqualArrays(actual, expected);
})

test('simulation 3', async () => {
    const expected = [ '3,3,NORTH' ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 1,2,EAST',
            'MOVE',
            'MOVE',
            'LEFT',
            'MOVE',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})

test('a significant trail is followed', async () => {
    const expected = [ '3,3,WEST' ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 0,0,NORTH',
            'PLACE 2,2,NORTH',
            'RIGHT',
            'MOVE',
            'MOVE',
            'MOVE',
            'LEFT',
            'MOVE',
            'LEFT',
            'MOVE',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})

test('correct rotation', async () => {
    const expected = [
        '2,2,NORTH',
        '2,2,WEST',
        '2,2,SOUTH',
        '2,2,EAST',
        '2,2,NORTH',
        '2,2,EAST',
        '2,2,SOUTH',
        '2,2,WEST',
        '2,2,NORTH',
    ];
    const actual = await recordSimulation(
        [0, 0],
        [5, 5],
        [
            'PLACE 2,2,NORTH',
            'REPORT',
            'LEFT',
            'REPORT',
            'LEFT',
            'REPORT',
            'LEFT',
            'REPORT',
            'LEFT',
            'REPORT',
            'RIGHT',
            'REPORT',
            'RIGHT',
            'REPORT',
            'RIGHT',
            'REPORT',
            'RIGHT',
            'REPORT',
        ]
    );

    expectEqualArrays(actual, expected);
})
