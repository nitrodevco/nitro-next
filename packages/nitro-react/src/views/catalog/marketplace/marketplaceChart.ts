/**
 * Flash's `catalog/marketplace/MarketplaceChart.draw`: the price or volume history of a furni as a
 * bitmap - opaque white, the rounded-up maximum in Volter 9 at the top left and `0` at the bottom
 * left, then a 1px `0xcccccc` axis and six grid lines and the 2px `0x0000ff` data line, the chart
 * area right-aligned beside the labels and centred vertically. Day offsets run from -30 (the left
 * edge) to 0 (the right edge).
 *
 * The texture is built once per data set and kept in the asset manager (`getOrBuildTexture`), as
 * every derived UI texture is.
 */
import { Texture } from 'pixi.js';

import { getOrBuildTexture, renderFlashTextCanvas } from '#base/theme';

/** `MarketplaceChart._xMin`. */
const X_MIN = -30;
const GRID_COLOR = '#cccccc';
const LINE_COLOR = '#0000ff';
const LABEL_FORMAT = { fontFamily: 'Volter', fontSize: 9 };

/** `MarketplaceChart.available`: at least two points. */
export const isMarketplaceChartAvailable = (dayOffsets: readonly number[]) => (dayOffsets.length > 1);

const drawChart = (width: number, height: number, dayOffsets: readonly number[], values: readonly number[]): HTMLCanvasElement | undefined => {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) return undefined;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    if (!isMarketplaceChartAvailable(dayOffsets)) return canvas;

    let maxValue = 0;

    for (const value of values) {
        if (value > maxValue) maxValue = value;
    }

    const magnitude = Math.pow(10, maxValue.toString().length - 1);

    maxValue = Math.ceil(maxValue / magnitude) * magnitude;

    const maxLabel = renderFlashTextCanvas(maxValue.toString(), LABEL_FORMAT);

    if (!maxLabel) return canvas;

    context.drawImage(maxLabel.canvas, 0, 0);

    const chartWidth = width - maxLabel.textWidth - 2;
    const chartHeight = height - maxLabel.textHeight;
    const labelWidth = maxLabel.textWidth;
    const zeroLabel = renderFlashTextCanvas('0', LABEL_FORMAT);

    if (zeroLabel) context.drawImage(zeroLabel.canvas, labelWidth - zeroLabel.textWidth + 1, height - zeroLabel.textHeight - 1);

    const getX = (index: number) => chartWidth + ((chartWidth / -X_MIN) * dayOffsets[index]);
    const getY = (index: number) => chartHeight - ((chartHeight / maxValue) * values[index]);

    context.save();
    context.translate(width - chartWidth, (height - chartHeight) / 2);

    context.strokeStyle = GRID_COLOR;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, chartHeight);

    for (let line = 0; line <= 5; line++) {
        // An `int` in Flash: the grid line's y is truncated.
        const y = Math.trunc(((chartHeight - 1) / 5) * line);

        context.moveTo(0, y);
        context.lineTo(chartWidth - 1, y);
    }

    context.stroke();

    context.strokeStyle = LINE_COLOR;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(getX(0), getY(0));

    for (let index = 1; index < dayOffsets.length; index++) context.lineTo(getX(index), getY(index));

    context.stroke();
    context.restore();

    return canvas;
};

/** The chart for these points at `width` x `height`. */
export const getMarketplaceChartTexture = (width: number, height: number, dayOffsets: readonly number[], values: readonly number[]): Texture | undefined => getOrBuildTexture(`marketplace_chart:${width}x${height}:${dayOffsets.join(',')}:${values.join(',')}`, () => drawChart(width, height, dayOffsets, values));
