/**
 * `com.sulake.room.utils.§_-K2§.interpolationPoints` - the tiles of a straight line between two
 * tiles (Bresenham, both ends included). `FloorDrawingPreset` uses it so a fast drag does not
 * leave gaps between two pointer positions.
 *
 * As in Flash, the points run from the end with the lower major coordinate, so the order is not
 * always from the first point to the second.
 */
export interface TilePoint {
    x: number;
    y: number;
}

/** `interpolationPointsLow` - a line that is wider than it is tall, `x0 <= x1`. */
const interpolationPointsLow = (x0: number, y0: number, x1: number, y1: number): TilePoint[] => {
    const points: TilePoint[] = [];
    const dx = x1 - x0;

    let dy = y1 - y0;
    let yStep = 1;

    if (dy < 0) {
        yStep = -1;
        dy = -dy;
    }

    let error = (2 * dy) - dx;
    let y = y0;

    for (let x = x0; x <= x1; x++) {
        points.push({ x, y });

        if (error > 0) {
            y += yStep;
            error += 2 * (dy - dx);
        } else {
            error += 2 * dy;
        }
    }

    return points;
};

/** `interpolationPointsHigh` - a line that is at least as tall as it is wide, `y0 <= y1`. */
const interpolationPointsHigh = (x0: number, y0: number, x1: number, y1: number): TilePoint[] => {
    const points: TilePoint[] = [];
    const dy = y1 - y0;

    let dx = x1 - x0;
    let xStep = 1;

    if (dx < 0) {
        xStep = -1;
        dx = -dx;
    }

    let error = (2 * dx) - dy;
    let x = x0;

    for (let y = y0; y <= y1; y++) {
        points.push({ x, y });

        if (error > 0) {
            x += xStep;
            error += 2 * (dx - dy);
        } else {
            error += 2 * dx;
        }
    }

    return points;
};

export const interpolationPoints = (x0: number, y0: number, x1: number, y1: number): TilePoint[] => {
    if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
        return (x0 > x1) ? interpolationPointsLow(x1, y1, x0, y0) : interpolationPointsLow(x0, y0, x1, y1);
    }

    return (y0 > y1) ? interpolationPointsHigh(x1, y1, x0, y0) : interpolationPointsHigh(x0, y0, x1, y1);
};
