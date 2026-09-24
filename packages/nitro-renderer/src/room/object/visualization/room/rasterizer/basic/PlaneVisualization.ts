import { IGraphicAssetCollection, IRoomGeometry, IVector3D } from '@nitrodevco/nitro-api';
import { RenderTexture } from 'pixi.js';

import { IPlaneAnimationLayerItem, PlaneVisualizationAnimationLayer } from '../animated/PlaneVisualizationAnimationLayer';
import { clearPlaneCanvas, createPlaneCanvas } from '../PlaneCanvas';
import { PlaneMaterial } from './PlaneMaterial';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

/**
 * A plane's look at one size: its layers, drawn bottom to top onto one canvas, and the geometry that
 * size is drawn with. Ports Flash `PlaneVisualization`.
 *
 * Flash keeps the last result in a bitmap of its own and hands it back while the size and normal
 * stay the same. That cache is left out: the matrices underneath keep theirs, and `RoomPlane` keeps
 * the finished texture until it expires, so the plane only comes back here when something changed.
 */
export class PlaneVisualization {
    private _layers: (PlaneVisualizationLayer | PlaneVisualizationAnimationLayer | undefined)[] = [];
    private _geometry: IRoomGeometry | undefined;
    private _hasAnimationLayers: boolean = false;

    constructor(totalLayers: number, geometry: IRoomGeometry) {
        if (totalLayers < 0) totalLayers = 0;

        for (let i = 0; i < totalLayers; i++) this._layers.push(undefined);

        this._geometry = geometry;
    }

    public get geometry(): IRoomGeometry | undefined {
        return this._geometry;
    }

    public get hasAnimationLayers(): boolean {
        return this._hasAnimationLayers;
    }

    public dispose(): void {
        for (const layer of this._layers) layer?.dispose();

        this._layers = [];
        this._geometry = undefined;
    }

    public setLayer(index: number, material: PlaneMaterial | undefined, color: number, align: number, offset: number = 0): boolean {
        if (index < 0 || index > this._layers.length) return false;

        this._layers[index]?.dispose();
        this._layers[index] = new PlaneVisualizationLayer(material, color, align, offset);

        return true;
    }

    public setAnimationLayer(index: number, items: IPlaneAnimationLayerItem[], assetCollection: IGraphicAssetCollection | undefined): boolean {
        if (index < 0 || index > this._layers.length) return false;

        this._layers[index]?.dispose();
        this._layers[index] = new PlaneVisualizationAnimationLayer(items, assetCollection);
        this._hasAnimationLayers = true;

        return true;
    }

    /**
     * Draws every layer onto `canvas` when it is `width` x `height`, or onto a new canvas when it is
     * not. The canvas drawn on is returned and belongs to the caller.
     */
    public render(
        canvas: RenderTexture | undefined,
        width: number,
        height: number,
        normal: IVector3D,
        useTexture: boolean,
        offsetX: number = 0,
        offsetY: number = 0,
        maxX: number = 0,
        maxY: number = 0,
        maxXUnits: number = 0,
        maxYUnits: number = 0,
        timeSinceStartMs: number = 0,
    ): RenderTexture {
        if (width < 1) width = 1;
        if (height < 1) height = 1;

        if (canvas && canvas.width === width && canvas.height === height) clearPlaneCanvas(canvas);
        else canvas = createPlaneCanvas(width, height);

        for (const layer of this._layers) {
            if (layer instanceof PlaneVisualizationLayer) layer.render(canvas, width, height, normal, useTexture, offsetX, offsetY);
            else if (layer instanceof PlaneVisualizationAnimationLayer) layer.render(canvas, offsetX, offsetY, maxX, maxY, maxXUnits, maxYUnits, timeSinceStartMs);
        }

        return canvas;
    }
}
