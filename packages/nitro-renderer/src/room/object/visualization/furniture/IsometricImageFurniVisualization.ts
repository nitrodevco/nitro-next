import type { IGraphicAsset, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Matrix, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class IsometricImageFurniVisualization extends FurnitureAnimatedVisualization {
    protected static THUMBNAIL: string = 'THUMBNAIL';

    private _thumbnailAssetNameNormal: string | undefined = undefined;
    private _thumbnailImageNormal: Texture | undefined = undefined;
    private _thumbnailDirection: number = -1;
    private _thumbnailChanged: boolean = false;
    protected _hasOutline: boolean = false;

    public get hasThumbnailImage(): boolean {
        return !(this._thumbnailImageNormal == null);
    }

    protected setThumbnailImages(texture: Texture | undefined): void {
        this._thumbnailImageNormal = texture;
        this._thumbnailChanged = true;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const flag = super.updateModel(scale);

        if (!this._thumbnailChanged && this._thumbnailDirection === this.direction) return flag;

        this.refreshThumbnail();

        return true;
    }

    private refreshThumbnail(): void {
        if (this.asset == null) return;

        if (this._thumbnailImageNormal) {
            this.addThumbnailAsset(this._thumbnailImageNormal, 64);
        } else {
            this.asset.disposeAsset(this.getThumbnailAssetName(64));
        }

        this._thumbnailChanged = false;
        this._thumbnailDirection = this.direction;
    }

    private addThumbnailAsset(texture: Texture, scale: RoomGeometryScaleType): void {
        let layerId = 0;

        while (layerId < this.totalSprites) {
            if (this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL) {
                const asset = this.getAsset(
                    this.cacheSpriteAssetName(scale, layerId, false) + this.getFrameNumber(scale, layerId),
                    layerId,
                );

                if (asset) {
                    const thumbnail = this.generateTransformedThumbnail(texture, asset);
                    const assetName = this.getThumbnailAssetName(scale);

                    this.asset.addAsset(assetName, thumbnail, asset.offsetX, asset.offsetY, false, false, false, true);
                }

                return;
            }

            layerId++;
        }
    }

    protected generateTransformedThumbnail(texture: Texture, asset: IGraphicAsset): Texture {
        if (this._hasOutline) {
            const container = new Sprite();
            const background = new Sprite(Texture.WHITE);

            background.tint = 0x000000;
            background.width = texture.width + 40;
            background.height = texture.height + 40;

            const sprite = new Sprite(texture);
            const offsetX = (background.width - sprite.width) / 2;
            const offsetY = (background.height - sprite.height) / 2;

            sprite.x = Math.floor(offsetX);
            sprite.y = Math.floor(offsetY);

            container.addChild(background, sprite);

            texture = TextureUtils.generateTexture(container);
        }

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

        return TextureUtils.generateTexture(sprite);
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if (
            this._thumbnailImageNormal &&
            this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL
        )
            return this.getThumbnailAssetName(scale);

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getThumbnailAssetName(scale: RoomGeometryScaleType): string {
        this._thumbnailAssetNameNormal = this.getFullThumbnailAssetName(this.object.id, 64);

        return this._thumbnailAssetNameNormal;
    }

    protected getFullThumbnailAssetName(k: number, _arg_2: number): string {
        return [this._type, k, 'thumb', _arg_2].join('_');
    }
}
