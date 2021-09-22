import { parseMoveCommandBody } from '@src/behaviour/commands/move-command';
import { ArrayReader } from '@src/util/io/array-reader';
import { Scanner } from '@src/util/scanner';
import { MockSimulator } from '../contracts/mock-simulator';


test('parse and apply move command', async () => {

    const simulator = new MockSimulator();
    const scanner = new Scanner(
        new ArrayReader([
            'MOVE'
        ]));

    const name = await scanner.acceptWord();
    const command = await parseMoveCommandBody(scanner);

    command.performOn(simulator);

    expect(name).toStrictEqual('MOVE');
    expect(simulator.position[0]).toStrictEqual(0);
    expect(simulator.position[1]).toStrictEqual(0);
    expect(simulator.orientation.theta).toStrictEqual(0);
    expect(simulator.advances).toStrictEqual(1);
    expect(simulator.turns).toStrictEqual(0);
    expect(simulator.reports).toStrictEqual(0);

});
