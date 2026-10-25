/**
 * `wired_setup/common/utils/SpiralUtils` - how a square neighbourhood of tiles travels in a wired
 * box's int params.
 *
 * The tiles are ranked along a spiral that starts at the centre tile and first steps to `x + 1`
 * (then `y - 1`, `x - 1`, `y + 1`, ...), so a small drawing only occupies the low ranks. The ranks
 * form a bit mask, packed 8 bits to a byte (lowest bit first) and four bytes to a little-endian
 * signed int - one int param per 32 ranks. A 21 x 21 plan (`radius` 10) is 441 ranks, 14 ints.
 *
 * A plan is indexed `plan[x + radius][y + radius]`, as in Flash.
 */

/** One step of the spiral: the tile's rank in the bit mask and its offset from the centre. */
interface SpiralStep {
    rank: number;
    x: number;
    y: number;
}

/** A square of tiles, `plan[x][y]`, `true` where the tile is part of the neighbourhood. */
export type SpiralPlan = readonly (readonly boolean[])[];

/** `SpiralUtils.nextDirection` - the spiral turns from `+x` to `-y` to `-x` to `+y`. */
const nextDirection = ([ dx, dy ]: readonly [ number, number ]): [ number, number ] => {
    if ((dx === 0) && (dy === -1)) return [ -1, 0 ];

    if ((dx === 1) && (dy === 0)) return [ 0, -1 ];

    if ((dx === 0) && (dy === 1)) return [ 1, 0 ];

    return [ 0, 1 ];
};

/** `SpiralUtils.walkSpiral` - every tile of the square, in rank order. */
const walkSpiral = (radius: number): SpiralStep[] => {
    const dimension = (radius * 2) + 1;
    const total = dimension * dimension;
    const steps: SpiralStep[] = [];

    let rank = 0;
    let x = 0;
    let y = 0;
    let direction: [ number, number ] = [ 1, 0 ];

    for (let length = 1; length <= dimension; length++) {
        for (let side = 0; side < 2; side++) {
            for (let step = 0; step < length; step++) {
                steps.push({ rank, x, y });

                x += direction[0];
                y += direction[1];
                rank += 1;

                if (rank === total) return steps;
            }

            direction = nextDirection(direction);
        }
    }

    return steps;
};

/** `SpiralUtils.intParamsToBoolMask` - little-endian ints to bits, lowest bit of the lowest byte first. */
const intParamsToBoolMask = (intParams: readonly number[]): boolean[] => {
    const mask: boolean[] = [];

    for (const param of intParams) {
        for (let byteIndex = 0; byteIndex < 4; byteIndex++) {
            const byte = (param >> (byteIndex * 8)) & 0xFF;

            for (let bit = 0; bit < 8; bit++) mask.push((byte & (1 << bit)) > 0);
        }
    }

    return mask;
};

/** `SpiralUtils.boolMaskToIntParams` - the reverse; the last int is padded with unset bits. */
const boolMaskToIntParams = (mask: readonly boolean[]): number[] => {
    const intParams: number[] = [];

    for (let index = 0; index < mask.length; index += 32) {
        let value = 0;

        for (let bit = 0; bit < 32; bit++) {
            if (mask[index + bit]) value |= (1 << bit);
        }

        intParams.push(value | 0);
    }

    return intParams;
};

/** `SpiralUtils.parseSpiralVector` - the int params of a box as a `(2 * radius + 1)`-square plan. */
export const parseSpiralVector = (intParams: readonly number[], radius: number): boolean[][] => {
    const mask = intParamsToBoolMask(intParams);
    const dimension = (radius * 2) + 1;
    const plan: boolean[][] = Array.from({ length: dimension }, () => Array.from({ length: dimension }, () => false));

    for (const step of walkSpiral(radius)) {
        if ((step.rank < mask.length) && mask[step.rank]) plan[step.x + radius][step.y + radius] = true;
    }

    return plan;
};

/** `SpiralUtils.createSpiralVector` - a plan as the int params that describe it. */
export const createSpiralVector = (plan: SpiralPlan, radius: number): number[] => {
    const dimension = (radius * 2) + 1;
    const mask: boolean[] = Array.from({ length: dimension * dimension }, () => false);

    for (const step of walkSpiral(radius)) {
        if (plan[step.x + radius][step.y + radius]) mask[step.rank] = true;
    }

    return boolMaskToIntParams(mask);
};
