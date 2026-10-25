/**
 * A water area (a pool tile): an animated furni whose `shore` layer is cut to the tiles around it.
 * Ports Flash `FurnitureWaterAreaVisualization`.
 *
 * The furni's state is a bit field of which neighbours are water, walked round the tile's border
 * (bottom row right to left, then the sides bottom to top, then the top row): a neighbour that is
 * water drops the shore on that side, and where a shore segment meets one it is cut straight or
 * round an inner corner. `ShoreMaskCreatorUtility` turns that into the instance's own copy of the
 * shore bitmap, which the shore layer then draws instead of the shared one. With no shore left at
 * all the layer draws nothing. The animation is always the first, whatever the state.
 */
import { IGraphicAsset, RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';
import { ShoreMaskCreatorUtility } from './ShoreMaskCreatorUtility';

export class FurnitureWaterAreaVisualization extends AnimatedFurnitureVisualization {
    private static SHORE_SPRITE_TAG: string = 'shore';

    /** Whether any segment of the shore is shown. */
    private _hasShore: boolean = true;
    private _borders: boolean[] = [];
    private _borderTypes: number[] = [];
    private _createdInstanceMaskSizes: number[] = [];
    private _needsShoreUpdate: boolean = false;
    private _sizeX: number = 0;
    private _sizeY: number = 0;
    private _shoreSpriteIndex: number = 0;
    private _shoreSpriteIndexScale: number = -1;
    private _shoreSpriteIndexDirection: number = -1;
    private _shoreMask: ReturnType<typeof ShoreMaskCreatorUtility.createEmptyMask> | undefined = undefined;

    public override dispose(): void {
        const collection = this.asset;

        if (collection && this.object) {
            for (const size of this._createdInstanceMaskSizes) ShoreMaskCreatorUtility.disposeInstanceMask(this.object.instanceId, size, collection);

            this._createdInstanceMaskSizes = [];
        }

        this._shoreMask = undefined;

        super.dispose();
    }

    protected override updateObject(scale: RoomGeometryScaleType, direction: number): boolean {
        if (!super.updateObject(scale, direction)) return false;

        this._needsShoreUpdate = true;

        this.updateBorderData();

        return true;
    }

    protected override updateAnimation(scale: RoomGeometryScaleType): number {
        let update = super.updateAnimation(scale);

        if (this.updateInstanceShoreMask(scale)) update |= (1 << this.getShoreSpriteIndex(scale));

        return update;
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if ((scale === RoomGeometryScaleType.Icon) || (layerId !== this.getShoreSpriteIndex(scale))) return super.getSpriteAssetName(scale, layerId);

        if (this._hasShore) return ShoreMaskCreatorUtility.getInstanceMaskName(this.object.instanceId, this.getValidSize(scale));

        return '';
    }

    protected override setAnimation(_animationId: number): void {
        super.setAnimation(0);
    }

    private getShoreSpriteIndex(scale: RoomGeometryScaleType): number {
        if ((this._shoreSpriteIndexScale === Number(scale)) && (this._shoreSpriteIndexDirection === this._direction)) return this._shoreSpriteIndex;

        for (let layerId = this.totalSprites - 1; layerId >= 0; layerId--) {
            if (this.getLayerTag(scale, this._direction, layerId) !== FurnitureWaterAreaVisualization.SHORE_SPRITE_TAG) continue;

            this._shoreSpriteIndex = layerId;
            this._shoreSpriteIndexScale = scale;
            this._shoreSpriteIndexDirection = this._direction;

            return layerId;
        }

        return -1;
    }

    private getShoreAsset(scale: RoomGeometryScaleType): IGraphicAsset | undefined {
        return this.asset?.getAsset(super.getSpriteAssetName(scale, this.getShoreSpriteIndex(scale)));
    }

    private getInstanceMask(scale: RoomGeometryScaleType): IGraphicAsset | undefined {
        const collection = this.asset;

        if (!collection) return undefined;

        const size = this.getValidSize(scale);
        const mask = ShoreMaskCreatorUtility.getInstanceMask(this.object.instanceId, size, collection, this.getShoreAsset(scale));

        if (mask && (this._createdInstanceMaskSizes.indexOf(size) < 0)) this._createdInstanceMaskSizes.push(size);

        return mask;
    }

    private updateBorderData(): void {
        this.resetBorders();

        let state = this.object.getState(0);

        const area = this.getAreaData();
        const width = this._sizeX + 2;
        const height = this._sizeY + 2;

        let row = area[height - 1];

        for (let x = width - 1; x >= 0; x--) {
            if (state & 1) row[x] = true;

            state >>= 1;
        }

        for (let y = height - 2; y >= 1; y--) {
            row = area[y];

            if (state & 1) row[width - 1] = true;

            state >>= 1;

            if (state & 1) row[0] = true;

            state >>= 1;
        }

        row = area[0];

        for (let x = width - 1; x >= 0; x--) {
            if (state & 1) row[x] = true;

            state >>= 1;
        }

        let index = 0;

        index = this.updateTopBorder(area, index);
        index = this.updateRightBorder(area, index);
        index = this.updateBottomBorder(area, index);
        this.updateLeftBorder(area, index);

        this._hasShore = this._borders.some(border => border);
    }

    /** How a segment ends next to `beside` (the tile along the edge) and `across` (the one past it). */
    private static getCut(across: boolean, beside: boolean): number {
        if (!across && !beside) return ShoreMaskCreatorUtility.NO_CUT;

        return beside ? ShoreMaskCreatorUtility.INNER_CUT : ShoreMaskCreatorUtility.STRAIGHT_CUT;
    }

    private updateTopBorder(area: boolean[][], index: number): number {
        const width = this._sizeX + 2;
        const top = area[0];
        const below = area[1];

        for (let x = 1; x < width - 1; x++) {
            if (!top[x]) {
                this._borders[index] = true;
                this._borderTypes[index] = ShoreMaskCreatorUtility.getBorderType(
                    FurnitureWaterAreaVisualization.getCut(below[x - 1], top[x - 1]),
                    FurnitureWaterAreaVisualization.getCut(below[x + 1], top[x + 1]),
                );
            }

            index++;
        }

        return index;
    }

    private updateRightBorder(area: boolean[][], index: number): number {
        const width = this._sizeX + 2;
        const height = this._sizeY + 2;

        for (let y = 1; y < height - 1; y++) {
            const row = area[y];
            const above = area[y - 1];
            const below = area[y + 1];

            if (!row[width - 1]) {
                this._borders[index] = true;
                this._borderTypes[index] = ShoreMaskCreatorUtility.getBorderType(
                    FurnitureWaterAreaVisualization.getCut(above[width - 2], above[width - 1]),
                    FurnitureWaterAreaVisualization.getCut(below[width - 2], below[width - 1]),
                );
            }

            index++;
        }

        return index;
    }

    private updateBottomBorder(area: boolean[][], index: number): number {
        const width = this._sizeX + 2;
        const height = this._sizeY + 2;
        const bottom = area[height - 1];
        const above = area[height - 2];

        for (let x = width - 2; x >= 1; x--) {
            if (!bottom[x]) {
                this._borders[index] = true;
                this._borderTypes[index] = ShoreMaskCreatorUtility.getBorderType(
                    FurnitureWaterAreaVisualization.getCut(above[x + 1], bottom[x + 1]),
                    FurnitureWaterAreaVisualization.getCut(above[x - 1], bottom[x - 1]),
                );
            }

            index++;
        }

        return index;
    }

    private updateLeftBorder(area: boolean[][], index: number): number {
        const height = this._sizeY + 2;

        for (let y = height - 2; y >= 1; y--) {
            const row = area[y];
            const below = area[y + 1];
            const above = area[y - 1];

            if (!row[0]) {
                this._borders[index] = true;
                this._borderTypes[index] = ShoreMaskCreatorUtility.getBorderType(
                    FurnitureWaterAreaVisualization.getCut(below[1], below[0]),
                    FurnitureWaterAreaVisualization.getCut(above[1], above[0]),
                );
            }

            index++;
        }

        return index;
    }

    private resetBorders(): void {
        if ((this._sizeX === 0) || (this._sizeY === 0)) {
            const model = this.object?.model;

            if (!model) return;

            this._sizeX = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX) ?? 0);
            this._sizeY = Math.trunc(model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY) ?? 0);
        }

        this._borders = [];
        this._borderTypes = [];

        for (let i = 0; i < (this._sizeX * 2) + (this._sizeY * 2); i++) {
            this._borders.push(false);
            this._borderTypes.push(ShoreMaskCreatorUtility.STRAIGHT_CUT);
        }
    }

    /** The tile and a ring of neighbours around it: the tile's own cells water, the ring not (yet). */
    private getAreaData(): boolean[][] {
        const width = this._sizeX + 2;
        const height = this._sizeY + 2;
        const area: boolean[][] = [];

        for (let y = 0; y < height; y++) area.push(new Array<boolean>(width).fill(false));

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) area[y][x] = true;
        }

        return area;
    }

    private initializeShoreMasks(scale: RoomGeometryScaleType): boolean {
        return ShoreMaskCreatorUtility.initializeShoreMasks(this.getValidSize(scale), this.asset, this.getShoreAsset(scale));
    }

    private createShoreMask(width: number, height: number, scale: RoomGeometryScaleType): ReturnType<typeof ShoreMaskCreatorUtility.createEmptyMask> | undefined {
        if (!this._shoreMask || (this._shoreMask.width < width) || (this._shoreMask.height < height)) this._shoreMask = ShoreMaskCreatorUtility.createEmptyMask(width, height);

        return this.asset ? ShoreMaskCreatorUtility.createShoreMask2x2(this._shoreMask, this.getValidSize(scale), this._borders, this._borderTypes, this.asset) : undefined;
    }

    private updateInstanceShoreMask(scale: RoomGeometryScaleType): boolean {
        if (!this._needsShoreUpdate) return false;

        const instanceMask = this.getInstanceMask(scale);

        if (!instanceMask?.texture || !this.initializeShoreMasks(scale)) return false;

        const mask = this.createShoreMask(instanceMask.texture.width, instanceMask.texture.height, scale);
        const shore = this.getShoreAsset(scale);

        if (mask && shore?.texture) {
            ShoreMaskCreatorUtility.drawInstanceMask(instanceMask, shore, mask);

            this._needsShoreUpdate = false;
        }

        return true;
    }
}
