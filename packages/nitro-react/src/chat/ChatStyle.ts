import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Point, Rectangle, Texture } from 'pixi.js';

import { ChatStyleDefinition } from './ChatStyleDefinitions';

/** Tinted backgrounds kept per style - past this the least recently used colour is rebuilt on demand. */
const MAX_TINTED_BACKGROUNDS = 32;

/** What a chat bubble needs from its style - the Flash `IChatStyle` + `IChatStyleInternal` pair. */
export interface IChatStyle {
    readonly id: number;
    readonly assetId: string;
    readonly isSystemStyle: boolean;
    readonly isPurchasable: boolean;
    readonly isHcOnly: boolean;
    readonly isAmbassadorOnly: boolean;
    readonly isStaffOverrideable: boolean;
    /** `[b]` / `[red]` ... markup is applied, and the icon is centred on the bubble's height. */
    readonly isNotification: boolean;
    readonly allowHTML: boolean;
    /** No name prefix, no pointer, and clicking the bubble does nothing. */
    readonly isAnonymous: boolean;
    readonly textColor: number;
    readonly linkColor: number;
    readonly fontFace: string;
    readonly fontSize: number;
    /** Left / top / right / bottom padding around the text (Flash stored them as a Rectangle's x/y/width/height). */
    readonly textFieldMargins: Rectangle;
    /** How far neighbours may overlap this bubble's art (left / top / right / bottom, same encoding). */
    readonly overlap: Rectangle;
    readonly pointerTexture: Texture | undefined;
    /** `base bitmap height - pointerY`: the pointer's top sits this far above the bubble's bottom edge. */
    readonly pointerOffsetY: number;
    /** `getPointerLeftMargin` - the style's own `pointerXMargins[0]`, else `fallback`. */
    getPointerLeftMargin(fallback: number): number;
    /** `getPointerRightMargin` - the style's own `pointerXMargins[1]`, else `fallback`. */
    getPointerRightMargin(fallback: number): number;
    /** Where the speaker's head (or `iconTexture`) is centred; `undefined` when the style shows no face. */
    readonly faceOffset: Point | undefined;
    /** A style-provided picture that replaces the speaker's head (bot bubbles, notifications). */
    readonly iconTexture: Texture | undefined;
    /** `getEmblem` - the badge drawn over the background (the staff hexagon's), its multi-line variant once the text wraps. */
    getEmblem(multiline: boolean): Texture | undefined;
    getEmblemOffset(multiline: boolean): Point | undefined;
    readonly selectorPreviewTexture: Texture | undefined;
    /** The bitmap the background nine-slice is cut from; `color` tints the colour layer where the style has one. */
    getBackgroundTexture(color?: number): Texture;
    /** The nine-slice borders (`9sliceXY` / `9sliceWH`) for `getBackgroundTexture`. */
    readonly nineSliceBorders: ChatStyleNineSliceBorders;
    /**
     * `usePixelPerfectNineSlice`: Flash's `ManualNineSliceSprite`, whose size is rounded to whole
     * pixels and never smaller than its fixed borders. The port draws every style with a
     * nearest-neighbour `NineSliceSprite`, which is what that class does; the flag adds its sizing.
     */
    readonly usePixelPerfectNineSlice: boolean;
}

export interface ChatStyleNineSliceBorders {
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

export interface ChatStyleTextures {
    base: Texture;
    pointer?: Texture;
    color?: Texture;
    selectorPreview?: Texture;
    icon?: Texture;
    emblem?: Texture;
    emblemMultiline?: Texture;
}

const toRectangle = (rect: { x: number; y: number; width: number; height: number }) => new Rectangle(rect.x, rect.y, rect.width, rect.height);

const toPoint = (point: { x: number; y: number } | undefined) => (point ? new Point(point.x, point.y) : undefined);

/** `ChatStyleLibrary.initializeStyleFromAssets`'s defaults for the keys a regpoints file may leave out. */
const DEFAULT_TEXT_COLOR = 0;
const DEFAULT_FONT_FACE = 'Volter';
const DEFAULT_FONT_SIZE = 9;

/** `0xRRGGBB` -> `#rrggbb`. */
const toCssColor = (color: number): string => `#${(color & 0xffffff).toString(16).padStart(6, '0')}`;

/** The drawable behind a Pixi texture, for the canvas compositing `createBackground` does. */
const toCanvasImageSource = (texture: Texture): CanvasImageSource | undefined => {
    const resource = (texture.source as { resource?: unknown }).resource;

    if (!resource) return undefined;

    return resource as CanvasImageSource;
};

/**
 * One entry of the Flash `ChatStyleLibrary` - a port of `ChatStyle`: the style's bitmaps plus the
 * regpoints that say how they fit together (pointer row and x margins, face, emblems, text
 * margins, font) and the `chatstyles_xml` flags. `getBackgroundTexture` reproduces
 * `ChatStyle.getNewBackgroundSprite(color)`: with a `chat_bubble_color` layer, that bitmap is
 * colour-transformed to the speaker's chest colour and DARKEN-blended onto a copy of the base;
 * `nineSliceBorders` says how the result is nine-sliced along the `9slice` grid. Tinted results are kept per colour in the
 * `AssetManager` (`chat:style:<asset>|<colour>`), most recent `MAX_TINTED_BACKGROUNDS` colours
 * - a room full of people wearing the same shirt composes the bitmap once, and a parade of
 * colours doesn't accumulate a texture each.
 */
export class ChatStyle implements IChatStyle {
    private readonly _definition: ChatStyleDefinition;
    private readonly _textures: ChatStyleTextures;
    private readonly _textFieldMargins: Rectangle;
    private readonly _overlap: Rectangle;
    private readonly _faceOffset: Point | undefined;
    private readonly _emblemOffset: Point | undefined;
    private readonly _emblemMultilineOffset: Point | undefined;
    private readonly _tintedBackgrounds: Map<number, Texture> = new Map();

    constructor(definition: ChatStyleDefinition, textures: ChatStyleTextures) {
        this._definition = definition;
        this._textures = textures;
        const { textFieldMargins, overlapRect, faceXY, emblemXY, emblemMultilineXY } = definition.regPoints;

        this._textFieldMargins = toRectangle(textFieldMargins);
        // Flash leaves a style without `overlapRect` at `null`, which every reader takes as no overlap.
        this._overlap = overlapRect ? toRectangle(overlapRect) : new Rectangle(0, 0, 0, 0);
        this._faceOffset = toPoint(faceXY);
        // An emblem needs both its regpoint and its bitmap (`hasConfig(...) && hasAsset(...)`).
        this._emblemOffset = textures.emblem ? toPoint(emblemXY) : undefined;
        this._emblemMultilineOffset = textures.emblemMultiline ? toPoint(emblemMultilineXY) : undefined;
    }

    public dispose(): void {
        for (const key of this._tintedBackgrounds.keys()) this.evictTintedBackground(key);
    }

    private tintedBackgroundKey(color: number): string {
        return `chat:style:${this._definition.assetId}|${color.toString(16).padStart(6, '0')}`;
    }

    private evictTintedBackground(color: number): void {
        const texture = this._tintedBackgrounds.get(color);

        if (!texture) return;

        this._tintedBackgrounds.delete(color);
        GetAssetManager().removeTexture(this.tintedBackgroundKey(color));
        texture.destroy(true);
    }

    public get id(): number {
        return this._definition.id;
    }

    public get assetId(): string {
        return this._definition.assetId;
    }

    public get definition(): ChatStyleDefinition {
        return this._definition;
    }

    public get isSystemStyle(): boolean {
        return this._definition.flags.systemStyle ?? false;
    }

    public get isPurchasable(): boolean {
        return this._definition.flags.purchasable ?? false;
    }

    public get isHcOnly(): boolean {
        return this._definition.flags.hcOnly ?? false;
    }

    public get isAmbassadorOnly(): boolean {
        return this._definition.flags.ambassadorOnly ?? false;
    }

    public get isStaffOverrideable(): boolean {
        return this._definition.flags.staffOverrideable ?? false;
    }

    public get isNotification(): boolean {
        return this._definition.flags.notification ?? false;
    }

    public get allowHTML(): boolean {
        return this._definition.flags.allowHTML ?? false;
    }

    public get isAnonymous(): boolean {
        return this._definition.regPoints.anonymous ?? false;
    }

    public get textColor(): number {
        return this._definition.regPoints.textColorRGB ?? DEFAULT_TEXT_COLOR;
    }

    public get linkColor(): number {
        return this._definition.regPoints.linkColorRGB ?? this.textColor;
    }

    public get fontFace(): string {
        return this._definition.regPoints.fontFace ?? DEFAULT_FONT_FACE;
    }

    public get fontSize(): number {
        return this._definition.regPoints.fontSize ?? DEFAULT_FONT_SIZE;
    }

    public get usePixelPerfectNineSlice(): boolean {
        return this._definition.regPoints.usePixelPerfectNineSlice ?? false;
    }

    public get textFieldMargins(): Rectangle {
        return this._textFieldMargins;
    }

    public get overlap(): Rectangle {
        return this._overlap;
    }

    public get pointerTexture(): Texture | undefined {
        return this.isAnonymous ? undefined : this._textures.pointer;
    }

    public get pointerOffsetY(): number {
        return this._textures.base.height - (this._definition.regPoints.pointerY ?? 0);
    }

    public getPointerLeftMargin(fallback: number): number {
        const margins = this._definition.regPoints.pointerXMargins;

        return (margins && (margins.length >= 1)) ? margins[0] : fallback;
    }

    public getPointerRightMargin(fallback: number): number {
        const margins = this._definition.regPoints.pointerXMargins;

        return (margins && (margins.length >= 2)) ? margins[1] : fallback;
    }

    public getEmblem(multiline: boolean): Texture | undefined {
        if (multiline && this._emblemMultilineOffset) return this._textures.emblemMultiline;

        return this._emblemOffset ? this._textures.emblem : undefined;
    }

    public getEmblemOffset(multiline: boolean): Point | undefined {
        if (multiline && this._emblemMultilineOffset) return this._emblemMultilineOffset;

        return this._emblemOffset;
    }

    /** Every bitmap the style owns, for the library's one-time `nearest` pass. */
    public get textures(): Texture[] {
        const { base, pointer, color, selectorPreview, icon, emblem, emblemMultiline } = this._textures;

        return [ base, pointer, color, selectorPreview, icon, emblem, emblemMultiline ].filter((texture): texture is Texture => !!texture);
    }

    public get faceOffset(): Point | undefined {
        return this._faceOffset;
    }

    public get iconTexture(): Texture | undefined {
        return this._textures.icon;
    }

    public get selectorPreviewTexture(): Texture | undefined {
        return this._textures.selectorPreview;
    }

    public get nineSliceBorders(): ChatStyleNineSliceBorders {
        const grid = this._definition.regPoints.scale9;
        const texture = this._textures.base;

        return {
            leftWidth: grid.x,
            topHeight: grid.y,
            rightWidth: Math.max(0, texture.width - (grid.x + grid.width)),
            bottomHeight: Math.max(0, texture.height - (grid.y + grid.height)),
        };
    }

    public getBackgroundTexture(color: number = 0xffffff): Texture {
        const colorLayer = this._textures.color;

        if (!colorLayer) return this._textures.base;

        const key = color & 0xffffff;
        const cached = this._tintedBackgrounds.get(key);

        if (cached) {
            // Insertion order doubles as recency.
            this._tintedBackgrounds.delete(key);
            this._tintedBackgrounds.set(key, cached);

            return cached;
        }

        const base = toCanvasImageSource(this._textures.base);
        const overlay = toCanvasImageSource(colorLayer);

        if (!base || !overlay) return this._textures.base;

        const width = this._textures.base.width;
        const height = this._textures.base.height;
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) return this._textures.base;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(base, 0, 0);

        // Flash: `draw(colorBitmap, null, ColorTransform(r, g, b), BlendMode.DARKEN)` - the colour
        // bitmap multiplied by the colour, keeping its own alpha, darkened onto the base copy.
        const tinted = document.createElement('canvas');

        tinted.width = colorLayer.width;
        tinted.height = colorLayer.height;

        const tintCtx = tinted.getContext('2d');

        if (!tintCtx) return this._textures.base;

        tintCtx.imageSmoothingEnabled = false;
        tintCtx.drawImage(overlay, 0, 0);
        tintCtx.globalCompositeOperation = 'multiply';
        tintCtx.fillStyle = toCssColor(key);
        tintCtx.fillRect(0, 0, tinted.width, tinted.height);
        tintCtx.globalCompositeOperation = 'destination-in';
        tintCtx.drawImage(overlay, 0, 0);

        // Flash's `draw` passes no matrix: the layer lands at 0,0 whatever `colorXY` says (the
        // library reads it into the style and nothing reads it back).
        ctx.globalCompositeOperation = 'darken';
        ctx.drawImage(tinted, 0, 0);
        ctx.globalCompositeOperation = 'source-over';

        // Owned here (not by Pixi's global `Cache`), registered with the asset manager.
        const texture = Texture.from(canvas, true);

        texture.source.scaleMode = 'nearest';
        GetAssetManager().setTexture(this.tintedBackgroundKey(key), texture);
        this._tintedBackgrounds.set(key, texture);

        while (this._tintedBackgrounds.size > MAX_TINTED_BACKGROUNDS) {
            const oldest = this._tintedBackgrounds.keys().next().value;

            if (oldest === undefined) break;

            this.evictTintedBackground(oldest);
        }

        return texture;
    }
}
