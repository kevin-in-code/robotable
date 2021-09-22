type Vector = [x: number, y: number];

const ORIGIN: Vector = [0, 0];

function addVectors(u: Vector, v: Vector): Vector {
    return [u[0] + v[0], u[1] + v[1]];
}

function subtractVectors(u: Vector, v: Vector): Vector {
    return [u[0] - v[0], u[1] - v[1]];
}

function vectorLength(v: Vector): number {
    let [x, y] = v;
    return Math.sqrt(x * x + y * y);
}

function normaliseVector(v: Vector): Vector {
    let length = vectorLength(v);
    if (length === 0) return ORIGIN;

    let [x, y] = v;
    let inverse = 1.0 / length;
    return [x * inverse, y * inverse];
}

export {
    Vector,
    ORIGIN,
    addVectors,
    subtractVectors,
    vectorLength,
    normaliseVector,
}