import { IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { PlaneMaterialCellMatrix } from './PlaneMaterialCellMatrix';

/**
 * A material of the plane visualization data: its cell matrices, each for a range of plane normals.
 * Ports Flash `PlaneMaterial`; `MIN_NORMAL_COORDINATE_VALUE` is its obfuscated `§_-r1m§`.
 */
export class PlaneMaterial {
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _planeMaterialItems: PlaneMaterialCellMatrix[] = [];
    private _isCached: boolean = false;

    public dispose(): void {
        for (const item of this._planeMaterialItems) item.dispose();

        this._planeMaterialItems = [];
    }

    public clearCache(): void {
        if (!this._isCached) return;

        for (const item of this._planeMaterialItems) item.clearCache();

        this._isCached = false;
    }

    public addMaterialCellMatrix(
        totalColumns: number,
        repeatMode: number,
        align: number,
        normalMinX: number = PlaneMaterial.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxX: number = PlaneMaterial.MAX_NORMAL_COORDINATE_VALUE,
        normalMinY: number = PlaneMaterial.MIN_NORMAL_COORDINATE_VALUE,
        normalMaxY: number = PlaneMaterial.MAX_NORMAL_COORDINATE_VALUE,
    ): PlaneMaterialCellMatrix {
        const matrix = new PlaneMaterialCellMatrix(totalColumns, repeatMode, align, normalMinX, normalMaxX, normalMinY, normalMaxY);

        this._planeMaterialItems.push(matrix);

        return matrix;
    }

    public getMaterialCellMatrix(normal: IVector3D | undefined): PlaneMaterialCellMatrix | undefined {
        if (!normal) return undefined;

        for (const matrix of this._planeMaterialItems) {
            if (normal.x >= matrix.normalMinX && normal.x <= matrix.normalMaxX && normal.y >= matrix.normalMinY && normal.y <= matrix.normalMaxY) return matrix;
        }

        return undefined;
    }

    public render(canvas: RenderTexture | undefined, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, topAlign: boolean): RenderTexture | undefined {
        if (width < 1) width = 1;
        if (height < 1) height = 1;

        const matrix = this.getMaterialCellMatrix(normal);

        if (!matrix) return undefined;

        this._isCached = true;

        return matrix.render(canvas, width, height, normal, useTexture, offsetX, offsetY, topAlign);
    }
}
