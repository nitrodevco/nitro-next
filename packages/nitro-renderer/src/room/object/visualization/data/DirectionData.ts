import type { BLEND_MODES } from 'pixi.js';

import { LayerData } from './LayerData';

export class DirectionData {
    public static USE_DEFAULT_DIRECTION: number = -1;

    private _layers: LayerData[] = [];

    constructor(layerCount: number) {
        for (let i = 0; i < layerCount; i++) this._layers.push(new LayerData());
    }

    public dispose(): void {
        this._layers = [];
    }

    public setFromDirection(directionData: DirectionData): void {
        if (!directionData) return;

        const totalLayers = this.layerCount;

        if (totalLayers !== directionData.layerCount) return;

        for (let i = 0; i < totalLayers; i++) {
            const layer = this.getLayer(i);
            const directionLayer = directionData.getLayer(i);

            if (layer && directionLayer) layer.setFromLayer(directionLayer);
        }
    }

    public getLayer(layerId: number): LayerData | undefined {
        return this._layers[layerId];
    }

    public getLayerTag(layerId: number): string {
        return this.getLayer(layerId)?.tag ?? LayerData.DEFAULT_TAG;
    }

    public setLayerTag(layerId: number, tag: string): void {
        const existing = this.getLayer(layerId);

        if (!existing) return;

        existing.tag = tag;
    }

    public getLayerBlendMode(layerId: number): BLEND_MODES {
        return this.getLayer(layerId)?.blendMode ?? LayerData.DEFAULT_BLEND_MODE;
    }

    public setLayerBlendMode(layerId: number, blendMode: BLEND_MODES): void {
        const existing = this.getLayer(layerId);

        if (!existing || !blendMode || !blendMode.length) return;

        existing.blendMode = blendMode;
    }

    public getLayerAlpha(layerId: number): number {
        return this.getLayer(layerId)?.alpha ?? LayerData.DEFAULT_ALPHA;
    }

    public setLayerAlpha(layerId: number, alpha: number): void {
        const existing = this.getLayer(layerId);

        if (!existing || isNaN(alpha)) return;

        existing.alpha = alpha;
    }

    public getLayerIgnoreMouse(layerId: number): boolean {
        return this.getLayer(layerId)?.ignoreMouse ?? LayerData.DEFAULT_IGNORE_MOUSE;
    }

    public setLayerIgnoreMouse(layerId: number, flag: boolean): void {
        const existing = this.getLayer(layerId);

        if (!existing) return;

        existing.ignoreMouse = flag || false;
    }

    public getLayerXOffset(layerId: number): number {
        return this.getLayer(layerId)?.xOffset ?? LayerData.DEFAULT_XOFFSET;
    }

    public setLayerXOffset(layerId: number, offset: number): void {
        const existing = this.getLayer(layerId);

        if (!existing || isNaN(offset)) return;

        existing.xOffset = offset;
    }

    public getLayerYOffset(layerId: number): number {
        return this.getLayer(layerId)?.yOffset ?? LayerData.DEFAULT_YOFFSET;
    }

    public setLayerYOffset(layerId: number, offset: number): void {
        const existing = this.getLayer(layerId);

        if (!existing || isNaN(offset)) return;

        existing.yOffset = offset;
    }

    public getLayerZOffset(layerId: number): number {
        return this.getLayer(layerId)?.zOffset ?? LayerData.DEFAULT_ZOFFSET;
    }

    public setLayerZOffset(layerId: number, offset: number): void {
        const existing = this.getLayer(layerId);

        if (!existing || isNaN(offset)) return;

        existing.zOffset = offset;
    }

    public get layerCount(): number {
        return this._layers.length;
    }
}
