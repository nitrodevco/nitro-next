import { AlphaTolerance, IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { ColorMatrixFilter, Container, Filter, RenderTexture, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '#renderer/utils';

/** `PADDING`: room round the silhouette for the glow. */
const PADDING = 32;
/** `DEPTH_EPSILON`: the composite sits just behind (or, for an avatar, in front of) its layers. */
const DEPTH_EPSILON = 0.0005;
const SPRITE_TAG = 'wired_highlight';

interface ISourceState {
    sprite: IRoomObjectSprite;
    texture: Texture;
    offsetX: number;
    offsetY: number;
    flipH: boolean;
    flipV: boolean;
}

/**
 * Port of Flash `room/object/visualization/furniture/FurnitureHighlightComposite` (WIN63-202610201032): a WIRED
 * Set Highlight glow (Outline, Soft glow, Neon aura) drawn round the union of an object's visible layers, so that
 * overlapping layers get one outline instead of one each. The layers are drawn into one opaque silhouette
 * (Flash `threshold(> 0)`), each glow filter is drawn from it in knockout mode, and the result is the one extra
 * sprite the visualization reserves for it. The silhouette is only rebuilt when a layer's asset, offset or flip changed.
 */
export class FurnitureHighlightComposite {
    private static _silhouetteFilter: ColorMatrixFilter | undefined = undefined;

    private _silhouette: RenderTexture | undefined = undefined;
    private _rendered: RenderTexture | undefined = undefined;
    private _sourceStates: ISourceState[] = [];
    private _filters: Filter[] | undefined = undefined;
    private _offsetX: number = 0;
    private _offsetY: number = 0;

    /** Every pixel with any alpha becomes opaque black - Flash's `threshold(rect, ">", 0, 0xFF000000)`. */
    private static get silhouetteFilter(): ColorMatrixFilter {
        if (!FurnitureHighlightComposite._silhouetteFilter) {
            const filter = new ColorMatrixFilter();

            filter.matrix = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0 ];

            FurnitureHighlightComposite._silhouetteFilter = filter;
        }

        return FurnitureHighlightComposite._silhouetteFilter;
    }

    /**
     * `update`: `sources` are the visible layers, `alpha` the object's alpha (0-255), `inFront` puts the composite
     * in front of the layers instead of behind them, `forceRebuild` redraws the silhouette (an animation frame).
     */
    public update(sprite: IRoomObjectSprite, sources: IRoomObjectSprite[], filters: Filter[] | undefined, alpha: number, type: string, direction: number, inFront: boolean, forceRebuild: boolean): void {
        FurnitureHighlightComposite.applySpriteDefaults(sprite, type, direction);

        if (!filters || !filters.length) {
            this.clear(sprite, false);

            return;
        }

        if (!sources.length || alpha <= 0) {
            sprite.visible = false;
            sprite.alpha = 0;

            return;
        }

        const rebuild = forceRebuild || this.sourcesChanged(sources);

        if (rebuild) this.rebuildSilhouette(sources);

        if (!this._silhouette) {
            this.clear(sprite, false);

            return;
        }

        if (rebuild || filters !== this._filters || !this._rendered) {
            this.renderFilters(filters);
            this._filters = filters;
        }

        if (sprite.texture !== this._rendered) sprite.texture = this._rendered!;
        sprite.offsetX = this._offsetX;
        sprite.offsetY = this._offsetY;
        sprite.relativeDepth = FurnitureHighlightComposite.getCompositeDepth(sources, inFront);
        sprite.alpha = alpha;
        sprite.visible = true;
    }

    /** `clear`: hides the sprite; `disposeTextures` also lets go of the drawn textures. */
    public clear(sprite: IRoomObjectSprite | undefined, disposeTextures: boolean): void {
        if (sprite) {
            sprite.visible = false;
            sprite.alpha = 0;
            if (sprite.texture !== Texture.EMPTY) sprite.texture = Texture.EMPTY;
        }

        this._filters = undefined;

        if (disposeTextures) this.disposeTextures();
    }

    public dispose(): void {
        this.disposeTextures();
    }

    private static applySpriteDefaults(sprite: IRoomObjectSprite, type: string, direction: number): void {
        sprite.type = type;
        sprite.libraryAssetName = '';
        sprite.posture = undefined;
        sprite.tag = SPRITE_TAG;
        sprite.color = 0xFFFFFF;
        sprite.blendMode = 'normal';
        if (sprite.filters.length) sprite.filters = [];
        sprite.flipH = false;
        sprite.flipV = false;
        sprite.direction = direction;
        sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
        sprite.clickHandling = false;
        sprite.skipMouseHandling = true;
        sprite.varyingDepth = false;
    }

    private sourcesChanged(sources: IRoomObjectSprite[]): boolean {
        if (this._sourceStates.length !== sources.length) return true;

        for (let index = 0; index < sources.length; index++) {
            const source = sources[index];
            const state = this._sourceStates[index];

            if (state.sprite !== source || state.texture !== source.texture || state.offsetX !== source.offsetX || state.offsetY !== source.offsetY || state.flipH !== source.flipH || state.flipV !== source.flipV) return true;
        }

        return false;
    }

    /**
     * A mirrored sprite is drawn mirrored in place and reaches back from its offset (`RoomSpriteCanvas`), where Flash
     * drew a mirrored copy from it; the silhouette draws the layers the way the canvas does.
     */
    private static getLeft(source: IRoomObjectSprite): number {
        return source.flipH ? (source.offsetX - source.texture.width) : source.offsetX;
    }

    private static getTop(source: IRoomObjectSprite): number {
        return source.flipV ? (source.offsetY - source.texture.height) : source.offsetY;
    }

    private rebuildSilhouette(sources: IRoomObjectSprite[]): void {
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (const source of sources) {
            const left = FurnitureHighlightComposite.getLeft(source);
            const top = FurnitureHighlightComposite.getTop(source);

            minX = Math.min(minX, left);
            minY = Math.min(minY, top);
            maxX = Math.max(maxX, left + source.texture.width);
            maxY = Math.max(maxY, top + source.texture.height);
        }

        const width = Math.max(1, Math.ceil(maxX - minX + PADDING * 2));
        const height = Math.max(1, Math.ceil(maxY - minY + PADDING * 2));

        this.ensureTextureSize(width, height);

        const container = new Container();

        for (const source of sources) {
            const layer = new Sprite(source.texture);

            layer.scale.set(source.flipH ? -1 : 1, source.flipV ? -1 : 1);
            layer.x = source.offsetX - minX + PADDING;
            layer.y = source.offsetY - minY + PADDING;

            container.addChild(layer);
        }

        container.filters = [ FurnitureHighlightComposite.silhouetteFilter ];

        TextureUtils.writeToTexture(container, this._silhouette!, true);

        container.destroy({ children: true });

        this._offsetX = minX - PADDING;
        this._offsetY = minY - PADDING;
        this._sourceStates = sources.map(source => ({ sprite: source, texture: source.texture, offsetX: source.offsetX, offsetY: source.offsetY, flipH: source.flipH, flipV: source.flipV }));
    }

    private ensureTextureSize(width: number, height: number): void {
        if (this._silhouette && this._silhouette.width === width && this._silhouette.height === height) return;

        this.disposeTextures();

        this._silhouette = RenderTexture.create({ width, height });
        this._rendered = RenderTexture.create({ width, height });
    }

    /** `renderFilters`: each filter is drawn from the silhouette on its own, over the ones before it. */
    private renderFilters(filters: Filter[]): void {
        if (!this._silhouette || !this._rendered) return;

        filters.forEach((filter, index) => {
            const layer = new Sprite(this._silhouette);

            layer.filters = [ filter ];

            TextureUtils.writeToTexture(layer, this._rendered!, index === 0);

            layer.destroy();
        });
    }

    private static getCompositeDepth(sources: IRoomObjectSprite[], inFront: boolean): number {
        let depth = sources[0].relativeDepth;

        for (const source of sources) depth = inFront ? Math.min(depth, source.relativeDepth) : Math.max(depth, source.relativeDepth);

        return depth + (inFront ? -DEPTH_EPSILON : DEPTH_EPSILON);
    }

    private disposeTextures(): void {
        if (this._silhouette) TextureUtils.destroyTexture(this._silhouette);
        if (this._rendered) TextureUtils.destroyTexture(this._rendered);

        this._silhouette = undefined;
        this._rendered = undefined;
        this._sourceStates = [];
    }
}
