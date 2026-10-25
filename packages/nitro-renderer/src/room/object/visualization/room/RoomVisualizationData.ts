import { IAssetData, IGraphicAssetCollection, IObjectVisualizationData } from '@nitrodevco/nitro-api';

import { PlaneMaskManager } from './mask';
import { LandscapeRasterizer } from './rasterizer/animated/LandscapeRasterizer';
import { FloorRasterizer } from './rasterizer/basic/FloorRasterizer';
import { WallAdRasterizer } from './rasterizer/basic/WallAdRasterizer';
import { WallRasterizer } from './rasterizer/basic/WallRasterizer';

/**
 * The room's visualization data: the plane masks and the four rasterizers its planes are drawn
 * with - walls, floors, billboard walls and landscapes, each from its section of the room asset's
 * `roomVisualization`. Ports Flash `RoomVisualizationData` (whose `wallAdRasterizr` getter keeps
 * Flash's spelling).
 */
export class RoomVisualizationData implements IObjectVisualizationData {
    private _wallRasterizer: WallRasterizer = new WallRasterizer();
    private _floorRasterizer: FloorRasterizer = new FloorRasterizer();
    private _wallAdRasterizr: WallAdRasterizer = new WallAdRasterizer();
    private _landscapeRasterizer: LandscapeRasterizer = new LandscapeRasterizer();
    private _maskManager: PlaneMaskManager = new PlaneMaskManager();
    private _initialized: boolean = false;

    public initialize(asset: IAssetData | undefined): boolean {
        if (!asset || !asset.roomVisualization) return false;

        const data = asset.roomVisualization;

        if (data.wallData) this._wallRasterizer.initialize(data.wallData);
        if (data.floorData) this._floorRasterizer.initialize(data.floorData);
        if (data.wallAdData) this._wallAdRasterizr.initialize(data.wallAdData);
        if (data.landscapeData) this._landscapeRasterizer.initialize(data.landscapeData);
        if (data.maskData) this._maskManager.initialize(data.maskData);

        return true;
    }

    public dispose(): void {
        this._wallRasterizer?.dispose();
        this._floorRasterizer?.dispose();
        this._wallAdRasterizr?.dispose();
        this._landscapeRasterizer?.dispose();
        this._maskManager?.dispose();

        this._wallRasterizer = null!;
        this._floorRasterizer = null!;
        this._wallAdRasterizr = null!;
        this._landscapeRasterizer = null!;
        this._maskManager = null!;
    }

    public setGraphicAssetCollection(collection: IGraphicAssetCollection): void {
        if (this._initialized) return;

        this._wallRasterizer.initializeAssetCollection(collection);
        this._floorRasterizer.initializeAssetCollection(collection);
        this._wallAdRasterizr.initializeAssetCollection(collection);
        this._landscapeRasterizer.initializeAssetCollection(collection);
        this._maskManager.initializeAssetCollection(collection);

        this._initialized = true;
    }

    /** Flash clears the wall, floor and landscape caches; the billboard rasterizer's is left. */
    public clearCache(): void {
        this._wallRasterizer?.clearCache();
        this._floorRasterizer?.clearCache();
        this._landscapeRasterizer?.clearCache();
    }

    public get initialized(): boolean {
        return this._initialized;
    }

    public get wallRasterizer(): WallRasterizer {
        return this._wallRasterizer;
    }

    public get floorRasterizer(): FloorRasterizer {
        return this._floorRasterizer;
    }

    public get wallAdRasterizr(): WallAdRasterizer {
        return this._wallAdRasterizr;
    }

    public get landscapeRasterizer(): LandscapeRasterizer {
        return this._landscapeRasterizer;
    }

    public get maskManager(): PlaneMaskManager {
        return this._maskManager;
    }
}
