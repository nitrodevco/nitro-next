import { IGraphicAsset, RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { BLEND_MODES, Filter } from 'pixi.js';

import { createFlashGlowFilter } from '#renderer/utils';

import { FurnitureChestVisualization } from './FurnitureChestVisualization';

/** One floating icon: where it hangs, which way it faces, how big it was taken to be, its alpha and depth, and its bob phase. */
interface IFloatingIcon {
    x: number;
    y: number;
    flipped: boolean;
    width: number;
    height: number;
    alpha: number;
    zOffset: number;
    phase: number;
}

/**
 * Port of Flash `FurnitureFurniChestVisualization` (obfuscated `§_-712§`, `furniture_furnichest`):
 * a wired chest that, open, floats up to four icons of what it holds above itself. The icon
 * names come from `FurnitureFurniChestLogic` (`furniture_furni_chest_shown_asset_names`); each
 * one is an extra sprite after the chest's own, placed round a slot of `ICON_POSITIONING` with a
 * little randomness, faded the higher it hangs, bobbing two pixels on a 300ms step, mirrored
 * with the chest's direction and ringed in white (`FLOATING_ICON_GLOW_FILTER`). Only drawn at the
 * zoomed-in size.
 *
 * Flash also declares a 1200ms cycle (`§_-1a§`) and `INDIVIDUAL_FLOATING_ENABLED = false`, and
 * reads neither; every icon bobs in step (`phase` 0), so neither is carried.
 *
 * Flash measured each icon (`createIconAssets`) before its sprite counted as floating, so the
 * size was read from the chest's own - absent - asset for that sprite and is always 0: the icon
 * hangs from its top-left corner rather than its centre. That is kept.
 */
export class FurnitureFurniChestVisualization extends FurnitureChestVisualization {
    private static FLOATING_ICON_TAG_PREFIX: string = 'floating_icon_';
    private static MAX_FLOATING_ICONS: number = 4;
    private static FLOATING_PIXELS: number = 2;
    private static FLOAT_STEP_MS: number = 300;
    private static ICON_POSITIONING: number[][][] = [
        [],
        [ [ 0, -68, 17, 17 ] ],
        [ [ 16, -70, 4, 4 ], [ -14, -59, 4, 4 ] ],
        [ [ 12, -52, 2, 2 ], [ -17, -70, 3, 2 ], [ 17, -87, 7, 2 ] ],
        [ [ 14, -50, 2, 2 ], [ -14, -59, 2, 2 ], [ 19, -78, 4, 2 ], [ -20, -90, 4, 2 ] ],
    ];

    /** Flash `GlowFilter(16777215, 1, 2, 2, 10, 1, false, false)`: a hard white ring. */
    private static FLOATING_ICON_GLOW_FILTER: Filter[] | undefined = undefined;

    private _iconAssets: (IGraphicAsset | undefined)[] | undefined = undefined;
    private _lastAssetsString: string = '';
    private _iconAssetNames: string[] = [];
    private _flipped: boolean = false;
    private _icons: IFloatingIcon[] = [];
    private _floatStep: number = 0;
    private _lastFloatUpdate: number = -1;

    private static getGlowFilter(): Filter[] {
        if (!FurnitureFurniChestVisualization.FLOATING_ICON_GLOW_FILTER) FurnitureFurniChestVisualization.FLOATING_ICON_GLOW_FILTER = [ createFlashGlowFilter(0xFFFFFF, 1, 2, 2, 10, 1, false, false) ];

        return FurnitureFurniChestVisualization.FLOATING_ICON_GLOW_FILTER;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        let updated = super.updateModel(scale);
        let names = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureFurniChestShownAssetNames);

        if (!names || scale !== RoomGeometryScaleType.ZoomedIn) names = '';

        if (this._lastAssetsString !== names) {
            this._lastAssetsString = names;
            this._iconAssetNames = names.length ? names.split(',') : [];

            this.createIconAssets();

            updated = true;
        }

        return updated;
    }

    protected override updateObject(scale: RoomGeometryScaleType, direction: number): boolean {
        let updated = super.updateObject(scale, direction);

        if ((this._lastUpdateTime - this._lastFloatUpdate) > FurnitureFurniChestVisualization.FLOAT_STEP_MS) {
            updated = true;

            this._lastFloatUpdate = this._lastUpdateTime;
            this._floatStep += 1;

            if (this._floatStep >= (FurnitureFurniChestVisualization.FLOATING_PIXELS * 2)) this._floatStep = 0;
        }

        return updated;
    }

    protected override getAdditionalLayerCount(): number {
        return super.getAdditionalLayerCount() + FurnitureFurniChestVisualization.MAX_FLOATING_ICONS;
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if (!this.isFloatingIcon(layerId) || scale !== RoomGeometryScaleType.ZoomedIn) return super.getSpriteAssetName(scale, layerId);

        const index = this.getIconIndex(layerId);

        if (index < 0 || index >= this._iconAssetNames.length) return super.getSpriteAssetName(scale, layerId);

        return this._iconAssetNames[index];
    }

    /** Which floating icon a sprite is: the last four sprites are the icons, in order. */
    private getIconIndex(layerId: number): number {
        return layerId - this._layerCount + FurnitureFurniChestVisualization.MAX_FLOATING_ICONS;
    }

    private isFloatingIcon(layerId: number): boolean {
        const index = this.getIconIndex(layerId);

        return (index >= 0) && (index < this._icons.length);
    }

    protected override reset(): void {
        super.reset();

        this.clearIconAssets();
    }

    private clearIconAssets(): void {
        this._iconAssets = undefined;
    }

    private createIconAssets(): void {
        this.clearIconAssets();

        this._iconAssets = [];
        this._icons = [];
        this._flipped = Math.random() < 0.5;
        this._floatStep = 0;
        this._lastFloatUpdate = this._lastUpdateTime;

        const count = Math.min(FurnitureFurniChestVisualization.MAX_FLOATING_ICONS, this._iconAssetNames.length);

        for (let index = 0; index < count; index++) {
            // Read before this sprite counts as floating (`_icons` is one short): the chest's own name for it.
            const asset = this.asset?.getAsset(this.getSpriteAssetName(RoomGeometryScaleType.ZoomedIn, this._layerCount - FurnitureFurniChestVisualization.MAX_FLOATING_ICONS + index));
            const position = FurnitureFurniChestVisualization.ICON_POSITIONING[count][index];
            const x = Math.trunc(position[0] + (Math.random() * (position[2] + 1)) - (position[2] / 2));
            const y = Math.trunc(position[1] + (Math.random() * (position[3] + 1)) - (position[3] / 2));

            this._iconAssets.push(asset);
            this._icons.push({
                x,
                y,
                flipped: Math.random() < 0.5,
                width: asset?.width ?? 0,
                height: asset?.height ?? 0,
                alpha: FurnitureFurniChestVisualization.calculateAlphaForYOffset(y),
                zOffset: 0.001 + (y / 10000),
                phase: 0,
            });
        }
    }

    /** Flash `calculateAlphaForYOffset`: 0.9 at 40px up, fading to 0.4 at 100px. */
    private static calculateAlphaForYOffset(y: number): number {
        const low = -40;
        const high = -100;
        const ratio = (y - low) / (high - low);
        const maxAlpha = 0.9;
        const minAlpha = 0.4;
        const alpha = maxAlpha + ((minAlpha - maxAlpha) * ratio);

        return Math.min(Math.max(alpha, minAlpha), maxAlpha);
    }

    public override getAsset(name: string, layerId: number = -1): IGraphicAsset | undefined {
        if (this.isFloatingIcon(layerId)) {
            const index = this.getIconIndex(layerId);

            if (!this._iconAssets) this.createIconAssets();

            const asset = this._iconAssets?.[index];

            if (asset) return asset;
        }

        return super.getAsset(name, layerId);
    }

    protected override getLayerTag(scale: RoomGeometryScaleType, direction: number, layerId: number): string {
        if (this.isFloatingIcon(layerId)) return FurnitureFurniChestVisualization.FLOATING_ICON_TAG_PREFIX + this.getIconIndex(layerId);

        return super.getLayerTag(scale, direction, layerId);
    }

    protected override getLayerAlpha(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        const alpha = super.getLayerAlpha(scale, direction, layerId);

        if (this.isFloatingIcon(layerId)) return Math.trunc(this._icons[this.getIconIndex(layerId)].alpha * alpha);

        return alpha;
    }

    protected override getLayerIgnoreMouse(scale: RoomGeometryScaleType, direction: number, layerId: number): boolean {
        if (this.isFloatingIcon(layerId)) return true;

        return super.getLayerIgnoreMouse(scale, direction, layerId);
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this.isFloatingIcon(layerId)) {
            const icon = this._icons[this.getIconIndex(layerId)];
            const mirrored = ((direction / 2) % 2) === 1;
            const x = (this._flipped !== mirrored) ? -icon.x : icon.x;

            return Math.trunc(x - (icon.width / 2));
        }

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this.isFloatingIcon(layerId)) {
            const icon = this._icons[this.getIconIndex(layerId)];
            let bob = (this._floatStep + icon.phase) % (FurnitureFurniChestVisualization.FLOATING_PIXELS * 2);

            if (bob > FurnitureFurniChestVisualization.FLOATING_PIXELS) bob = FurnitureFurniChestVisualization.FLOATING_PIXELS - (bob - FurnitureFurniChestVisualization.FLOATING_PIXELS);

            return Math.trunc(icon.y + (icon.height / 2) - bob);
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }

    protected override getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this.isFloatingIcon(layerId)) return this._icons[this.getIconIndex(layerId)].zOffset;

        return super.getLayerZOffset(scale, direction, layerId);
    }

    protected override getLayerBlendMode(scale: RoomGeometryScaleType, direction: number, layerId: number): BLEND_MODES {
        if (this.isFloatingIcon(layerId)) return 'normal';

        return super.getLayerBlendMode(scale, direction, layerId);
    }

    protected override getLayerFilters(scale: RoomGeometryScaleType, direction: number, layerId: number): Filter[] | undefined {
        if (this.isFloatingIcon(layerId)) return FurnitureFurniChestVisualization.getGlowFilter();

        return super.getLayerFilters(scale, direction, layerId);
    }

    protected override getLayerFlipH(scale: RoomGeometryScaleType, direction: number, layerId: number): boolean {
        if (this.isFloatingIcon(layerId)) {
            const icon = this._icons[this.getIconIndex(layerId)];
            const mirrored = ((direction / 2) % 2) === 1;

            return (this._flipped !== mirrored) !== icon.flipped;
        }

        return super.getLayerFlipH(scale, direction, layerId);
    }
}
