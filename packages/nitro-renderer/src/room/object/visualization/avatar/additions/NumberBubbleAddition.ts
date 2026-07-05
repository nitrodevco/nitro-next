import type { IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { AvatarActionStateType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { GetAssetManager } from '#renderer/assets';

import type { AvatarVisualization } from '../AvatarVisualization';
import type { IAvatarAddition } from './IAvatarAddition';

export class NumberBubbleAddition implements IAvatarAddition {
    private _asset: Texture | undefined = undefined;
    private _scale: RoomGeometryScaleType = RoomGeometryScaleType.None;
    private _numberValueFadeDirection: number = 0;
    private _numberValueMoving: boolean = false;
    private _numberValueMoveCounter: number = 0;

    constructor(
        private _id: number,
        private _number: number,
        private _visualization: AvatarVisualization | undefined,
    ) { }

    public dispose(): void {
        this._visualization = undefined;
        this._asset = undefined;
    }

    public update(sprite: IRoomObjectSprite, scale: RoomGeometryScaleType): void {
        if (!sprite || !this._visualization) return;

        this._scale = scale;

        let additionScale = RoomGeometryScaleType.ZoomedIn;
        let offsetX: number;
        let offsetY: number;

        if (this._number > 0) {
            if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
                this._asset = GetAssetManager().getTexture('avatar_addition_number_' + this._number + '_small');

                additionScale = RoomGeometryScaleType.ZoomedOut;
                offsetX = -6;
                offsetY = -52;
            } else {
                this._asset = GetAssetManager().getTexture('avatar_addition_number_' + this._number);

                offsetX = -8;
                offsetY = -105;
            }

            if (this._visualization.posture === AvatarActionStateType.Sit) {
                offsetY += additionScale / 2;
            } else if (this._visualization.posture === AvatarActionStateType.Lay) {
                offsetY += scale;
            }

            if (this._asset) {
                sprite.visible = true;
                sprite.texture = this._asset;
                sprite.offsetX = offsetX;
                sprite.offsetY = offsetY;
                sprite.relativeDepth = -0.01;
                sprite.alpha = 0;

                this._numberValueFadeDirection = 1;
                this._numberValueMoving = true;
                this._numberValueMoveCounter = 0;
            } else {
                sprite.visible = false;
            }
        } else if (sprite.visible) this._numberValueFadeDirection = -1;
    }

    public animate(sprite: IRoomObjectSprite): boolean {
        if (!sprite) return false;

        if (this._asset) {
            sprite.texture = this._asset;
        }

        let alpha = sprite.alpha;
        let didAnimate = false;

        if (this._numberValueMoving) {
            this._numberValueMoveCounter++;

            if (this._numberValueMoveCounter < 10) return false;

            if (this._numberValueFadeDirection < 0) {
                if (this._scale < RoomGeometryScaleType.AvatarSizeNormal) {
                    sprite.offsetY -= 2;
                } else {
                    sprite.offsetY -= 4;
                }
            } else {
                let count = 4;

                if (this._scale < RoomGeometryScaleType.AvatarSizeNormal) count = 8;

                if (!(this._numberValueMoveCounter % count)) {
                    sprite.offsetY--;

                    didAnimate = true;
                }
            }
        }

        if (this._numberValueFadeDirection > 0) {
            if (alpha < 255) alpha += 32;

            if (alpha >= 255) {
                alpha = 255;

                this._numberValueFadeDirection = 0;
            }

            sprite.alpha = alpha;

            return true;
        }

        if (this._numberValueFadeDirection < 0) {
            if (alpha >= 0) alpha -= 32;

            if (alpha <= 0) {
                this._numberValueFadeDirection = 0;
                this._numberValueMoving = false;

                alpha = 0;

                sprite.visible = false;
            }

            sprite.alpha = alpha;

            return true;
        }

        return didAnimate;
    }

    public get id(): number {
        return this._id;
    }
}
