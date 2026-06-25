import type { IGraphicAsset, IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureGuildCustomizedVisualization extends FurnitureAnimatedVisualization {
    public static PRIMARY_COLOUR_SPRITE_TAG: string = 'COLOR1' as const;
    public static SECONDARY_COLOUR_SPRITE_TAG: string = 'COLOR2' as const;
    public static BADGE: string = 'BADGE' as const;
    public static DEFAULT_COLOR_1: number = 0xeeeeee;
    public static DEFAULT_COLOR_2: number = 0x4b4b4b;

    private _color1: number = FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_1;
    private _color2: number = FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_2;
    private _badgeAssetNameNormalScale: string = '';
    private _badgeAssetNameSmallScale: string = '';

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const flag = super.updateModel(scale);

        if (this._badgeAssetNameNormalScale === '') {
            const assetName = this.object.model.getValue<string>(
                RoomObjectVariableEnum.FurnitureGuildCustomizedAssetName,
            );

            if (assetName) {
                this._badgeAssetNameNormalScale = assetName;
                this._badgeAssetNameSmallScale = this._badgeAssetNameNormalScale + '_32';
            }
        }

        const color1 = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedColor1);

        this._color1 = color1 ? color1 : FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_1;

        const color2 = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedColor2);

        this._color2 = color2 ? color2 : FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_2;

        return flag;
    }

    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        switch (tag) {
            case FurnitureGuildCustomizedVisualization.PRIMARY_COLOUR_SPRITE_TAG:
                return this._color1;
            case FurnitureGuildCustomizedVisualization.SECONDARY_COLOUR_SPRITE_TAG:
                return this._color2;
        }

        return super.getLayerColor(scale, layerId, colorId);
    }

    public override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if (tag === FurnitureGuildCustomizedVisualization.BADGE) {
            if (scale === RoomGeometryScaleType.ZoomedOut) return this._badgeAssetNameSmallScale;

            return this._badgeAssetNameNormalScale;
        }

        return super.getSpriteAssetName(scale, layerId);
    }

    protected override getLibraryAssetNameForSprite(
        asset: IGraphicAsset,
        sprite: IRoomObjectSprite,
    ): string | undefined {
        if (sprite.tag === FurnitureGuildCustomizedVisualization.BADGE) {
            return '%group.badge.url%' + sprite.libraryAssetName?.replace('badge_', '');
        }

        return super.getLibraryAssetNameForSprite(asset, sprite);
    }
}
