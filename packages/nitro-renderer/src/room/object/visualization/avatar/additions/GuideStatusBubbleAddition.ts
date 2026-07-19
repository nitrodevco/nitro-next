import type { IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { AvatarActionStateType, AvatarGuideStatus, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { GetAssetManager } from '#renderer/assets';

import type { AvatarVisualization } from '../AvatarVisualization';
import type { IAvatarAddition } from './IAvatarAddition';

export class GuideStatusBubbleAddition implements IAvatarAddition {
    private _asset: Texture | undefined = undefined;
    private _relativeDepth: number = 0;

    constructor(
        private _id: number,
        private _visualization: AvatarVisualization | undefined,
        private _status: number,
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

        let additionScale = 64;
        let offsetX: number;
        let offsetY: number;

        this._asset = GetAssetManager().getTexture(
            this._status === AvatarGuideStatus.GUIDE
                ? 'avatar_addition_user_guide_bubble'
                : 'avatar_addition_user_guide_requester_bubble',
        );

        if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
            offsetX = -19;
            offsetY = -80;
            additionScale = RoomGeometryScaleType.ZoomedOut;
        } else {
            offsetX = -19;
            offsetY = -120;
        }

        if (this._visualization.posture === AvatarActionStateType.Sit) {
            offsetY += additionScale / 2;
        } else if (this._visualization.posture === AvatarActionStateType.Lay) {
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
