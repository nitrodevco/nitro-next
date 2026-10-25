import {
    IAssetPlaneMaterial,
    IAssetPlaneMaterialCellColumn,
    IAssetPlaneTexture,
    IAssetPlaneVisualization,
    IAssetPlaneVisualizationData,
    IAssetPlaneVisualizationLayer,
    IGraphicAsset,
    IGraphicAssetCollection,
    IRoomGeometry,
    IVector3D,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { Point, RenderTexture } from 'pixi.js';

import { RoomGeometry } from '../../../../../utils';
import { PlaneBitmapData } from '../../utils';
import { IPlaneRasterizer } from '../IPlaneRasterizer';
import { createFlippedPlaneTexture } from '../PlaneCanvas';
import { Plane } from './Plane';
import { PlaneMaterial } from './PlaneMaterial';
import { PlaneMaterialCell } from './PlaneMaterialCell';
import { PlaneMaterialCellColumn } from './PlaneMaterialCellColumn';
import { PlaneMaterialCellMatrix } from './PlaneMaterialCellMatrix';
import { PlaneTexture } from './PlaneTexture';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

/**
 * The base of the plane rasterizers: reads the textures and materials of one section of the room's
 * visualization data (`wallData`, `floorData`, `landscapeData`), resolves their bitmaps from the
 * room's asset collection and keeps the planes a subclass builds from them. Ports Flash
 * `PlaneRasterizer`; `FloorRasterizer`, `WallRasterizer`, `WallAdRasterizer` and
 * `LandscapeRasterizer` extend it.
 *
 * The data is the room asset's JSON rather than Flash's XML: a section's `planes` is Flash's
 * `<walls>`/`<floors>`/`<wallAds>` list, a plane's `visualizations` its `<visualization>` elements
 * and `allLayers` their `<visualizationLayer>` children, attribute for attribute.
 */
export class PlaneRasterizer implements IPlaneRasterizer {
    protected static DEFAULT_TYPE: string = 'default';
    /** The angles a visualization without its own is drawn at, as `parseVisualizations` defaults them. */
    protected static HORIZONTAL_ANGLE_DEFAULT: number = 45;
    protected static VERTICAL_ANGLE_DEFAULT: number = 30;

    private _assetCollection: IGraphicAssetCollection | undefined = undefined;
    private _materials: Map<string, PlaneMaterial> = new Map();
    private _textures: Map<string, PlaneTexture> = new Map();
    private _planes: Map<string, Plane> = new Map();
    private _geometries: Map<string, IRoomGeometry> = new Map();
    private _data: IAssetPlaneVisualizationData | undefined = undefined;

    protected get data(): IAssetPlaneVisualizationData | undefined {
        return this._data;
    }

    protected get assetCollection(): IGraphicAssetCollection | undefined {
        return this._assetCollection;
    }

    public dispose(): void {
        for (const plane of this._planes.values()) plane.dispose();

        this._planes.clear();

        this.resetMaterials();
        this.resetTextures();

        this._geometries.clear();
        this._data = undefined;
        this._assetCollection = undefined;
    }

    public clearCache(): void {
        for (const material of this._materials.values()) material.clearCache();
    }

    public initialize(data: IAssetPlaneVisualizationData | undefined): void {
        this._data = data;
    }

    private resetMaterials(): void {
        for (const material of this._materials.values()) material.dispose();

        this._materials.clear();
    }

    private resetTextures(): void {
        for (const texture of this._textures.values()) texture.dispose();

        this._textures.clear();
    }

    protected getTexture(id: string): PlaneTexture | undefined {
        return this._textures.get(id);
    }

    protected getMaterial(id: string): PlaneMaterial | undefined {
        return this._materials.get(id);
    }

    protected getPlane(id: string): Plane | undefined {
        return this._planes.get(id);
    }

    protected addPlane(id: string, plane: Plane): boolean {
        if (!plane || this._planes.has(id)) return false;

        this._planes.set(id, plane);

        return true;
    }

    public initializeAssetCollection(collection: IGraphicAssetCollection): void {
        if (!this._data) return;

        this._assetCollection = collection;

        this.initializeAll();
    }

    private initializeAll(): void {
        if (!this._data) return;

        this.initializeTexturesAndMaterials();
        this.initializePlanes();
    }

    private initializeTexturesAndMaterials(): void {
        if (this._data?.textures) this.parseTextures(this._data.textures, this._assetCollection);
        if (this._data?.materials) this.parsePlaneMaterials(this._data.materials);
    }

    protected initializePlanes(): void { }

    private parseTextures(textures: IAssetPlaneTexture[], collection: IGraphicAssetCollection | undefined): void {
        if (!collection) return;

        for (const texture of textures) {
            if (!texture?.id || this._textures.has(texture.id)) continue;

            const planeTexture = new PlaneTexture();

            for (const bitmap of texture.bitmaps ?? []) {
                if (!bitmap?.assetName) continue;

                const asset = collection.getAsset(bitmap.assetName);
                const assetTexture = asset?.texture;

                if (!assetTexture) continue;

                const normalMinX = bitmap.normalMinX ?? PlaneTexture.MIN_NORMAL_COORDINATE_VALUE;
                const normalMaxX = bitmap.normalMaxX ?? PlaneTexture.MAX_NORMAL_COORDINATE_VALUE;
                const normalMinY = bitmap.normalMinY ?? PlaneTexture.MIN_NORMAL_COORDINATE_VALUE;
                const normalMaxY = bitmap.normalMaxY ?? PlaneTexture.MAX_NORMAL_COORDINATE_VALUE;

                if (asset.flipH) planeTexture.addBitmap(createFlippedPlaneTexture(assetTexture), normalMinX, normalMaxX, normalMinY, normalMaxY, bitmap.assetName, true);
                else planeTexture.addBitmap(assetTexture, normalMinX, normalMaxX, normalMinY, normalMaxY, bitmap.assetName);
            }

            this._textures.set(texture.id, planeTexture);
        }
    }

    private parsePlaneMaterials(materials: IAssetPlaneMaterial[]): void {
        for (const material of materials) {
            if (!material?.id) continue;

            const planeMaterial = new PlaneMaterial();

            for (const matrix of material.matrices ?? []) {
                let repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_DEFAULT;

                switch (matrix.repeatMode) {
                    case 'borders':
                        repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_BORDERS;
                        break;
                    case 'center':
                        repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_CENTER;
                        break;
                    case 'first':
                        repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_FIRST;
                        break;
                    case 'last':
                        repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_LAST;
                        break;
                    case 'random':
                        repeatMode = PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM;
                        break;
                }

                const align = (matrix.align === 'bottom') ? PlaneMaterialCellMatrix.ALIGN_BOTTOM : PlaneMaterialCellMatrix.ALIGN_TOP;
                const columns = matrix.columns ?? [];

                if (columns.length > 0) {
                    const cellMatrix = planeMaterial.addMaterialCellMatrix(
                        columns.length,
                        repeatMode,
                        align,
                        matrix.normalMinX ?? PlaneMaterial.MIN_NORMAL_COORDINATE_VALUE,
                        matrix.normalMaxX ?? PlaneMaterial.MAX_NORMAL_COORDINATE_VALUE,
                        matrix.normalMinY ?? PlaneMaterial.MIN_NORMAL_COORDINATE_VALUE,
                        matrix.normalMaxY ?? PlaneMaterial.MAX_NORMAL_COORDINATE_VALUE,
                    );

                    columns.forEach((column, index) => this.parsePlaneMaterialCellColumn(column, cellMatrix, index));
                }

                // Flash adds the material once per matrix; its `Map.add` keeps the first.
                if (!this._materials.has(material.id)) this._materials.set(material.id, planeMaterial);
            }
        }
    }

    private parsePlaneMaterialCellColumn(column: IAssetPlaneMaterialCellColumn, matrix: PlaneMaterialCellMatrix, index: number): void {
        if (!column || !matrix) return;

        let repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_ALL;

        switch (column.repeatMode) {
            case 'borders':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_BORDERS;
                break;
            case 'center':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_CENTER;
                break;
            case 'first':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_FIRST;
                break;
            case 'last':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_LAST;
                break;
            case 'none':
                repeatMode = PlaneMaterialCellColumn.REPEAT_MODE_NONE;
                break;
        }

        matrix.createColumn(index, Math.trunc(column.width ?? 0), this.parsePlaneMaterialCells(column), repeatMode);
    }

    private parsePlaneMaterialCells(column: IAssetPlaneMaterialCellColumn): PlaneMaterialCell[] | undefined {
        const cells: PlaneMaterialCell[] = [];

        (column.cells ?? []).forEach((cell, cellIndex) => {
            let extraItemTypes: IGraphicAsset[] | undefined = undefined;
            let extraItemOffsets: Point[] | undefined = undefined;
            let extraItemCount = 0;

            const extraData = cell.extraData;

            if (extraData?.extraItemTypes && extraData.offsets) {
                const typeNames = extraData.extraItemTypes;

                extraItemOffsets = extraData.offsets.map(([ x, y ]) => new Point(x, y));
                extraItemCount = extraData.limitMax ?? extraItemOffsets.length;
                extraItemTypes = [];

                // Flash reads `types[cellIndex]` once per type rather than `types[typeIndex]`.
                for (let i = 0; i < typeNames.length; i++) {
                    const asset = this._assetCollection?.getAsset(typeNames[cellIndex]);

                    if (asset) extraItemTypes.push(asset);
                }
            }

            cells.push(new PlaneMaterialCell(cell.textureId ? this.getTexture(cell.textureId) : undefined, extraItemTypes, extraItemOffsets, extraItemCount));
        });

        return cells.length ? cells : undefined;
    }

    protected getGeometry(size: number, horizontalAngle: number, verticalAngle: number): IRoomGeometry {
        horizontalAngle = Math.min(90, Math.abs(horizontalAngle));
        verticalAngle = Math.min(90, Math.abs(verticalAngle));

        const key = `${size}_${Math.round(horizontalAngle)}_${Math.round(verticalAngle)}`;

        let geometry = this._geometries.get(key);

        if (!geometry) {
            geometry = new RoomGeometry(size, new Vector3d(horizontalAngle, verticalAngle), new Vector3d(-10, 0, 0));

            this._geometries.set(key, geometry);
        }

        return geometry;
    }

    /**
     * Flash `parseVisualizations`: one visualization per `size` (default angles 45 and 30), each
     * `visualizationLayer` a layer of it - its material, `color` (white by default), `offset` and
     * `align` (`top` unless it says `bottom`). A layer naming a material the data lacks is still set,
     * without one, as Flash sets it.
     */
    protected parseVisualizations(plane: Plane, visualizations: IAssetPlaneVisualization[] | undefined): void {
        if (!plane || !visualizations) return;

        for (const visualization of visualizations) {
            if (visualization?.size === undefined) continue;

            const size = Math.trunc(visualization.size);
            const horizontalAngle = visualization.horizontalAngle ?? PlaneRasterizer.HORIZONTAL_ANGLE_DEFAULT;
            const verticalAngle = visualization.verticalAngle ?? PlaneRasterizer.VERTICAL_ANGLE_DEFAULT;
            const layers = (visualization.allLayers ?? []) as IAssetPlaneVisualizationLayer[];
            const planeVisualization = plane.createPlaneVisualization(size, layers.length, this.getGeometry(size, horizontalAngle, verticalAngle));

            if (!planeVisualization) continue;

            layers.forEach((layer, index) => {
                const material = layer?.materialId ? this.getMaterial(layer.materialId) : undefined;
                const offset = (layer?.offset !== undefined) ? Math.trunc(layer.offset) : 0;
                const color = (layer?.color !== undefined) ? layer.color : 0xFFFFFF;
                let align = PlaneVisualizationLayer.ALIGN_TOP;

                if (layer?.align === 'bottom') align = PlaneVisualizationLayer.ALIGN_BOTTOM;
                else if (layer?.align === 'top') align = PlaneVisualizationLayer.ALIGN_TOP;

                planeVisualization.setLayer(index, material, color, align, offset);
            });
        }
    }

    /** Flash `getLayers`: the layers of the plane type (or `default`) as last drawn. */
    public getLayers(planeId: string): ReturnType<Plane['getLayers']> {
        return (this.getPlane(planeId) ?? this.getPlane(PlaneRasterizer.DEFAULT_TYPE))?.getLayers() ?? [];
    }

    public render(
        _canvas: RenderTexture | undefined,
        _planeId: string,
        _width: number,
        _height: number,
        _scale: number,
        _normal: IVector3D,
        _useTexture: boolean,
        _offsetX: number = 0,
        _offsetY: number = 0,
        _maxX: number = 0,
        _maxY: number = 0,
        _timeSinceStartMs: number = 0,
    ): PlaneBitmapData | undefined {
        return undefined;
    }

    public getTextureIdentifier(scale: number, _normal: IVector3D | undefined): string {
        return String(scale);
    }
}
