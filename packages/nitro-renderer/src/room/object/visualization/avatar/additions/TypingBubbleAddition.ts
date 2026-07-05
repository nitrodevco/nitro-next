import { AvatarActionState, type IRoomObjectSprite, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { GetAssetManager } from '#renderer/assets';

import type { AvatarVisualization } from '../AvatarVisualization';
import type { IAvatarAddition } from './IAvatarAddition';

export class TypingBubbleAddition implements IAvatarAddition {
    private _asset: Texture | undefined = undefined;
    private _relativeDepth: number = 0;

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

        sprite.visible = true;
        sprite.relativeDepth = this._relativeDepth;
        sprite.alpha = 255;

        let additionScale = RoomGeometryScaleType.ZoomedIn;
        let offsetX = 0;
        let offsetY = 0;

        if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
            this._asset = GetAssetManager().getTexture('avatar_addition_user_typing_small');

            offsetX = 3;
            offsetY = -42;

            additionScale = RoomGeometryScaleType.ZoomedOut;
        } else {
            this._asset = GetAssetManager().getTexture('avatar_addition_user_typing');

            offsetX = 14;
            offsetY = -83;
        }

        if (this._visualization.posture === AvatarActionState.Sit) {
            offsetY += additionScale / 2;
        } else if (this._visualization.posture === AvatarActionState.Lay) {
            offsetY += scale;
        }

        if (this._asset) {
            sprite.texture = this._asset;
            sprite.offsetX = offsetX;
            sprite.offsetY = offsetY;
            sprite.relativeDepth = -0.02 + 0;
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

    public get relativeDepth(): number {
        return this._relativeDepth;
    }

    public set relativeDepth(depth: number) {
        this._relativeDepth = depth;
    }
}
