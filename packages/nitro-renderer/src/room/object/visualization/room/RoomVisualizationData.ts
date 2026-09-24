import { IAssetData, IGraphicAssetCollection, IObjectVisualizationData } from '@nitrodevco/nitro-api';

import { PlaneMaskManager } from './mask';
import { LandscapeRasterizer } from './rasterizer/animated/LandscapeRasterizer';

/**
 * The room's visualization data: the plane masks and the rasterizers its planes are drawn with.
 * Ports Flash `RoomVisualizationData`. Only the landscape rasterizer is here - `WallRasterizer`,
 * `FloorRasterizer` and `WallAdRasterizer` are not ported, and `RoomPlane` still tiles walls and
 * floors from their first texture.
 */
export class RoomVisualizationData implements IObjectVisualizationData {
    private _landscapeRasterizer: LandscapeRasterizer = new LandscapeRasterizer();
    private _maskManager: PlaneMaskManager = new PlaneMaskManager();
    private _initialized: boolean = false;

    public initialize(asset: IAssetData | undefined): boolean {
        if (!asset || !asset.roomVisualization) return false;

        if (asset.roomVisualization.landscapeData) this._landscapeRasterizer.initialize(asset.roomVisualization.landscapeData);

        if (asset.roomVisualization.maskData) this._maskManager.initialize(asset.roomVisualization.maskData);

        return true;
    }

    public dispose(): void {
        if (this._landscapeRasterizer) {
            this._landscapeRasterizer.dispose();

            this._landscapeRasterizer = null!;
        }

        if (this._maskManager) {
            this._maskManager.dispose();

            this._maskManager = null!;
        }
    }

    public setGraphicAssetCollection(collection: IGraphicAssetCollection): void {
        if (this._initialized) return;

        this._landscapeRasterizer.initializeAssetCollection(collection);
        this._maskManager.initializeAssetCollection(collection);

        this._initialized = true;
    }

    public clearCache(): void {
        this._landscapeRasterizer?.clearCache();
    }

    public get landscapeRasterizer(): LandscapeRasterizer {
        return this._landscapeRasterizer;
    }

    public get maskManager(): PlaneMaskManager {
        return this._maskManager;
    }
}
