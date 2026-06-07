import type { IGraphicAsset, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';
import { Matrix, Sprite } from 'pixi.js';

import { GetAssetManager } from '../../../../assets';
import { TextureUtils } from '../../../../utils';
import { FurnitureBBVisualization } from './FurnitureBBVisualization';
import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization';

export class FurnitureIsometricBBVisualization extends FurnitureBBVisualization {
    private _needsTransform: boolean = true;

    protected generateTransformedImage(texture: Texture, asset: IGraphicAsset): void {
        const sprite = new Sprite(texture);
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

        const newTexture = TextureUtils.createAndWriteRenderTexture(
            asset.width + matrix.tx,
            asset.height + matrix.ty,
            sprite,
            matrix,
        );

        if (newTexture) this.asset.addAsset(`${this._imageUrl}_0`, newTexture, sprite.x, sprite.y, asset.flipH, asset.flipV, false, true);

        this._needsTransform = false;
    }

    protected override checkAndCreateImageForCurrentState(): void {
        super.checkAndCreateImageForCurrentState();

        this._needsTransform = true;
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if (tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE && this._imageUrl) {
            if (this._needsTransform) {
                const texture = GetAssetManager().getTexture(this._imageUrl);
                const asset = this.getAsset(super.getSpriteAssetName(scale, layerId));

                if (texture && asset) this.generateTransformedImage(texture, asset);
            }

            return `${this._imageUrl}_${this.getFrameNumber(scale, layerId)}`;
        }

        return super.getSpriteAssetName(scale, layerId);
    }
}
