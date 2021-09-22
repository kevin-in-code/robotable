import { ArrayReader } from "@src/util/io/array-reader";
import { Scanner } from "@src/util/scanner";
import { formatOrientation, getOrientationDirection, parseOrientation, rotateOrientation } from "@src/concepts/orientation";

test('parse and format should round trip for valid orientations', async () => {

    const scanner = new Scanner(
        new ArrayReader([
            'NORTH', 'EAST', 'SOUTH', 'WEST'
        ]));

    const north = formatOrientation(await parseOrientation(scanner));
    const east = formatOrientation(await parseOrientation(scanner));
    const south = formatOrientation(await parseOrientation(scanner));
    const west = formatOrientation(await parseOrientation(scanner));

    expect(north).toStrictEqual('NORTH');
    expect(east).toStrictEqual('EAST');
    expect(south).toStrictEqual('SOUTH');
    expect(west).toStrictEqual('WEST');

});

test('produce a valid direction', async () => {

    const scanner = new Scanner(new ArrayReader('NORTH'));

    const north = await parseOrientation(scanner);
    const [dx, dy] = getOrientationDirection(north);

    expect(dx).toStrictEqual(0);
    expect(dy).toStrictEqual(1);

});

test('produce a valid left turn', async () => {

    const scanner = new Scanner(new ArrayReader('NORTH'));

    const north = await parseOrientation(scanner);
    const west = rotateOrientation(north, 90);
    const [dx, dy] = getOrientationDirection(west);

    expect(dx).toStrictEqual(-1);
    expect(dy).toStrictEqual(0);

});

test('produce a valid right turn', async () => {

    const scanner = new Scanner(new ArrayReader('NORTH'));

    const north = await parseOrientation(scanner);
    const east = rotateOrientation(north, -90);
    const [dx, dy] = getOrientationDirection(east);

    expect(dx).toStrictEqual(1);
    expect(dy).toStrictEqual(0);

});
