
import { ArrayReader } from '@src/util/io/array-reader'
import { Scanner } from '@src/util/scanner'

async function check(
    input: string[] | string,
    expectations: [(s: Scanner)=>Promise<any> | any, any][]) {

    let reader = new ArrayReader(input);
    let scanner = new Scanner(reader);

    for (const item of expectations) {
        let actual = await Promise.resolve(item[0](scanner));

        expect(item[1]).toStrictEqual(actual);
    }

    await scanner.acceptEnd();

    await expect(scanner.acceptEnd()).resolves.toReturn;
}

test('produce a single word', async () => {

    await check(
        [
            'abc',
        ],
        [
            [ s => s.acceptWord(), 'abc' ],
        ]
    );

});

test('produce a single word, skipping single-line ignorable content', async () => {

    await check(
        [
            '  abc',
        ],
        [
            [ s => s.acceptWord(), 'abc' ],
        ]
    );

});

test('produce a single word, skipping multi-line ignorable content', async () => {

    await check(
        [
            '',
            ' ',
            '  abc',
        ],
        [
            [ s => s.acceptWord(), 'abc' ],
        ]
    );

});

test('produce a token variety', async () => {

    await check(
        [
            'abc',
            '123 -101 -0.5',
        ],
        [
            [ s => s.acceptWord(), 'abc' ],
            [ s => s.acceptNumber(), 123 ],
            [ s => s.acceptNumber(), -101 ],
            [ s => s.acceptNumber(), -0.5 ],
        ]
    );

});

test('produce comma-separated values', async () => {

    await check(
        [
            'PLACE 1,2,NORTH',
            'MOVE',
        ],
        [
            [ s => s.acceptWord(), 'PLACE' ],
            [ s => s.acceptNumber(), 1 ],
            [ s => s.accept(','), ',' ],
            [ s => s.acceptNumber(), 2 ],
            [ s => s.accept(','), ',' ],
            [ s => s.acceptWord(), 'NORTH' ],
            [ s => s.acceptWord(), 'MOVE' ],
        ]
    );

});
