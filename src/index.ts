import process from 'process'

import { createReadStream } from 'fs';

import { CommandStreamReader } from './behaviour/command-stream-reader';
import { RobotSimulator } from './behaviour/robot-simulator';
import { runSimulation } from './behaviour/simulation';
import { TableSurface } from './behaviour/table-surface';
import { StreamReader } from './util/io/stream-reader';
import { getRobotState, Robot } from './concepts/robot';

const args = process.argv.slice(2);

function report(robot: Robot) {
    const state = getRobotState(robot);
    process.stdout.write(`Output: ${state}\n`);
}

async function main() {
    const surface = new TableSurface([0, 0], [5, 5]);
    const simulator = new RobotSimulator(surface, report);

    const isTTY = args.length === 0;
    const readable =
        args.length > 0
        ? createReadStream(args[0])
        : process.stdin;process.stdin.setNoDelay(true);

    const stream = new CommandStreamReader(new StreamReader(readable), isTTY);

    await runSimulation(simulator, stream);
    process.exit(0);
}

main();

