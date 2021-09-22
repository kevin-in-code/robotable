import { parseLeftTurnCommandBody } from '@src/behaviour/commands/left-turn-command'
import { parseRightTurnCommandBody } from '@src/behaviour/commands/right-turn-command'
import { ArrayReader } from '@src/util/io/array-reader';
import { Scanner } from '@src/util/scanner';
import { MockSimulator } from '../contracts/mock-simulator';


test('parse and apply move command', async () => {

    const simulator = new MockSimulator();
    const scanner = new Scanner(
        new ArrayReader([
            'LEFT',
            'RIGHT',
        ]));

    await scanner.acceptWord();
    const commandL = await parseLeftTurnCommandBody(scanner);

    await scanner.acceptWord();
    const commandR = await parseRightTurnCommandBody(scanner);

    commandL.performOn(simulator);
    commandR.performOn(simulator);

    expect(simulator.turns).toStrictEqual(2);
    expect(simulator.totalDegrees).toStrictEqual(180);

});

