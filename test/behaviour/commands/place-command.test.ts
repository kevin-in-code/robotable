import { parsePlaceCommandBody } from '@src/behaviour/commands/place-command'
import { ArrayReader } from '@src/util/io/array-reader';
import { Scanner } from '@src/util/scanner';
import { MockSimulator } from '../contracts/mock-simulator';


test('parse and apply place command', async () => {

    const simulator = new MockSimulator();
    const scanner = new Scanner(
        new ArrayReader([
            'PLACE 1,2,WEST'
        ]));

    const name = await scanner.acceptWord();
    const command = await parsePlaceCommandBody(scanner);

    command.performOn(simulator);

    expect(name).toStrictEqual('PLACE');
    expect(simulator.position[0]).toStrictEqual(1);
    expect(simulator.position[1]).toStrictEqual(2);
    expect(simulator.orientation.theta).toStrictEqual(180);
    expect(simulator.advances).toStrictEqual(0);
    expect(simulator.turns).toStrictEqual(0);
    expect(simulator.reports).toStrictEqual(0);

});
