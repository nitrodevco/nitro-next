import { RenderTexture } from 'pixi.js';

import { IPlaneRasterizer } from './rasterizer/IPlaneRasterizer';
import { releasePlaneCanvas, releasePlaneTarget } from './rasterizer/PlaneCanvas';

/**
 * The finished textures of small floor planes, shared between the planes that would draw them
 * alike - Sulake's JavaScript client keeps the same cache on its room visualization. Stairs and
 * floor edges split a room into thousands of planes a quarter tile across, almost all of them a
 * copy of a few others; drawn one texture each, a stepped room took minutes to fill in and ran the
 * GPU out of memory. A plane looks its texture up by `RoomPlane`'s key before drawing, and offers
 * its own once drawn. Textures here belong to the cache: a plane drops its reference, never the texture.
 */
export class PlaneTextureCache {
    /** The client's limit on textures kept. */
    public static MAX_TEXTURES = 512;

    private _textures: Map<string, RenderTexture> = new Map();
    private _coloredTextures: Map<string, RenderTexture> = new Map();
    private _owned: WeakSet<RenderTexture> = new WeakSet();
    private _rasterizerIds: WeakMap<IPlaneRasterizer, number> = new WeakMap();
    private _nextRasterizerId = 0;

    /** A number per rasterizer, for the key: two rooms' floor rasterizers draw differently. */
    public getRasterizerId(rasterizer: IPlaneRasterizer): number {
        let id = this._rasterizerIds.get(rasterizer);

        if (id === undefined) {
            id = this._nextRasterizerId++;

            this._rasterizerIds.set(rasterizer, id);
        }

        return id;
    }

    public get(key: string): RenderTexture | undefined {
        const texture = this._textures.get(key);

        if (texture?.destroyed) {
            this._textures.delete(key);

            return undefined;
        }

        return texture;
    }

    /** Takes over `texture` for `key`, unless the cache is full or already holds one. */
    public add(key: string, texture: RenderTexture): boolean {
        if (texture.destroyed || this._textures.has(key) || (this._textures.size >= PlaneTextureCache.MAX_TEXTURES)) return false;

        this._textures.set(key, texture);
        this._owned.add(texture);

        return true;
    }

    /** The tinted copy of a shared texture, made by `create` the first time it is asked for. */
    public getColored(key: string, color: number, create: () => RenderTexture): RenderTexture {
        const coloredKey = `${key}|${color}`;
        let texture = this._coloredTextures.get(coloredKey);

        if (!texture || texture.destroyed) {
            texture = create();

            this._coloredTextures.set(coloredKey, texture);
            this._owned.add(texture);
        }

        return texture;
    }

    public owns(texture: RenderTexture | undefined): boolean {
        return !!texture && this._owned.has(texture);
    }

    public get size(): number {
        return this._textures.size;
    }

    public dispose(): void {
        for (const texture of this._textures.values()) releasePlaneTarget(texture);
        for (const texture of this._coloredTextures.values()) releasePlaneCanvas(texture);

        this._textures.clear();
        this._coloredTextures.clear();
        this._owned = new WeakSet();
    }
}
