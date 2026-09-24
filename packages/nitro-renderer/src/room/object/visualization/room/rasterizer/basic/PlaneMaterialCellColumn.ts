import { IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { clearPlaneCanvas, copyToPlaneCanvas, createPlaneCanvas, releasePlaneCanvas } from '../PlaneCanvas';
import { PlaneMaterialCell } from './PlaneMaterialCell';

/**
 * A column of a material cell matrix: its cells stacked top to bottom and repeated to the plane's
 * height by `repeatMode`, drawn into a canvas `width` wide. Ports Flash `PlaneMaterialCellColumn`,
 * repeat modes and their quirks included.
 *
 * Where Flash repeats one end cell until the canvas is full, the loop here also stops when the cell
 * draws nothing - a cell with no bitmap for the plane's normal hung the Flash loop for good.
 */
export class PlaneMaterialCellColumn {
    public static REPEAT_MODE_NONE: number = 0;
    public static REPEAT_MODE_ALL: number = 1;
    public static REPEAT_MODE_BORDERS: number = 2;
    public static REPEAT_MODE_CENTER: number = 3;
    public static REPEAT_MODE_FIRST: number = 4;
    public static REPEAT_MODE_LAST: number = 5;

    private _cells: PlaneMaterialCell[] = [];
    private _repeatMode: number = PlaneMaterialCellColumn.REPEAT_MODE_ALL;
    private _width: number = 1;
    private _cachedBitmapData: RenderTexture | undefined = undefined;
    private _cachedBitmapNormal: Vector3d | undefined = undefined;
    private _cachedBitmapDataOffsetX: number = 0;
    private _cachedBitmapDataOffsetY: number = 0;
    private _isCached: boolean = false;
    private _isStatic: boolean = true;

    constructor(width: number, cells: PlaneMaterialCell[] | undefined, repeatMode: number = PlaneMaterialCellColumn.REPEAT_MODE_ALL) {
        this._width = width < 1 ? 1 : width;

        if (cells) {
            for (const cell of cells) {
                if (!cell) continue;

                this._cells.push(cell);

                if (!cell.isStatic) this._isStatic = false;
            }
        }

        this._repeatMode = repeatMode;
    }

    public get isStatic(): boolean {
        return this._isStatic;
    }

    public get width(): number {
        return this._width;
    }

    public dispose(): void {
        for (const cell of this._cells) cell.dispose();

        this._cells = [];

        releasePlaneCanvas(this._cachedBitmapData);

        this._cachedBitmapData = undefined;
        this._cachedBitmapNormal = undefined;
    }

    public clearCache(): void {
        if (!this._isCached) return;

        releasePlaneCanvas(this._cachedBitmapData);

        this._cachedBitmapData = undefined;

        if (this._cachedBitmapNormal) this._cachedBitmapNormal.assign(new Vector3d());

        for (const cell of this._cells) cell.clearCache();

        this._isCached = false;
    }

    public render(height: number, normal: IVector3D, offsetX: number, offsetY: number): RenderTexture | undefined {
        if (this._repeatMode === PlaneMaterialCellColumn.REPEAT_MODE_NONE) height = this.getCellsHeight(this._cells, normal);

        if (!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if (this.isStatic) {
            if (this._cachedBitmapData) {
                if (this._cachedBitmapData.height === height && Vector3d.isEqual(this._cachedBitmapNormal, normal) && this._cachedBitmapDataOffsetX === offsetX && this._cachedBitmapDataOffsetY === offsetY) return this._cachedBitmapData;

                releasePlaneCanvas(this._cachedBitmapData);

                this._cachedBitmapData = undefined;
            }
        } else if (this._cachedBitmapData) {
            if (this._cachedBitmapData.height === height) {
                clearPlaneCanvas(this._cachedBitmapData);
            } else {
                releasePlaneCanvas(this._cachedBitmapData);

                this._cachedBitmapData = undefined;
            }
        }

        this._isCached = true;

        // `new BitmapData(width, 0)` throws, and Flash answers the column with nothing.
        if (height < 1) return undefined;

        if (!this._cachedBitmapData) this._cachedBitmapData = createPlaneCanvas(this._width, height);

        this._cachedBitmapNormal.assign(normal);
        this._cachedBitmapDataOffsetX = offsetX;
        this._cachedBitmapDataOffsetY = offsetY;

        if (!this._cells.length) return this._cachedBitmapData;

        switch (this._repeatMode) {
            case PlaneMaterialCellColumn.REPEAT_MODE_NONE:
                this.renderRepeatNone(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_BORDERS:
                this.renderRepeatBorders(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_CENTER:
                this.renderRepeatCenter(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_FIRST:
                this.renderRepeatFirst(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_LAST:
                this.renderRepeatLast(normal);
                break;
            default:
                this.renderRepeatAll(normal, offsetX, offsetY);
                break;
        }

        return this._cachedBitmapData;
    }

    private getCellsHeight(cells: PlaneMaterialCell[], normal: IVector3D): number {
        let height = 0;

        for (const cell of cells) {
            if (cell) height += cell.getHeight(normal);
        }

        return height;
    }

    private renderCells(cells: PlaneMaterialCell[], y: number, forward: boolean, normal: IVector3D, offsetX: number = 0, offsetY: number = 0): number {
        const canvas = this._cachedBitmapData;

        if (!cells.length || !canvas) return y;

        for (let i = 0; i < cells.length; i++) {
            const cell = forward ? cells[i] : cells[cells.length - 1 - i];

            if (!cell) continue;

            const bitmap = cell.render(normal, offsetX, offsetY);

            if (!bitmap) continue;

            if (!forward) y -= bitmap.height;

            copyToPlaneCanvas(canvas, bitmap, 0, y);

            if (forward) y += bitmap.height;

            if ((forward && y >= canvas.height) || (!forward && y <= 0)) return y;
        }

        return y;
    }

    private renderRepeatNone(normal: IVector3D): void {
        this.renderCells(this._cells, 0, true, normal);
    }

    private renderRepeatAll(normal: IVector3D, offsetX: number, offsetY: number): void {
        const canvas = this._cachedBitmapData;

        if (!canvas) return;

        let y = 0;

        while (y < canvas.height) {
            y = this.renderCells(this._cells, y, true, normal, offsetX, offsetY);

            if (y === 0) return;
        }
    }

    private renderRepeatBorders(normal: IVector3D): void {
        const canvas = this._cachedBitmapData;

        if (!canvas) return;

        const cells: PlaneMaterialCell[] = [];

        let height = 0;

        for (let i = 1; i < this._cells.length - 1; i++) {
            const cell = this._cells[i];
            const cellHeight = cell ? cell.getHeight(normal) : 0;

            if (cellHeight > 0) {
                height += cellHeight;
                cells.push(cell);
            }
        }

        if (this._cells.length === 1) {
            const cell = this._cells[0];
            const cellHeight = cell ? cell.getHeight(normal) : 0;

            if (cellHeight > 0) {
                height += cellHeight;
                cells.push(cell);
            }
        }

        let top = (canvas.height - height) >> 1;
        let bottom = this.renderCells(cells, top, true, normal);

        const first = this._cells[0];

        if (first) {
            while (top >= 0) {
                const next = this.renderCells([ first ], top, false, normal);

                if (next === top) break;

                top = next;
            }
        }

        const last = this._cells[this._cells.length - 1];

        if (last) {
            while (bottom < canvas.height) {
                const next = this.renderCells([ last ], bottom, true, normal);

                if (next === bottom) break;

                bottom = next;
            }
        }
    }

    private renderRepeatCenter(normal: IVector3D): void {
        const canvas = this._cachedBitmapData;

        if (!canvas) return;

        const topCells: PlaneMaterialCell[] = [];
        const bottomCells: PlaneMaterialCell[] = [];

        let topHeight = 0;
        let bottomHeight = 0;

        for (let i = 0; i < (this._cells.length >> 1); i++) {
            const cell = this._cells[i];
            const cellHeight = cell ? cell.getHeight(normal) : 0;

            if (cellHeight > 0) {
                topHeight += cellHeight;
                topCells.push(cell);
            }
        }

        for (let i = (this._cells.length >> 1) + 1; i < this._cells.length; i++) {
            const cell = this._cells[i];
            const cellHeight = cell ? cell.getHeight(normal) : 0;

            if (cellHeight > 0) {
                bottomHeight += cellHeight;
                bottomCells.push(cell);
            }
        }

        let overflow = 0;
        let y = 0;
        let bottom = canvas.height;

        if (topHeight + bottomHeight > canvas.height) {
            overflow = topHeight + bottomHeight - canvas.height;
            y -= overflow >> 1;
            bottom += overflow - (overflow >> 1);
        }

        if (overflow === 0) {
            const center = this._cells[this._cells.length >> 1];
            const centerHeight = center ? center.getHeight(normal) : 0;

            if (centerHeight > 0) {
                const space = canvas.height - (topHeight + bottomHeight);
                const filled = Math.ceil(space / centerHeight) * centerHeight;

                y = topHeight - ((filled - space) >> 1);

                const end = y + filled;

                while (y < end) y = this.renderCells([ center ], y, true, normal);
            }
        }

        y = 0;

        this.renderCells(topCells, y, true, normal);
        this.renderCells(bottomCells, bottom, false, normal);
    }

    private renderRepeatFirst(normal: IVector3D): void {
        const canvas = this._cachedBitmapData;

        if (!canvas) return;

        let y = this.renderCells(this._cells, canvas.height, false, normal);

        const first = this._cells[0];

        if (first) {
            while (y >= 0) {
                const next = this.renderCells([ first ], y, false, normal);

                if (next === y) break;

                y = next;
            }
        }
    }

    private renderRepeatLast(normal: IVector3D): void {
        const canvas = this._cachedBitmapData;

        if (!canvas) return;

        let y = this.renderCells(this._cells, 0, true, normal);

        const last = this._cells[this._cells.length - 1];

        if (last) {
            while (y < canvas.height) {
                const next = this.renderCells([ last ], y, true, normal);

                if (next === y) break;

                y = next;
            }
        }
    }
}
