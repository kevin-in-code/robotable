import { formatPosition, parsePosition, Position } from "@src/concepts/position";
import { ArrayReader } from "@src/util/io/array-reader";
import { Scanner } from "@src/util/scanner";


test('parse valid position', async () => {

    const scanner = new Scanner(new ArrayReader('1, 2'));

    const [x, y] = await parsePosition(scanner);

    expect(x).toStrictEqual(1);
    expect(y).toStrictEqual(2);

});

test('reject invalid position', async () => {

    const scanner = new Scanner(new ArrayReader('1, a'));

    await expect(async () => {await parsePosition(scanner)})
        .rejects.toThrow();

});

test('format valid position', async () => {

    const position: Position = [1, 2];

    const actual = formatPosition(position);

    expect(actual).toStrictEqual('1,2');

});
