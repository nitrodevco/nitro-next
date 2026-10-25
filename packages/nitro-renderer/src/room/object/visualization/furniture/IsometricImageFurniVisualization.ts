import { IGraphicAsset, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Container, Matrix, RenderTexture, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';
import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash `IsometricImageFurniVisualization` (obfuscated `§_-W2y§`): a furni whose
 * `THUMBNAIL` layer shows a picture from elsewhere - a photo, a YouTube still, a guild badge -
 * skewed onto the furni's face. The picture is transformed once per size (64 and 32) into an
 * asset named for the object (`<type>_<id>_thumb_<size>`), which the thumbnail layer then draws.
 */
export class IsometricImageFurniVisualization extends AnimatedFurnitureVisualization {
    protected static THUMBNAIL: string = 'THUMBNAIL';

    private _thumbnailAssetNameSmall: string | undefined = undefined;
    private _thumbnailAssetNameNormal: string | undefined = undefined;
    private _thumbnailImageSmall: Texture | undefined = undefined;
    private _thumbnailImageNormal: Texture | undefined = undefined;
    private _thumbnailDirection: number = -1;
    private _thumbnailChanged: boolean = false;
    protected _hasOutline: boolean = false;

    /**
     * The thumbnails are rendered per object into the type's shared collection, which outlives the
     * object (every photo of a room shares it): left there, each one stayed until the type was purged.
     */
    public override dispose(): void {
        if (this.asset) {
            if (this._thumbnailAssetNameNormal) this.asset.disposeAsset(this._thumbnailAssetNameNormal);
            if (this._thumbnailAssetNameSmall) this.asset.disposeAsset(this._thumbnailAssetNameSmall);
        }

        super.dispose();
    }

    public get hasThumbnailImage(): boolean {
        return !(this._thumbnailImageNormal == null);
    }

    /** Flash `setThumbnailImages`: the small picture is the normal one unless one is given. */
    protected setThumbnailImages(texture: Texture | undefined, small: Texture | undefined = undefined): void {
        this._thumbnailImageNormal = texture;
        this._thumbnailImageSmall = small ?? texture;
        this._thumbnailChanged = true;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const flag = super.updateModel(scale);

        if (!this._thumbnailChanged && this._thumbnailDirection === this.direction) return flag;

        this.refreshThumbnail();

        return true;
    }

    private refreshThumbnail(): void {
        if (!this.asset) return;

        if (this._thumbnailImageNormal) {
            this.addThumbnailAsset(this._thumbnailImageNormal, 64);

            if (this._thumbnailImageSmall) this.addThumbnailAsset(this._thumbnailImageSmall, 32);
        } else {
            this.asset.disposeAsset(this.getThumbnailAssetName(64));
            this.asset.disposeAsset(this.getThumbnailAssetName(32));
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

                    this.asset?.addAsset(assetName, thumbnail, asset.offsetX, asset.offsetY, false, false, false, true);
                }

                return;
            }

            layerId++;
        }
    }

    /**
     * Flash `generateTransformedThumbnail`: the picture scaled to the layer's width and skewed to
     * the furni's direction, into a bitmap the size of the layer's asset. With an outline
     * (`hasOutline`) the bitmap is 2px larger and the picture is drawn four times in black -
     * one pixel left, up, down and right of where it finally goes - under itself.
     */
    protected generateTransformedThumbnail(texture: Texture, asset: IGraphicAsset): Texture {
        const scale = 1.1;
        const matrix = new Matrix();
        const difference = asset.width / texture.width;

        switch (this.direction) {
            case 0:
            case 4:
                matrix.a = difference;
                matrix.b = 0.5 * difference;
                matrix.c = 0;
                matrix.d = difference * scale;
                matrix.tx = 0;
                matrix.ty = 0;
                break;
            case 2:
                matrix.a = difference;
                matrix.b = -0.5 * difference;
                matrix.c = 0;
                matrix.d = difference * scale;
                matrix.tx = 0;
                matrix.ty = 0.5 * difference * texture.width;
                break;
            default:
                matrix.a = difference;
                matrix.b = 0;
                matrix.c = 0;
                matrix.d = difference;
                matrix.tx = 0;
                matrix.ty = 0;
        }

        const container = new Container();
        const draw = (x: number, y: number, black: boolean) => {
            const sprite = new Sprite(texture);
            const placed = matrix.clone();

            placed.tx += x;
            placed.ty += y;

            sprite.setFromMatrix(placed);

            if (black) sprite.tint = 0x000000;

            container.addChild(sprite);
        };

        if (this._hasOutline) {
            draw(0, 0, true);
            draw(1, -1, true);
            draw(1, 1, true);
            draw(2, 0, true);
            draw(1, 0, false);
        } else {
            draw(0, 0, false);
        }

        const padding = this._hasOutline ? 2 : 0;
        const target = RenderTexture.create({ width: Math.max(1, asset.width + padding), height: Math.max(1, asset.height + padding) });

        TextureUtils.writeToTexture(container, target, true);

        container.destroy({ children: true });

        return target;
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if (
            this._thumbnailImageNormal
            && this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL
        )
            return this.getThumbnailAssetName(scale);

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getThumbnailAssetName(scale: RoomGeometryScaleType): string {
        if (!this._thumbnailAssetNameSmall || !this._thumbnailAssetNameNormal) {
            this._thumbnailAssetNameSmall = this.getFullThumbnailAssetName(this.object.id, 32);
            this._thumbnailAssetNameNormal = this.getFullThumbnailAssetName(this.object.id, 64);
        }

        return (scale === RoomGeometryScaleType.ZoomedOut) ? this._thumbnailAssetNameSmall : this._thumbnailAssetNameNormal;
    }

    protected getFullThumbnailAssetName(k: number, _arg_2: number): string {
        return [ this._type, k, 'thumb', _arg_2 ].join('_');
    }
}
