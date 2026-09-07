import { Point, Rectangle, Texture } from 'pixi.js';

import { ChatStyleDefinition } from './ChatStyleDefinitions';

/** What a chat bubble needs from its style - the Flash `IChatStyleInternal` + `IChatStyle` pair. */
export interface IChatStyle {
    readonly id: number;
    readonly assetId: string;
    readonly isSystemStyle: boolean;
    readonly isHcOnly: boolean;
    readonly isAmbassadorOnly: boolean;
    readonly isStaffOverrideable: boolean;
    readonly minRankRequired: number;
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
    /** Where the speaker's head (or `iconTexture`) is centred; `undefined` when the style shows no face. */
    readonly faceOffset: Point | undefined;
    /** A style-provided picture that replaces the speaker's head (bot bubbles, notifications). */
    readonly iconTexture: Texture | undefined;
    readonly selectorPreviewTexture: Texture | undefined;
    /** The bitmap the background nine-slice is cut from; `color` tints the colour layer where the style has one. */
    getBackgroundTexture(color?: number): Texture;
    /** The nine-slice borders (`9sliceXY` / `9sliceWH`) for `getBackgroundTexture`. */
    readonly nineSliceBorders: ChatStyleNineSliceBorders;
}

export interface ChatStyleNineSliceBorders {
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

interface ChatStyleTextures {
    base: Texture;
    pointer?: Texture;
    color?: Texture;
    selectorPreview?: Texture;
    icon?: Texture;
}

const toRectangle = (rect: { x: number; y: number; width: number; height: number }) => new Rectangle(rect.x, rect.y, rect.width, rect.height);

/** `0xRRGGBB` -> `#rrggbb`. */
const toCssColor = (color: number): string => `#${(color & 0xffffff).toString(16).padStart(6, '0')}`;

/** The drawable behind a Pixi texture, for the canvas compositing `createBackground` does. */
const toCanvasImageSource = (texture: Texture): CanvasImageSource | undefined => {
    const resource = (texture.source as { resource?: unknown }).resource;

    if (!resource) return undefined;

    return resource as CanvasImageSource;
};

/**
 * One entry of the Flash `ChatStyleLibrary`: the style's bitmaps plus the regpoints that say how
 * they fit together. `getBackgroundTexture` reproduces `ChatStyle.createBackground(color)`: with a
 * `chat_bubble_color` layer, that bitmap is colour-transformed to the speaker's chest colour and
 * DARKEN-blended onto a copy of the base at `colorXY`; `nineSliceBorders` says how the result is
 * nine-sliced along the one-pixel `9slice` grid. Tinted results are cached per colour - a room full of people wearing
 * the same shirt composes the bitmap once.
 */
export class ChatStyle implements IChatStyle {
    private readonly _definition: ChatStyleDefinition;
    private readonly _textures: ChatStyleTextures;
    private readonly _textFieldMargins: Rectangle;
    private readonly _overlap: Rectangle;
    private readonly _faceOffset: Point | undefined;
    private readonly _tintedBackgrounds: Map<number, Texture> = new Map();

    constructor(definition: ChatStyleDefinition, textures: ChatStyleTextures) {
        this._definition = definition;
        this._textures = textures;
        this._textFieldMargins = toRectangle(definition.regPoints.textFieldMargins);
        this._overlap = toRectangle(definition.regPoints.overlapRect);
        this._faceOffset = definition.regPoints.faceXY ? new Point(definition.regPoints.faceXY.x, definition.regPoints.faceXY.y) : undefined;
    }

    public dispose(): void {
        for (const texture of this._tintedBackgrounds.values()) texture.destroy(true);

        this._tintedBackgrounds.clear();
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
        return this._definition.systemStyle;
    }

    public get isHcOnly(): boolean {
        return this._definition.hcOnly;
    }

    public get isAmbassadorOnly(): boolean {
        return this._definition.ambassadorOnly;
    }

    public get isStaffOverrideable(): boolean {
        return this._definition.staffOverrideable;
    }

    public get minRankRequired(): number {
        return this._definition.minRankRequired;
    }

    public get allowHTML(): boolean {
        return this._definition.allowHTML;
    }

    public get isAnonymous(): boolean {
        return this._definition.regPoints.anonymous ?? false;
    }

    public get textColor(): number {
        return this._definition.regPoints.textColorRGB;
    }

    public get linkColor(): number {
        return this._definition.regPoints.linkColorRGB ?? this._definition.regPoints.textColorRGB;
    }

    public get fontFace(): string {
        return this._definition.regPoints.fontFace;
    }

    public get fontSize(): number {
        return this._definition.regPoints.fontSize;
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
        return this._textures.base.height - (this._definition.regPoints.pointerY ?? this._textures.base.height);
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

    public get baseTexture(): Texture {
        return this._textures.base;
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

        if (cached) return cached;

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

        const at = this._definition.regPoints.colorXY ?? { x: 0, y: 0 };

        ctx.globalCompositeOperation = 'darken';
        ctx.drawImage(tinted, at.x, at.y);
        ctx.globalCompositeOperation = 'source-over';

        const texture = Texture.from(canvas);

        texture.source.scaleMode = 'nearest';
        texture.label = `chat style ${this._definition.assetId} #${key.toString(16)}`;

        this._tintedBackgrounds.set(key, texture);

        return texture;
    }
}
