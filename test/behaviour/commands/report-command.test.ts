import { parseReportCommandBody } from '@src/behaviour/commands/report-command';
import { ArrayReader } from '@src/util/io/array-reader';
import { Scanner } from '@src/util/scanner';
import { MockSimulator } from '../contracts/mock-simulator';


test('parse and apply report command', async () => {

    const simulator = new MockSimulator();
    const scanner = new Scanner(
        new ArrayReader([
            'REPORT'
        ]));

    const name = await scanner.acceptWord();
    const command = await parseReportCommandBody(scanner);

    command.performOn(simulator);

    expect(name).toStrictEqual('REPORT');
    expect(simulator.position[0]).toStrictEqual(0);
    expect(simulator.position[1]).toStrictEqual(0);
    expect(simulator.orientation.theta).toStrictEqual(0);
    expect(simulator.advances).toStrictEqual(0);
    expect(simulator.turns).toStrictEqual(0);
    expect(simulator.reports).toStrictEqual(1);

});
