import process from 'process'

import { createReadStream } from 'fs';

import { CommandStreamReader } from './behaviour/command-reader';
import { RobotSimulator } from './behaviour/robot-simulator';
import { runSimulation } from './behaviour/simulation';
import { readSurfaceAsync, TableSurface } from './behaviour/table-surface';
import { StreamReader } from './util/io/stream-reader';
import { breadthFirstSearch } from './behaviour/breadth-first-search';

const args = process.argv.slice(2);

function publish(text: string) {
    process.stdout.write(`${text}\n`);
}

async function main() {
    const isTTY = args.length === 0;

    if (isTTY) {
        process.stdin.setNoDelay(true);
    }

    const readers = args.length > 0
        ? args.map(filename => new StreamReader(createReadStream(filename)))
        : [ new StreamReader(process.stdin) ];

    const surface = readers.length >= 2
        ? await readSurfaceAsync(readers[1])
        : new TableSurface([0, 0], [5, 5]);

    const simulator = new RobotSimulator(surface, breadthFirstSearch, publish);

    const stream = new CommandStreamReader(readers[0], isTTY);

    await runSimulation(simulator, stream);
    process.exit(0);
}

try {
    main();
} catch (e) {
    console.error(e);
    process.exit(1);
}

