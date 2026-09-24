import { IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { copyToPlaneCanvas, fillPlaneCanvas } from '../PlaneCanvas';
import { PlaneMaterial } from './PlaneMaterial';

/**
 * One layer of a plane visualization: a material drawn over the plane, aligned to its top or bottom
 * and moved `offset` pixels in from that edge, multiplied by `color`; or, with no material, the whole
 * plane filled with `color`. Ports Flash `PlaneVisualizationLayer`.
 *
 * A tinted material is drawn from the matrix's own canvas at the plane's origin, as Flash draws it:
 * the layer's `offset` and `align` only reach an untinted one. Flash tints that canvas in place
 * (`colorTransform`), so a cached matrix darkens again on every render; the tint here is applied to
 * the copy instead.
 */
export class PlaneVisualizationLayer {
    public static DEFAULT_OFFSET: number = 0;
    public static ALIGN_TOP: number = 1;
    public static ALIGN_BOTTOM: number = 2;
    public static ALIGN_DEFAULT: number = 1;

    private _material: PlaneMaterial | undefined;
    private _color: number;
    private _offset: number;
    private _align: number;

    constructor(material: PlaneMaterial | undefined, color: number, align: number, offset: number = PlaneVisualizationLayer.DEFAULT_OFFSET) {
        this._material = material;
        this._offset = offset;
        this._align = align;
        this._color = color;
    }

    public dispose(): void {
        this._material = undefined;
    }

    public render(canvas: RenderTexture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number): RenderTexture {
        const red = (this._color >> 16) & 0xFF;
        const green = (this._color >> 8) & 0xFF;
        const blue = this._color & 0xFF;
        const tinted = (red < 255) || (green < 255) || (blue < 255);

        if (!this._material) {
            fillPlaneCanvas(canvas, this._color);

            return canvas;
        }

        const topAlign = (this._align === PlaneVisualizationLayer.ALIGN_TOP);

        if (!tinted) {
            this._material.render(canvas, width, height, normal, useTexture, offsetX, offsetY + this._offset, topAlign);

            return canvas;
        }

        const bitmap = this._material.render(undefined, width, height, normal, useTexture, offsetX, offsetY + this._offset, topAlign);

        if (bitmap) copyToPlaneCanvas(canvas, bitmap, 0, 0, undefined, this._color);

        return canvas;
    }
}
