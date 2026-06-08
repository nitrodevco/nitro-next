import type {
    IAssetPlaneMaskData,
    IAssetPlaneTextureBitmap,
    IGraphicAssetCollection,
    IVector3D,
    RoomGeometryScaleType,
} from '@nitrodevco/nitro-api';

import { TextureUtils } from '../../../../../utils';
import type { MaskEntry } from '../utils/MergeMasks';
import { PlaneMask } from './PlaneMask';
import { PlaneMaskVisualization } from './PlaneMaskVisualization';

export class PlaneMaskManager {
    private _masks: Map<string, PlaneMask> = new Map();
    private _data: IAssetPlaneMaskData | undefined = undefined;

    public get data(): IAssetPlaneMaskData | undefined {
        return this._data;
    }

    public dispose(): void {
        this._data = undefined;

        if (this._masks && this._masks.size) {
            for (const mask of this._masks.values()) {
                if (!mask) continue;

                mask.dispose();
            }

            this._masks.clear();
        }
    }

    public initialize(k: IAssetPlaneMaskData): void {
        this._data = k;
    }

    public initializeAssetCollection(k: IGraphicAssetCollection): void {
        if (!this.data) return;

        this.parseMasks(this.data, k);
    }

    private parseMasks(maskData: IAssetPlaneMaskData, assets: IGraphicAssetCollection): void {
        if (!maskData || !assets || !maskData.masks || !maskData.masks.length) return;

        let index = 0;

        while (index < maskData.masks.length) {
            const mask = maskData.masks[index];

            if (mask) {
                const id = mask.id;

                if (!id) continue;

                const existing = this._masks.get(id);

                if (existing) continue;

                const newMask = new PlaneMask();

                if (mask.visualizations && mask.visualizations.length) {
                    let visualIndex = 0;

                    while (visualIndex < mask.visualizations.length) {
                        const visualization = mask.visualizations[visualIndex];

                        if (visualization) {
                            const size = visualization.size;
                            const maskVisualization = newMask.createMaskVisualization(size);

                            if (maskVisualization) {
                                const assetName = this.parseMaskBitmaps(
                                    visualization.bitmaps ?? [],
                                    maskVisualization,
                                    assets,
                                );

                                if (assetName !== undefined) newMask.setAssetName(size, assetName);
                            }
                        }

                        visualIndex++;
                    }
                }

                this._masks.set(id, newMask);
            }

            index++;
        }
    }

    private parseMaskBitmaps(
        bitmaps: IAssetPlaneTextureBitmap[],
        maskVisualization: PlaneMaskVisualization,
        assetCollection: IGraphicAssetCollection,
    ): string | undefined {
        let graphicName: string | undefined = undefined;

        if (bitmaps && bitmaps.length > 0) {
            for (const bitmap of bitmaps) {
                if (!bitmap) continue;

                const assetName = bitmap.assetName;

                if (!assetName) continue;

                let asset = assetCollection.getAsset(assetName);

                if (!asset || !asset.texture) continue;

                const texture = TextureUtils.makeWhiteTransparent(asset.texture);

                if (!texture) continue;

                asset = assetCollection.addAsset(asset.name, texture, asset.x, asset.y, asset.flipH, asset.flipV, false, true);

                if (!asset) continue;

                let normalMinX = PlaneMaskVisualization.MIN_NORMAL_COORDINATE_VALUE;
                let normalMaxX = PlaneMaskVisualization.MAX_NORMAL_COORDINATE_VALUE;
                let normalMinY = PlaneMaskVisualization.MIN_NORMAL_COORDINATE_VALUE;
                let normalMaxY = PlaneMaskVisualization.MAX_NORMAL_COORDINATE_VALUE;

                if (bitmap.normalMinX !== undefined) normalMinX = bitmap.normalMinX;
                if (bitmap.normalMaxX !== undefined) normalMaxX = bitmap.normalMaxX;
                if (bitmap.normalMinY !== undefined) normalMinY = bitmap.normalMinY;
                if (bitmap.normalMaxY !== undefined) normalMaxY = bitmap.normalMaxY;

                if (!asset.flipH) graphicName = assetName;

                maskVisualization.addBitmap(asset, normalMinX, normalMaxX, normalMinY, normalMaxY);
            }
        }

        return graphicName;
    }

    public getMaskEntry(
        type: string,
        scale: RoomGeometryScaleType,
        normal: IVector3D,
        posX: number,
        posY: number,
    ): MaskEntry | undefined {
        const mask = this._masks.get(type);

        if (!mask) return undefined;

        const asset = mask.getGraphicAsset(scale, normal);

        if (!asset) return undefined;

        const texture = asset.texture;

        if (!texture) return undefined;

        return {
            texture: texture,
            position: { x: posX + asset.offsetX, y: posY + asset.offsetY },
            scale: { x: asset.flipH ? -1 : 1, y: asset.flipV ? -1 : 1 }
        };
    }

    public getMask(k: string): PlaneMask | undefined {
        return this._masks.get(k);
    }
}
