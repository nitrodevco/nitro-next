import type { IAssetColor, IAssetVisualizationDirection, IAssetVisualizationLayer } from '@nitrodevco/nitro-api';
import type { BLEND_MODES } from 'pixi.js';

import { ColorData } from './ColorData';
import { DirectionData } from './DirectionData';
import { LayerData } from './LayerData';

export class SizeData {
    public static MAX_LAYERS: number = 26;

    private _layerCount: number;
    private _angle: number;

    private _defaultDirection: DirectionData;
    private _directions: Map<number, DirectionData> = new Map();
    private _colors: Map<number, ColorData> = new Map();
    private _lastDirectionData: DirectionData | undefined = undefined;
    private _lastDirection: number = -1;

    constructor(layerCount: number, angle: number) {
        this._layerCount = layerCount < 0 ? 0 : layerCount > SizeData.MAX_LAYERS ? SizeData.MAX_LAYERS : layerCount;
        this._angle = angle < 1 ? 1 : angle > 360 ? 360 : angle;

        this._defaultDirection = new DirectionData(this._layerCount);
    }

    public dispose(): void {
        if (this._defaultDirection) this._defaultDirection.dispose();

        for (const direction of this._directions.values()) direction?.dispose();

        for (const color of this._colors.values()) color?.dispose();

        this._defaultDirection = undefined!;
        this._lastDirectionData = undefined;
        this._lastDirection = -1;

        this._directions.clear();
        this._colors.clear();
    }

    public processLayers(layers: IAssetVisualizationLayer[]): boolean {
        return this.setDirectionLayers(this._defaultDirection, layers);
    }

    public processDirections(directions: IAssetVisualizationDirection[]): boolean {
        if (!directions) return false;

        for (const direction of directions) {
            if (this._directions.get(direction.id)) return false;

            const directionData = new DirectionData(this._layerCount);

            directionData.setFromDirection(this._defaultDirection);

            if (direction.layers !== undefined) this.setDirectionLayers(directionData, direction.layers);

            this._directions.set(direction.id, directionData);

            this._lastDirectionData = undefined;
            this._lastDirection = -1;
        }

        return true;
    }

    public processColors(colors: IAssetColor[]): boolean {
        if (!colors) return false;

        for (const color of colors) {
            if (this._colors.get(color.id)) return false;

            const colorData = new ColorData(this._layerCount);

            if (color.layers) {
                for (const layer of color.layers) {
                    if (layer?.color) colorData.setColorLayer(layer.id, layer.color);
                }
            }

            this._colors.set(color.id, colorData);
        }

        return true;
    }

    private setDirectionLayers(
        directionData: DirectionData,
        layers: IAssetVisualizationLayer[],
    ): boolean {
        if (!directionData || !layers) return false;

        for (const layer of layers) {
            if (layer.id < 0 || layer.id >= this._layerCount) return false;

            if (layer.ink !== undefined) directionData.setLayerBlendMode(layer.id, layer.ink?.toLowerCase() as BLEND_MODES);

            if (layer.tag !== undefined) directionData.setLayerTag(layer.id, layer.tag);

            if (layer.alpha !== undefined) directionData.setLayerAlpha(layer.id, layer.alpha);

            if (layer.ignoreMouse !== undefined) directionData.setLayerIgnoreMouse(layer.id, layer.ignoreMouse);

            if (layer.x !== undefined) directionData.setLayerXOffset(layer.id, layer.x);

            if (layer.y !== undefined) directionData.setLayerYOffset(layer.id, layer.y);

            if (layer.z !== undefined) directionData.setLayerZOffset(layer.id, layer.z / -1000);
        }

        return true;
    }

    public getValidDirection(direction: number): number {
        const existing = this._directions.get(direction);

        if (existing) return direction;

        direction = ((direction % 360) + 360) % 360;

        let currentAngle = -1;
        let validDirection = -1;

        for (const key of this._directions.keys()) {
            let angle = (key * this._angle - direction + 360) % 360;

            if (angle > 180) angle = 360 - angle;

            if (angle < currentAngle || currentAngle < 0) {
                currentAngle = angle;
                validDirection = key;
            }
        }

        if (validDirection >= 0) return Math.trunc(validDirection);

        return 0;
    }

    public getDirectionData(direction: number): DirectionData {
        if (direction === this._lastDirection && this._lastDirectionData) return this._lastDirectionData;

        const directionData = this._directions.get(direction) ?? this._defaultDirection;

        this._lastDirection = direction;
        this._lastDirectionData = directionData;

        return this._lastDirectionData;
    }

    public getLayerTag(direction: number, layerId: number): string {
        return this.getDirectionData(direction)?.getLayerTag(layerId) ?? LayerData.DEFAULT_TAG;
    }

    public getLayerBlendMode(direction: number, layerId: number): BLEND_MODES {
        return this.getDirectionData(direction)?.getLayerBlendMode(layerId) ?? LayerData.DEFAULT_BLEND_MODE;
    }

    public getLayerAlpha(direction: number, layerId: number): number {
        return this.getDirectionData(direction)?.getLayerAlpha(layerId) ?? LayerData.DEFAULT_ALPHA;
    }

    public getLayerIgnoreMouse(direction: number, layerId: number): boolean {
        return this.getDirectionData(direction)?.getLayerIgnoreMouse(layerId) ?? LayerData.DEFAULT_IGNORE_MOUSE;
    }

    public getLayerXOffset(direction: number, layerId: number): number {
        return this.getDirectionData(direction)?.getLayerXOffset(layerId) ?? LayerData.DEFAULT_XOFFSET;
    }

    public getLayerYOffset(direction: number, layerId: number): number {
        return this.getDirectionData(direction)?.getLayerYOffset(layerId) ?? LayerData.DEFAULT_YOFFSET;
    }

    public getLayerZOffset(direction: number, layerId: number): number {
        return this.getDirectionData(direction)?.getLayerZOffset(layerId) ?? LayerData.DEFAULT_ZOFFSET;
    }

    public getLayerColor(layerId: number, colorId: number): number {
        const existing = this._colors.get(colorId);

        if (!existing) return ColorData.DEFAULT_COLOR;

        return existing.getLayerColor(layerId);
    }

    public get layerCount(): number {
        return this._layerCount;
    }
}
