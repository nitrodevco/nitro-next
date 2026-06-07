import type { IGraphicAsset, IRoomObjectSprite, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';
import { Matrix, Sprite } from 'pixi.js';

import { TextureUtils } from '../../../../utils';
import { IsometricImageFurniVisualization } from './IsometricImageFurniVisualization';

export class FurnitureGuildIsometricBadgeVisualization extends IsometricImageFurniVisualization {
    public static PRIMARY_COLOUR_SPRITE_TAG: string = 'COLOR1';
    public static SECONDARY_COLOUR_SPRITE_TAG: string = 'COLOR2';
    public static DEFAULT_COLOR_1: number = 0xeeeeee;
    public static DEFAULT_COLOR_2: number = 0x4b4b4b;

    private _color1: number;
    private _color2: number;

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const flag = super.updateModel(scale);

        if (!this.hasThumbnailImage) {
            const assetName = this.object.model.getValue<string>(
                RoomObjectVariableEnum.FurnitureGuildCustomizedAssetName,
            );

            if (assetName && assetName.length) this.setThumbnailImages(this.getBitmapAsset(assetName));
        }

        const color1 = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedColor1);

        this._color1 = color1 ? color1 : FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_1;

        const color2 = this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureGuildCustomizedColor2);

        this._color2 = color2 ? color2 : FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_2;

        return flag;
    }

    protected override generateTransformedThumbnail(texture: Texture, asset: IGraphicAsset): Texture {
        const scale = 1.1;
        const matrix = new Matrix();
        const difference = asset.width / texture.width;

        switch (this.direction) {
            case 2:
                matrix.a = difference;
                matrix.b = -0.5 * difference;
                matrix.c = 0;
                matrix.d = difference * scale;
                matrix.tx = 0;
                matrix.ty = 0.5 * difference * texture.width;
                break;
            case 0:
            case 4:
                matrix.a = difference;
                matrix.b = 0.5 * difference;
                matrix.c = 0;
                matrix.d = difference * scale;
                matrix.tx = 0;
                matrix.ty = 0;
                break;
            default:
                matrix.a = difference;
                matrix.b = 0;
                matrix.c = 0;
                matrix.d = difference;
                matrix.tx = 0;
                matrix.ty = 0;
        }

        const sprite = new Sprite(texture);

        sprite.setFromMatrix(matrix);

        sprite.x = 0;
        sprite.y = 0;

        return TextureUtils.generateTexture(sprite);

        /* const renderTexture = RenderTexture.create({
            width: asset.width,
            height: asset.height
        });

        PixiApplicationProxy.instance.renderer.render(sprite, {
            renderTexture,
            clear: true,
        });

        return renderTexture; */

        /* const sprite = new NitroSprite(texture);

        const renderTexture = RenderTexture.create({
            width: (asset.width + matrix.tx),
            height: (asset.height + matrix.ty)
        });

        sprite.position.set(0)

        PixiApplicationProxy.instance.renderer.render(sprite, {
            renderTexture,
            clear: true,
            transform: matrix
        });

        return renderTexture; */
    }

    protected override getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        switch (tag) {
            case FurnitureGuildIsometricBadgeVisualization.PRIMARY_COLOUR_SPRITE_TAG:
                return this._color1;
            case FurnitureGuildIsometricBadgeVisualization.SECONDARY_COLOUR_SPRITE_TAG:
                return this._color2;
        }

        return super.getLayerColor(scale, layerId, colorId);
    }

    protected override getLibraryAssetNameForSprite(
        asset: IGraphicAsset,
        sprite: IRoomObjectSprite,
    ): string | undefined {
        if (sprite.tag === FurnitureGuildIsometricBadgeVisualization.THUMBNAIL) {
            if (
                this.object &&
                this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureGuildCustomizedAssetName)
            ) {
                return (
                    '%group.badge.url%' +
                    this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureGuildCustomizedAssetName)
                );
            }
        }

        return super.getLibraryAssetNameForSprite(asset, sprite);
    }

    private getBitmapAsset(name: string): Texture | undefined {
        return this.asset.getAsset(name)?.texture || undefined;
    }
}
