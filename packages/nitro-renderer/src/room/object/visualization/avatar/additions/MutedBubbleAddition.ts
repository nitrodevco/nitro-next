import type { IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { AvatarAction, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { GetAssetManager } from '../../../../../assets';
import type { AvatarVisualization } from '../AvatarVisualization';
import type { IAvatarAddition } from './IAvatarAddition';

export class MutedBubbleAddition implements IAvatarAddition {
    private _asset: Texture | undefined = undefined;

    constructor(
        private _id: number,
        private _visualization: AvatarVisualization | undefined,
    ) { }

    public dispose(): void {
        this._visualization = undefined;
        this._asset = undefined;
    }

    public update(sprite: IRoomObjectSprite, scale: RoomGeometryScaleType): void {
        if (!sprite || !this._visualization) return;

        let additionScale = RoomGeometryScaleType.ZoomedIn;
        let offsetX = 0;
        let offsetY = 0;

        if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
            this._asset = GetAssetManager().getTexture('avatar_addition_user_muted_small');

            additionScale = RoomGeometryScaleType.ZoomedOut;
            offsetX = -12;
            offsetY = -66;
        } else {
            this._asset = GetAssetManager().getTexture('avatar_addition_user_muted');

            offsetX = -15;
            offsetY = -110;
        }

        if (this._visualization.posture === AvatarAction.POSTURE_SIT) offsetY += additionScale / 2;
        else if (this._visualization.posture === AvatarAction.POSTURE_LAY) offsetY += scale;

        if (this._asset) {
            sprite.visible = true;
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = offsetY;
            sprite.relativeDepth = -0.02;
        } else {
            sprite.visible = false;
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean {
        if (this._asset && sprite) {
            sprite.texture = this._asset;
        }

        return false;
    }

    public get id(): number {
        return this._id;
    }
}
