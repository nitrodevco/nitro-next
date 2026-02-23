import { AlphaTolerance, type IRoomObjectSprite } from '@nitrodevco/nitro-api';
import type { Texture } from 'pixi.js';

import { GetTexturePool } from '../../../../../utils';
import type { IAvatarAddition } from './IAvatarAddition';

export class GameClickTargetAddition implements IAvatarAddition {
    private static WIDTH: number = 46;
    private static HEIGHT: number = 60;
    private static OFFSET_X: number = -23;
    private static OFFSET_Y: number = -48;

    private _asset: Texture | undefined = undefined;

    constructor(private _id: number) {}

    public dispose(): void {
        if (this._asset) {
            GetTexturePool().putTexture(this._asset);

            this._asset = undefined;
        }
    }

    public update(sprite: IRoomObjectSprite, scale: number): void {
        if (!sprite) return;

        if (!this._asset)
            this._asset = GetTexturePool().getTexture(GameClickTargetAddition.WIDTH, GameClickTargetAddition.HEIGHT);

        if (this._asset) {
            sprite.visible = true;
            sprite.texture = this._asset;
            sprite.offsetX = GameClickTargetAddition.OFFSET_X;
            sprite.offsetY = GameClickTargetAddition.OFFSET_Y;
            sprite.alphaTolerance = AlphaTolerance.MATCH_ALL_PIXELS;
        }
    }

    public animate(sprite: IRoomObjectSprite): boolean {
        return false;
    }

    public get id(): number {
        return this._id;
    }
}
