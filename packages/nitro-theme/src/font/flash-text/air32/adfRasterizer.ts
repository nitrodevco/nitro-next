/**
 * The distance-field rasterizer: flattened glyph outlines in, one signed distance per sample
 * out. Every line paints the distances inside its reach, every endpoint rounds the joins, and a
 * winding pass signs the result so that inside is positive.
 *
 * Ported from Sulake's own JavaScript build of the Habbo client, where this code reproduces
 * Adobe AIR 51's text rasterizer bit for bit. Every float goes through `Math.fround` exactly
 * where AIR used a 32-bit float - reordering or "simplifying" the arithmetic changes pixels.
 */

import { ColorType, DistanceField, DistanceFieldSetup, DistanceGrid, OutlineLine, Point, RgbaBytes } from './types';

/** A corner of the rectangle a line's reach covers, in grid space. */
interface EdgeCorner extends Point {
    distance: number;
}

/** Where one edge of that rectangle crosses a scan row. */
interface EdgeCrossing {
    x: number;
    distance: number;
}

const toFloat32 = Math.fround;
const UNTOUCHED_DISTANCE = -1e3;
const SCAN_ROW_BIAS = 0.0010000000474974513;
const SCAN_ROW_TOLERANCE = toFloat32(1e-8);

export function rasterizeAir32AdfDistances(lines: OutlineLine[], setup: DistanceFieldSetup): DistanceField {
    return rasterizeAir32AdfDistancesAtScale(lines, setup, 3);
}

export function rasterizeAir32GrayscaleAdfDistances(lines: OutlineLine[], setup: DistanceFieldSetup): DistanceField {
    return rasterizeAir32AdfDistancesAtScale(lines, setup, 1);
}

function rasterizeAir32AdfDistancesAtScale(lines: OutlineLine[], setup: DistanceFieldSetup, horizontalScale: number): DistanceField {
    validateArguments(lines, setup);

    const width = setup.width * horizontalScale;
    const height = setup.height;
    const stepX = toFloat32(1 / horizontalScale);
    const stepY = 1;
    const inverseX = horizontalScale;
    const inverseY = 1;
    const reach = toFloat32(Math.max(Math.abs(toFloat32(setup.outsideCutoff)), Math.abs(toFloat32(setup.insideCutoff))));
    const values = new Float32Array(width * height);

    values.fill(UNTOUCHED_DISTANCE);

    const grid = { width, height, stepX, stepY, inverseX, inverseY, values };

    if (reach !== 0) {
        for (const line of lines) rasterizeLineRectangle(line, reach, grid);

        for (const line of lines) rasterizeEndpoint(line.to, reach, grid);
    }

    applyWindingSigns(lines, grid);

    return { width, height, values };
}

function rasterizeLineRectangle(line: OutlineLine, reach: number, grid: DistanceGrid): void {
    const { from, to } = line;
    const deltaX = toFloat32(to.x - from.x);
    const deltaY = toFloat32(to.y - from.y);
    const length = toFloat32(Math.sqrt(deltaX * deltaX + deltaY * deltaY));

    if (!(length > 0)) return;

    const inverseLength = toFloat32(1 / length);
    const normalX = toFloat32(deltaY * inverseLength);
    const normalY = toFloat32(-deltaX * inverseLength);

    if (normalX === 0 || normalY === 0) {
        rasterizeAxisLine(line, reach, normalX, normalY, grid);

        return;
    }

    const offsetX = toFloat32(reach * normalX);
    const offsetY = toFloat32(reach * normalY);
    const toGridCorner = (x: number, y: number, distance: number): EdgeCorner => ({ x: toFloat32(x * grid.inverseX), y: toFloat32(y * grid.inverseY), distance });
    const fromOutside = toGridCorner(from.x - offsetX, from.y - offsetY, -reach);
    const fromInside = toGridCorner(from.x + offsetX, from.y + offsetY, reach);
    const toOutside = toGridCorner(to.x - offsetX, to.y - offsetY, -reach);
    const toInside = toGridCorner(to.x + offsetX, to.y + offsetY, reach);
    const lineSlope = toFloat32(((to.x - from.x) * grid.inverseX) / ((to.y - from.y) * grid.inverseY));
    const normalSlope = toFloat32((normalX * grid.inverseX) / (normalY * grid.inverseY));
    const distanceStepPerRow = toFloat32(grid.stepY / normalY);
    const edges = [ makeEdge(fromOutside, toOutside, lineSlope, 0), makeEdge(fromInside, toInside, lineSlope, 0), makeEdge(fromOutside, fromInside, normalSlope, distanceStepPerRow), makeEdge(toOutside, toInside, normalSlope, distanceStepPerRow) ];
    const distanceStepPerColumn = toFloat32(normalX * grid.stepX);

    rasterizePolygonRows(edges, distanceStepPerColumn, grid);
}

function makeEdge(start: EdgeCorner, end: EdgeCorner, xStepPerRow: number, distanceStepPerRow: number): Map<number, EdgeCrossing> {
    const top = start.y <= end.y ? start : end;
    const bottom = top === start ? end : start;
    const firstRow = Math.max(0, Math.ceil(top.y));
    const lastRow = Math.floor(bottom.y);
    const rowOffset = toFloat32(firstRow - top.y);
    let x = toFloat32(rowOffset * xStepPerRow + top.x);
    let distance = toFloat32(rowOffset * distanceStepPerRow + top.distance);
    const crossings = new Map<number, EdgeCrossing>();

    for (let row = firstRow; row <= lastRow; row++) {
        crossings.set(row, { x, distance });
        x = toFloat32(x + xStepPerRow);
        distance = toFloat32(distance + distanceStepPerRow);
    }

    return crossings;
}

function rasterizePolygonRows(edges: Map<number, EdgeCrossing>[], distanceStepPerColumn: number, grid: DistanceGrid): void {
    for (let row = 0; row < grid.height; row++) {
        const crossings: EdgeCrossing[] = [];

        for (const edge of edges) {
            const crossing = edge.get(row);

            if (crossing) crossings.push(crossing);
        }

        if (crossings.length < 2) continue;

        crossings.sort((left, right) => left.x - right.x);

        const first = crossings[0];
        const last = crossings[crossings.length - 1];
        const firstColumn = Math.max(0, Math.ceil(first.x));
        const lastColumn = Math.min(grid.width - 1, Math.ceil(last.x) - 1);

        if (firstColumn > lastColumn) continue;

        let distance = toFloat32((firstColumn - first.x) * distanceStepPerColumn + first.distance);
        let offset = row * grid.width + firstColumn;

        for (let column = firstColumn; column <= lastColumn; column++, offset++) {
            const candidate = -Math.abs(distance);

            if (Math.abs(candidate) <= Math.abs(grid.values[offset])) grid.values[offset] = candidate;

            distance = toFloat32(distance + distanceStepPerColumn);
        }
    }
}

function rasterizeEndpoint(point: Point, reach: number, grid: DistanceGrid): void {
    const firstColumn = Math.max(0, Math.ceil((point.x - reach) * grid.inverseX));
    const lastColumn = Math.min(grid.width - 1, Math.ceil((point.x + reach) * grid.inverseX) - 1);
    const firstRow = Math.max(0, Math.ceil((point.y - reach) * grid.inverseY));
    const lastRow = Math.min(grid.height - 1, Math.ceil((point.y + reach) * grid.inverseY) - 1);

    if (firstColumn > lastColumn || firstRow > lastRow) return;

    const columnDeltas = new Float32Array(lastColumn - firstColumn + 1);
    let deltaX = toFloat32(firstColumn * grid.stepX - point.x);

    for (let index = 0; index < columnDeltas.length; index++) {
        columnDeltas[index] = deltaX;
        deltaX = toFloat32(deltaX + grid.stepX);
    }

    let deltaY = toFloat32(firstRow * grid.stepY - point.y);

    for (let row = firstRow; row <= lastRow; row++) {
        let offset = row * grid.width + firstColumn;

        for (let column = firstColumn; column <= lastColumn; column++, offset++) {
            const columnDelta = columnDeltas[column - firstColumn];
            const squaredDistance = toFloat32(columnDelta * columnDelta + deltaY * deltaY);

            if (grid.values[offset] * grid.values[offset] >= squaredDistance) grid.values[offset] = -toFloat32(Math.sqrt(squaredDistance));
        }

        deltaY = toFloat32(deltaY + grid.stepY);
    }
}

function rasterizeAxisLine(line: OutlineLine, reach: number, normalX: number, normalY: number, grid: DistanceGrid): void {
    const isVertical = normalX !== 0;
    const minX = toFloat32((isVertical ? line.from.x - reach : Math.min(line.from.x, line.to.x)) * grid.inverseX);
    const maxX = toFloat32((isVertical ? line.from.x + reach : Math.max(line.from.x, line.to.x)) * grid.inverseX);
    const minY = toFloat32((isVertical ? Math.min(line.from.y, line.to.y) : line.from.y - reach) * grid.inverseY);
    const maxY = toFloat32((isVertical ? Math.max(line.from.y, line.to.y) : line.from.y + reach) * grid.inverseY);
    const firstColumn = Math.max(0, Math.ceil(minX));
    const lastColumn = Math.min(grid.width - 1, Math.ceil(maxX) - 1);
    const firstRow = Math.max(0, Math.ceil(minY));
    const lastRow = Math.min(grid.height - 1, Math.ceil(maxY) - 1);

    if (firstColumn > lastColumn || firstRow > lastRow) return;

    if (isVertical) {
        const rowStartDistance = toFloat32(line.from.x - firstColumn * grid.stepX);

        for (let row = firstRow; row <= lastRow; row++) {
            let distance = rowStartDistance;
            let offset = row * grid.width + firstColumn;

            for (let column = firstColumn; column <= lastColumn; column++, offset++) {
                const candidate = -Math.abs(distance);

                if (Math.abs(candidate) <= Math.abs(grid.values[offset])) grid.values[offset] = candidate;

                distance = toFloat32(distance - grid.stepX);
            }
        }
    } else {
        let rowDistance = toFloat32(line.from.y - firstRow * grid.stepY);

        for (let row = firstRow; row <= lastRow; row++) {
            const candidate = -Math.abs(rowDistance);
            let offset = row * grid.width + firstColumn;

            for (let column = firstColumn; column <= lastColumn; column++, offset++) {
                if (Math.abs(candidate) <= Math.abs(grid.values[offset])) grid.values[offset] = candidate;
            }

            rowDistance = toFloat32(rowDistance - grid.stepY);
        }
    }
}

function applyWindingSigns(lines: OutlineLine[], grid: DistanceGrid): void {
    const windingDeltas = new Int8Array(grid.width * grid.height);

    for (const line of lines) rasterizeWindingLine(line, windingDeltas, grid);

    for (let row = 0; row < grid.height; row++) {
        let winding = 0;
        let offset = row * grid.width;

        for (let column = 0; column < grid.width; column++, offset++) {
            winding = (winding + windingDeltas[offset]) & 255;

            if (winding !== 0) grid.values[offset] = -grid.values[offset];
        }
    }
}

function rasterizeWindingLine(line: OutlineLine, windingDeltas: Int8Array, grid: DistanceGrid): void {
    const fromX = toFloat32(line.from.x * grid.inverseX);
    const toX = toFloat32(line.to.x * grid.inverseX);
    const fromY = biasScanY(toFloat32(line.from.y * grid.inverseY));
    const toY = biasScanY(toFloat32(line.to.y * grid.inverseY));
    const fromRow = Math.trunc(fromY);
    const toRow = Math.trunc(toY);

    if (fromRow === toRow || (fromY < 0 && toY < 0)) return;

    const isDownward = toY > fromY;
    const firstRow = (isDownward ? fromY : toY) >= 0 ? (isDownward ? fromRow : toRow) + 1 : 0;
    let lastRow = isDownward ? toRow : fromRow;

    lastRow = Math.min(grid.height - 1, lastRow);

    if (firstRow > lastRow) return;

    const deltaX = toFloat32(toX - fromX);
    const inverseDeltaY = toFloat32(1 / (toY - fromY));
    const startRatio = toFloat32((firstRow - fromY) * inverseDeltaY);
    const xStepPerRow = toFloat32(deltaX * inverseDeltaY);
    let x = toFloat32(deltaX * startRatio + fromX + 1);
    const direction = isDownward ? 1 : -1;
    let rowOffset = firstRow * grid.width;

    for (let row = firstRow; row <= lastRow; row++, rowOffset += grid.width) {
        const column = Math.trunc(x);

        if (column >= 0 && column < grid.width) windingDeltas[rowOffset + column] += direction;

        x = toFloat32(x + xStepPerRow);
    }
}

function biasScanY(y: number): number {
    const truncated = Math.trunc(y);
    let distanceToInteger = truncated - y;

    if (distanceToInteger < 0) distanceToInteger = -truncated - y;

    return toFloat32(distanceToInteger) <= SCAN_ROW_TOLERANCE ? toFloat32(y - SCAN_ROW_BIAS) : y;
}

function validateArguments(lines: OutlineLine[], setup: DistanceFieldSetup): void {
    if (!Array.isArray(lines)
        || lines.some(line => !line?.from
            || !line?.to
            || !Number.isFinite(line.from.x)
            || !Number.isFinite(line.from.y)
            || !Number.isFinite(line.to.x)
            || !Number.isFinite(line.to.y))) {
        throw new TypeError('lines must contain finite from/to points');
    }

    if (!setup
        || !Number.isInteger(setup.width)
        || setup.width < 1
        || !Number.isInteger(setup.height)
        || setup.height < 1
        || !Number.isFinite(setup.outsideCutoff)
        || !Number.isFinite(setup.insideCutoff)) {
        throw new TypeError('setup must contain dimensions and finite cutoffs');
    }
}

export function reduceAir32LcdColor(red: number, green: number, blue: number, amount: number = 0.5): number[] {
    for (const [ label, component ] of Object.entries({ red, green, blue })) {
        if (!Number.isInteger(component) || component < 0 || component > 255) throw new RangeError(`${label} must be an 8-bit integer`);
    }

    if (!Number.isFinite(amount)) throw new TypeError('amount must be finite');

    const threshold = Math.trunc((1 - amount) * 64);
    const luminance = Math.floor(red * 0.299) + Math.floor(green * 0.587) + Math.floor(blue * 0.114);
    const chroma = Math.abs(red - luminance) + Math.abs(green - luminance) + Math.abs(blue - luminance);

    return chroma <= threshold ? [ red, green, blue ] : [ red, green, blue ].map(channel => luminance + Math.trunc(((channel - luminance) * threshold) / chroma));
}

export function air32ColorType(color: number | RgbaBytes, globalAlpha: number = 255): ColorType {
    const [ red, green, blue ] = normalizeRgb(color);

    if (!Number.isInteger(globalAlpha) || globalAlpha < 0 || globalAlpha > 255) throw new RangeError('globalAlpha must be an 8-bit integer');

    const alphaFactor = globalAlpha + 1;
    const premultipliedRed = Math.floor((red * alphaFactor) / 256);
    const premultipliedGreen = Math.floor((green * alphaFactor) / 256);
    const premultipliedBlue = Math.floor((blue * alphaFactor) / 256);

    return 30 * premultipliedRed + 59 * premultipliedGreen + 11 * premultipliedBlue > 2e4 ? 'light' : 'dark';
}

function normalizeRgb(color: number | RgbaBytes): number[] {
    if (typeof color === 'number' && Number.isSafeInteger(color) && color >= 0 && color <= 0xFFFFFF) return [ color >>> 16, (color >>> 8) & 255, color & 255 ];

    if (typeof color !== 'number'
        && color.length >= 3
        && Array.from(color).slice(0, 3).every(channel => Number.isInteger(channel) && channel >= 0 && channel <= 255)) {
        return [ color[0], color[1], color[2] ];
    }

    throw new RangeError('color must be a 24-bit integer or RGB byte array');
}

const float32View = new DataView(new ArrayBuffer(4));

export function float32Bits(value: number): number {
    if (!Number.isFinite(value)) throw new TypeError('value must be finite');

    float32View.setFloat32(0, value, true);

    return float32View.getUint32(0, true);
}
