import { type IAssetColor, type IAssetData, type IAssetVisualizationData, type IAssetVisualizationDirection, type IAssetVisualizationLayer, type IObjectVisualizationData, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { BLEND_MODES } from 'pixi.js';

import { ColorData, LayerData, SizeData } from '../data';

export class FurnitureVisualizationData implements IObjectVisualizationData {
    public static LAYER_LETTERS: string[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];

    private _type: string = '';
    private _sizes: number[] = [];
    private _sizeDatas: Map<number, SizeData> = new Map();
    private _lastSize: number = -1;
    private _lastSizeScale: RoomGeometryScaleType = -1;
    private _lastSizeData: SizeData | undefined = undefined;
    private _lastSizeDataScale: RoomGeometryScaleType = -1;

    public initialize(asset: IAssetData | undefined): boolean {
        this.reset();

        if (!asset) return false;

        this._type = asset.type;

        if (!asset.visualizations || !this.defineVisualizations(asset.visualizations)) {
            this.reset();

            return false;
        }

        return true;
    }

    public dispose(): void {
        if (this._sizeDatas && this._sizeDatas.size) {
            for (const size of this._sizeDatas.values()) size?.dispose();
        }

        this._lastSizeData = undefined;
        this._sizes = [];
    }

    private reset(): void {
        this._type = '';

        if (this._sizeDatas && this._sizeDatas.size) {
            for (const size of this._sizeDatas.values()) size?.dispose();
        }

        this._sizeDatas.clear();

        this._sizes = [];
        this._lastSizeData = undefined;
        this._lastSizeDataScale = -1;
    }

    protected createSizeData(scale: RoomGeometryScaleType, layerCount: number, angle: number): SizeData {
        return new SizeData(layerCount, angle);
    }

    protected defineVisualizations(visualizations: IAssetVisualizationData[]): boolean {
        if (!visualizations) return false;

        for (const visualization of visualizations) {
            const layerCount = visualization.layerCount ?? 0;
            const angle = visualization.angle ?? 45;

            let size = visualization.size ?? 1;

            if (size < 1) size = 1;

            if (this._sizeDatas.get(size)) return false;

            const sizeData = this.createSizeData(size, layerCount, angle);

            if (!sizeData) return false;

            for (const key in visualization) {
                if (!this.processVisualElement(sizeData, key, visualization[key] as object)) {
                    sizeData.dispose();

                    return false;
                }
            }

            this._sizeDatas.set(size, sizeData);

            this._sizes.push(size);
        }

        this.removeInvalidSizes();

        this._sizes.sort();

        return true;
    }

    private removeInvalidSizes(): void {
        if (!this._sizes || !this._sizes.length) return;

        const zoomedIn = this._sizeDatas.get(RoomGeometryScaleType.ZoomedIn);
        const zoomedOut = this._sizeDatas.get(RoomGeometryScaleType.ZoomedOut);

        if (zoomedIn && zoomedOut) {
            if (zoomedIn.layerCount !== zoomedOut.layerCount) {
                this._sizeDatas.delete(RoomGeometryScaleType.ZoomedOut);

                const index = this._sizes.indexOf(RoomGeometryScaleType.ZoomedOut);

                if (index >= 0) this._sizes.splice(index, 1);
            }
        }
    }

    protected processVisualElement(sizeData: SizeData, key: string, data: object): boolean {
        if (!sizeData || !key || !data) return false;

        switch (key) {
            case 'layers':
                if (!sizeData.processLayers(data as IAssetVisualizationLayer[])) return false;
                break;
            case 'directions':
                if (!sizeData.processDirections(data as IAssetVisualizationDirection[])) return false;
                break;
            case 'colors':
                if (!sizeData.processColors(data as IAssetColor[])) return false;
                break;
        }

        return true;
    }

    public getValidSize(scale: RoomGeometryScaleType): number {
        if (scale === this._lastSizeScale) return this._lastSize;

        const sizeIndex = this.getSizeIndex(scale);

        let newScale = -1;

        if (sizeIndex < this._sizes.length) newScale = this._sizes[sizeIndex];

        this._lastSizeScale = scale;
        this._lastSize = newScale;

        return newScale;
    }

    private getSizeIndex(size: number): number {
        if (size <= 0) return 0;

        let index = 0;
        let iterator = 1;

        while (iterator < this._sizes.length) {
            if (this._sizes[iterator] > size) {
                if (this._sizes[iterator] / size < size / this._sizes[iterator - 1]) index = iterator;

                break;
            }

            index = iterator;

            iterator++;
        }

        return index;
    }

    protected getSizeData(size: RoomGeometryScaleType): SizeData | undefined {
        if (size === this._lastSizeDataScale) return this._lastSizeData;

        const sizeIndex = this.getSizeIndex(size);

        if (sizeIndex < this._sizes.length) this._lastSizeData = this._sizeDatas.get(this._sizes[sizeIndex]);
        else this._lastSizeData = undefined;

        this._lastSizeDataScale = size;

        return this._lastSizeData;
    }

    public getLayerCount(scale: RoomGeometryScaleType): number {
        return this.getSizeData(scale)?.layerCount ?? LayerData.DEFAULT_COUNT;
    }

    public getValidDirection(scale: RoomGeometryScaleType, direction: number): number {
        return this.getSizeData(scale)?.getValidDirection(direction) ?? LayerData.DEFAULT_DIRECTION;
    }

    public getLayerTag(scale: RoomGeometryScaleType, direction: number, layerId: number): string {
        return this.getSizeData(scale)?.getLayerTag(direction, layerId) ?? LayerData.DEFAULT_TAG;
    }

    public getLayerBlendMode(scale: RoomGeometryScaleType, direction: number, layerId: number): BLEND_MODES {
        return this.getSizeData(scale)?.getLayerBlendMode(direction, layerId) ?? LayerData.DEFAULT_BLEND_MODE;
    }

    public getLayerAlpha(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return this.getSizeData(scale)?.getLayerAlpha(direction, layerId) ?? LayerData.DEFAULT_ALPHA;
    }

    public getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        return this.getSizeData(scale)?.getLayerColor(layerId, colorId) ?? ColorData.DEFAULT_COLOR;
    }

    public getLayerIgnoreMouse(scale: RoomGeometryScaleType, direction: number, layerId: number): boolean {
        return this.getSizeData(scale)?.getLayerIgnoreMouse(direction, layerId) ?? LayerData.DEFAULT_IGNORE_MOUSE;
    }

    public getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return this.getSizeData(scale)?.getLayerXOffset(direction, layerId) ?? LayerData.DEFAULT_XOFFSET;
    }

    public getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return this.getSizeData(scale)?.getLayerYOffset(direction, layerId) ?? LayerData.DEFAULT_YOFFSET;
    }

    public getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        return this.getSizeData(scale)?.getLayerZOffset(direction, layerId) ?? LayerData.DEFAULT_ZOFFSET;
    }

    public get type(): string {
        return this._type;
    }
}
