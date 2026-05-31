import { AlphaTolerance } from '@nitrodevco/nitro-api';
import type { TextureSource } from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../utils';

export class ExtendedSprite extends Sprite {
    private static readonly _hitMaps = new WeakMap<TextureSource, Uint8Array>();

    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _tag: string = '';
    private _alphaTolerance: number = AlphaTolerance.MATCH_OPAQUE_PIXELS;
    private _varyingDepth: boolean = false;
    private _clickHandling: boolean = false;
    private _skipMouseHandling: boolean = false;
    private _geometryUpdateId: number = -1;
    private _objectUpdateId: number = -1;

    public needsUpdate(geometryUpdateId: number, objectUpdateId: number): boolean {
        if (this._geometryUpdateId === geometryUpdateId && this._objectUpdateId === objectUpdateId) return false;

        this._geometryUpdateId = geometryUpdateId;
        this._objectUpdateId = objectUpdateId;

        return true;
    }

    public setTexture(texture: Texture): void {
        if (!texture) texture = Texture.EMPTY;

        if (texture === this.texture) return;

        if (texture === Texture.EMPTY) {
            this._geometryUpdateId = -1;
            this._objectUpdateId = -1;
        }

        this.texture = texture;
    }

    public containsXY(x: number, y: number): boolean {
        if (this.alphaTolerance > 255 || !this.texture || this.texture === Texture.EMPTY) return false;

        x = x * this.scale.x;
        y = y * this.scale.y;

        if (!super.containsPoint({ x, y })) return false;

        if (this.alphaTolerance <= 0) return true;

        const texture = this.texture;
        const textureSource = texture.source;

        if (!textureSource) return false;

        let hitMap = ExtendedSprite._hitMaps.get(textureSource);

        if (!hitMap) {
            hitMap = ExtendedSprite.generateHitMapForTextureSource(textureSource);
            if (!hitMap) return false;
        }

        let dx = x + texture.frame.x;
        let dy = y + texture.frame.y;

        if (texture.trim) {
            dx -= texture.trim.x;
            dy -= texture.trim.y;
        }

        dx = (dx * textureSource.resolution + 0.5) | 0;
        dy = (dy * textureSource.resolution + 0.5) | 0;

        return hitMap[dx + dy * textureSource.width] >= this.alphaTolerance;
    }

    private static generateHitMapForTextureSource(textureSource: TextureSource): Uint8Array | undefined {
        if (!textureSource) return undefined;

        const tmp = new Texture(textureSource);
        const result = TextureUtils.getPixels(tmp);

        tmp.destroy();

        if (!result?.pixels) return undefined;

        const rgba = result.pixels;
        const alpha = new Uint8Array(rgba.length >> 2);

        for (let i = 0; i < alpha.length; i++) {
            alpha[i] = rgba[(i << 2) + 3];
        }

        ExtendedSprite._hitMaps.set(textureSource, alpha);

        return alpha;
    }

    public get offsetX(): number {
        return this._offsetX;
    }

    public set offsetX(offset: number) {
        this._offsetX = offset;
    }

    public get offsetY(): number {
        return this._offsetY;
    }

    public set offsetY(offset: number) {
        this._offsetY = offset;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(tag: string) {
        this._tag = tag;
    }

    public get alphaTolerance(): number {
        return this._alphaTolerance;
    }

    public set alphaTolerance(tolerance: number) {
        this._alphaTolerance = tolerance;
    }

    public get varyingDepth(): boolean {
        return this._varyingDepth;
    }

    public set varyingDepth(flag: boolean) {
        this._varyingDepth = flag;
    }

    public get clickHandling(): boolean {
        return this._clickHandling;
    }

    public set clickHandling(flag: boolean) {
        this._clickHandling = flag;
    }

    public get skipMouseHandling(): boolean {
        return this._skipMouseHandling;
    }

    public set skipMouseHandling(flag: boolean) {
        this._skipMouseHandling = flag;
    }
}
