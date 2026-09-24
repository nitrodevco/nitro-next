import { IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { Point, Rectangle, RenderTexture, Texture } from 'pixi.js';

import { Randomizer } from '../../utils';
import { clearPlaneCanvas, copyToPlaneCanvas, createPlaneCanvas, fillPlaneCanvas, releasePlaneCanvas } from '../PlaneCanvas';
import { PlaneMaterialCell } from './PlaneMaterialCell';
import { PlaneMaterialCellColumn } from './PlaneMaterialCellColumn';

/**
 * The columns of a material for one range of plane normals, laid side by side across the plane by
 * `repeatMode` and aligned to its top or bottom. Ports Flash `PlaneMaterialCellMatrix`, repeat modes
 * and their quirks included (`renderRepeatBorders` reads a column object as a bitmap and measures
 * its right side against the height, both as Flash does); `MIN_NORMAL_COORDINATE_VALUE` is its
 * obfuscated `§_-r1m§`.
 *
 * Where Flash repeats one end column until the canvas is full, the loop here also stops when the
 * column draws nothing, which would have hung the Flash loop.
 */
export class PlaneMaterialCellMatrix {
    public static REPEAT_MODE_ALL: number = 1;
    public static REPEAT_MODE_BORDERS: number = 2;
    public static REPEAT_MODE_CENTER: number = 3;
    public static REPEAT_MODE_FIRST: number = 4;
    public static REPEAT_MODE_LAST: number = 5;
    public static REPEAT_MODE_RANDOM: number = 6;
    public static REPEAT_MODE_DEFAULT: number = 1;
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;
    public static ALIGN_TOP: number = 1;
    public static ALIGN_BOTTOM: number = 2;
    public static ALIGN_DEFAULT: number = 1;

    private _columns: (PlaneMaterialCellColumn | undefined)[] = [];
    private _repeatMode: number = PlaneMaterialCellMatrix.REPEAT_MODE_DEFAULT;
    private _align: number = PlaneMaterialCellMatrix.ALIGN_DEFAULT;
    private _cachedBitmapData: RenderTexture | undefined = undefined;
    private _cachedBitmapNormal: Vector3d | undefined = undefined;
    private _cachedBitmapHeight: number = 0;
    private _isCached: boolean = false;
    private _isStatic: boolean = true;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;

    constructor(
        totalColumns: number,
        repeatMode: number = PlaneMaterialCellMatrix.REPEAT_MODE_DEFAULT,
        align: number = PlaneMaterialCellMatrix.ALIGN_DEFAULT,
        normalMinX: number = PlaneMaterialCellMatrix.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxX: number = PlaneMaterialCellMatrix.MAX_NORMAL_COORDINATE_VALUE,
        normalMinY: number = PlaneMaterialCellMatrix.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxY: number = PlaneMaterialCellMatrix.MAX_NORMAL_COORDINATE_VALUE,
    ) {
        if (totalColumns < 1) totalColumns = 1;

        for (let i = 0; i < totalColumns; i++) this._columns.push(undefined);

        this._repeatMode = repeatMode;
        this._align = align;
        this._normalMinX = normalMinX;
        this._normalMaxX = normalMaxX;
        this._normalMinY = normalMinY;
        this._normalMaxY = normalMaxY;

        if (this._repeatMode === PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM) this._isStatic = false;
    }

    private static nextRandomColumnIndex(length: number): number {
        return Randomizer.getValues(1, 0, length * 17631)[0] % length;
    }

    public get normalMinX(): number {
        return this._normalMinX;
    }

    public get normalMaxX(): number {
        return this._normalMaxX;
    }

    public get normalMinY(): number {
        return this._normalMinY;
    }

    public get normalMaxY(): number {
        return this._normalMaxY;
    }

    public get isStatic(): boolean {
        return this._isStatic;
    }

    public dispose(): void {
        for (const column of this._columns) column?.dispose();

        this._columns = [];

        releasePlaneCanvas(this._cachedBitmapData);

        this._cachedBitmapData = undefined;
        this._cachedBitmapNormal = undefined;
    }

    public clearCache(): void {
        if (!this._isCached) return;

        releasePlaneCanvas(this._cachedBitmapData);

        this._cachedBitmapData = undefined;

        if (this._cachedBitmapNormal) this._cachedBitmapNormal.assign(new Vector3d());

        this._cachedBitmapHeight = 0;

        for (const column of this._columns) column?.clearCache();

        this._isCached = false;
    }

    public createColumn(index: number, width: number, cells: PlaneMaterialCell[] | undefined, repeatMode: number = PlaneMaterialCellColumn.REPEAT_MODE_ALL): boolean {
        if (index < 0 || index >= this._columns.length) return false;

        const column = new PlaneMaterialCellColumn(width, cells, repeatMode);

        this._columns[index]?.dispose();
        this._columns[index] = column;

        if (!column.isStatic) this._isStatic = false;

        return true;
    }

    /**
     * Renders the columns into the matrix's own canvas. With a `canvas` of the plane's size, the rows
     * drawn are then copied onto it `offsetY` from its top or bottom (`topAlign`) and the canvas is
     * returned; without one, the matrix's canvas is.
     */
    public render(canvas: RenderTexture | undefined, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, topAlign: boolean): RenderTexture | undefined {
        if (width < 1) width = 1;
        if (height < 1) height = 1;

        if (canvas && (canvas.width !== width || canvas.height !== height)) canvas = undefined;

        if (!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if (this.isStatic) {
            if (this._cachedBitmapData) {
                if (this._cachedBitmapData.width === width && this._cachedBitmapData.height === height && Vector3d.isEqual(this._cachedBitmapNormal, normal)) {
                    if (canvas) {
                        this.copyCachedBitmapOnCanvas(canvas, this._cachedBitmapHeight, offsetY, topAlign);

                        return canvas;
                    }

                    return this._cachedBitmapData;
                }

                releasePlaneCanvas(this._cachedBitmapData);

                this._cachedBitmapData = undefined;
            }
        } else if (this._cachedBitmapData) {
            if (this._cachedBitmapData.width === width && this._cachedBitmapData.height === height) {
                clearPlaneCanvas(this._cachedBitmapData);
            } else {
                releasePlaneCanvas(this._cachedBitmapData);

                this._cachedBitmapData = undefined;
            }
        }

        this._isCached = true;
        this._cachedBitmapNormal.assign(normal);

        if (!useTexture) {
            this._cachedBitmapHeight = height;

            if (!this._cachedBitmapData) this._cachedBitmapData = createPlaneCanvas(width, height);

            fillPlaneCanvas(this._cachedBitmapData, 0xFFFFFF);

            if (canvas) {
                this.copyCachedBitmapOnCanvas(canvas, height, offsetY, topAlign);

                return canvas;
            }

            return this._cachedBitmapData;
        }

        if (!this._cachedBitmapData) {
            this._cachedBitmapHeight = height;
            this._cachedBitmapData = createPlaneCanvas(width, height);
        }

        const columns: Texture[] = [];

        for (const column of this._columns) {
            const bitmap = column?.render(height, normal, offsetX, offsetY);

            if (bitmap) columns.push(bitmap);
        }

        if (!columns.length) return canvas ?? this._cachedBitmapData;

        let maxHeight = 0;

        switch (this._repeatMode) {
            case PlaneMaterialCellMatrix.REPEAT_MODE_BORDERS:
                maxHeight = this.renderRepeatBorders(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_CENTER:
                maxHeight = this.renderRepeatCenter(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_FIRST:
                maxHeight = this.renderRepeatFirst(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_LAST:
                maxHeight = this.renderRepeatLast(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM:
                maxHeight = this.renderRepeatRandom(this._cachedBitmapData, columns);
                break;
            default:
                maxHeight = this.renderRepeatAll(this._cachedBitmapData, columns);
                break;
        }

        this._cachedBitmapHeight = maxHeight;

        if (canvas) {
            this.copyCachedBitmapOnCanvas(canvas, maxHeight, offsetY, topAlign);

            return canvas;
        }

        return this._cachedBitmapData;
    }

    private copyCachedBitmapOnCanvas(canvas: RenderTexture, height: number, offsetY: number, topAlign: boolean): void {
        const cache = this._cachedBitmapData;

        if (!cache || canvas === cache) return;

        if (!topAlign) offsetY = canvas.height - height - offsetY;

        const frame = (this._align === PlaneMaterialCellMatrix.ALIGN_TOP)
            ? new Rectangle(0, 0, cache.width, this._cachedBitmapHeight)
            : new Rectangle(0, cache.height - this._cachedBitmapHeight, cache.width, this._cachedBitmapHeight);

        copyToPlaneCanvas(canvas, cache, 0, offsetY, frame);
    }

    private getColumnsWidth(columns: Texture[]): number {
        let width = 0;

        for (const column of columns) {
            if (column) width += column.width;
        }

        return width;
    }

    private renderColumns(canvas: RenderTexture, columns: (Texture | undefined)[], x: number, forward: boolean): Point {
        if (!columns.length) return new Point(x, 0);

        let height = 0;

        for (let i = 0; i < columns.length; i++) {
            const column = forward ? columns[i] : columns[columns.length - 1 - i];

            if (!column) continue;

            if (!forward) x -= column.width;

            const y = (this._align === PlaneMaterialCellMatrix.ALIGN_BOTTOM) ? canvas.height - column.height : 0;

            copyToPlaneCanvas(canvas, column, x, y);

            if (column.height > height) height = column.height;

            if (forward) x += column.width;

            if ((forward && x >= canvas.width) || (!forward && x <= 0)) return new Point(x, height);
        }

        return new Point(x, height);
    }

    private renderRepeatAll(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let x = 0;

        while (x < canvas.width) {
            const point = this.renderColumns(canvas, columns, x, true);

            x = point.x;

            if (point.y > height) height = point.y;

            if (point.x === 0) return height;
        }

        return height;
    }

    private renderRepeatBorders(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let width = 0;

        const center: Texture[] = [];

        for (let i = 1; i < columns.length - 1; i++) {
            const column = columns[i];

            if (!column) continue;

            width += column.width;
            center.push(column);
        }

        // Flash reads `§_-D2f§[0] as BitmapData` here, a column object, which is always null.

        let left = (canvas.width - width) >> 1;
        let point = this.renderColumns(canvas, center, left, true);
        let right = point.x;

        if (point.y > height) height = point.y;

        const first = columns[0];

        if (first) {
            while (left >= 0) {
                point = this.renderColumns(canvas, [ first ], left, false);

                if (point.y > height) height = point.y;

                if (point.x === left) break;

                left = point.x;
            }
        }

        const last = columns[columns.length - 1];

        if (last) {
            // Flash measures against the height here, not the width.
            while (right < canvas.height) {
                point = this.renderColumns(canvas, [ last ], right, true);

                if (point.y > height) height = point.y;

                if (point.x === right) break;

                right = point.x;
            }
        }

        return height;
    }

    private renderRepeatCenter(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let leftWidth = 0;
        let rightWidth = 0;

        const left: Texture[] = [];
        const right: Texture[] = [];

        for (let i = 0; i < (columns.length >> 1); i++) {
            const column = columns[i];

            if (!column) continue;

            leftWidth += column.width;
            left.push(column);
        }

        for (let i = (columns.length >> 1) + 1; i < columns.length; i++) {
            const column = columns[i];

            if (!column) continue;

            rightWidth += column.width;
            right.push(column);
        }

        let point: Point;
        let overflow = 0;
        let x = 0;
        let rightEdge = canvas.width;

        if (leftWidth + rightWidth > canvas.width) {
            overflow = leftWidth + rightWidth - canvas.width;
            x -= overflow >> 1;
            rightEdge += overflow - (overflow >> 1);
        }

        if (overflow === 0) {
            const middle = columns[columns.length >> 1];

            if (middle) {
                const space = canvas.width - (leftWidth + rightWidth);
                const filled = Math.ceil(space / middle.width) * middle.width;

                x = leftWidth - ((filled - space) >> 1);

                const end = x + filled;

                while (x < end) {
                    point = this.renderColumns(canvas, [ middle ], x, true);

                    if (point.y > height) height = point.y;

                    if (point.x === x) break;

                    x = point.x;
                }
            }
        }

        x = 0;

        point = this.renderColumns(canvas, left, x, true);

        if (point.y > height) height = point.y;

        point = this.renderColumns(canvas, right, rightEdge, false);

        if (point.y > height) height = point.y;

        return height;
    }

    private renderRepeatFirst(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let point = this.renderColumns(canvas, columns, canvas.width, false);
        let x = point.x;

        if (point.y > height) height = point.y;

        const first = columns[0];

        if (first) {
            while (x >= 0) {
                point = this.renderColumns(canvas, [ first ], x, false);

                if (point.y > height) height = point.y;

                if (point.x === x) break;

                x = point.x;
            }
        }

        return height;
    }

    private renderRepeatLast(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let point = this.renderColumns(canvas, columns, 0, true);
        let x = point.x;

        if (point.y > height) height = point.y;

        const last = columns[columns.length - 1];

        if (last) {
            while (x < canvas.width) {
                point = this.renderColumns(canvas, [ last ], x, true);

                if (point.y > height) height = point.y;

                if (point.x === x) break;

                x = point.x;
            }
        }

        return height;
    }

    private renderRepeatRandom(canvas: RenderTexture, columns: Texture[]): number {
        if (!columns.length) return 0;

        let height = 0;
        let x = 0;

        while (x < canvas.width) {
            const column = columns[PlaneMaterialCellMatrix.nextRandomColumnIndex(columns.length)];

            if (!column) return height;

            const point = this.renderColumns(canvas, [ column ], x, true);

            x = point.x;

            if (point.y > height) height = point.y;
        }

        return height;
    }
}
