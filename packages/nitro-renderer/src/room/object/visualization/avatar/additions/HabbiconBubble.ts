import { AvatarActionStateType } from '@nitrodevco/nitro-api';

import { flashBlurPixels, GetTickerTime } from '#renderer/utils';

import { IStackedAddition } from '../../stacked/IStackedAddition';
import { StackedAdditionSprite } from '../../stacked/StackedAdditionSprite';
import { createTransparentBitmap, getBitmapContext, VariableFxBitmap } from '../../variablefx/rendering/VariableFxBitmap';
import { AvatarVisualization } from '../AvatarVisualization';
import { HabbiconAnimationStep, HabbiconAssetManager, HabbiconRuntimeAsset } from './HabbiconAssetManager';

const DEFAULT_VISIBLE_DURATION_MS = 3000;
const INTRO_DURATION_MS = 180;
const INTRO_START_OFFSET_Y = 12;
const FADE_IN_DURATION_MS = 150;
const FADE_OUT_DURATION_MS = 350;
const BACKGROUND_VISIBLE_DURATION_MS = 3350;
const BACKGROUND_FADE_OUT_DURATION_MS = 530;
const ROOM_LARGE_OFFSET_X = -20;
const ROOM_LARGE_OFFSET_Y = -126;
const ROOM_SMALL_OFFSET_X = -10;
const ROOM_SMALL_OFFSET_Y = -65;
const DEFAULT_RELATIVE_DEPTH = -0.2;
/** The white outline's width. */
const OUTLINE_SIZE = 2;
const BACKGROUND_SHADOW_PADDING = 5;
const BACKGROUND_CONTENT_INSET = 7;
const BACKGROUND_SHADOW_OFFSET_X = 1.5;
const BACKGROUND_SHADOW_OFFSET_Y = 2;
/** `BlurFilter(6, 6, 2)`. */
const BACKGROUND_SHADOW_BLUR = 6;
const BACKGROUND_SHADOW_BLUR_QUALITY = 2;
/** `ColorTransform(1, 1, 1, 0.55)`'s alpha, as Flash holds a colour transform's multiplier: 8.8 fixed point. */
const BACKGROUND_SHADOW_ALPHA_FIXED = Math.trunc(0.55 * 256);
/** `scale < 48`: the small room. */
const SMALL_SCALE_LIMIT = 48;
/** The avatar heights `update` raises a sitting (half) or lying (whole) avatar's bubble by. */
const LARGE_AVATAR_HEIGHT = 64;
const SMALL_AVATAR_HEIGHT = 32;
/** `createBitmap`'s placeholder sizes, when there is no picture at all. */
const PLACEHOLDER_SIZE_LARGE = 40;
const PLACEHOLDER_SIZE_SMALL = 20;

const OUTLINE_CACHE: Map<string, VariableFxBitmap> = new Map();
const MIRROR_CACHE: Map<string, VariableFxBitmap> = new Map();
const SHADOW_CACHE: Map<string, VariableFxBitmap> = new Map();

/** `createMirroredBitmap`. */
const createMirroredBitmap = (source: VariableFxBitmap): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(source.width, source.height);
    const context = getBitmapContext(bitmap);

    context.translate(source.width, 0);
    context.scale(-1, 1);
    context.drawImage(source, 0, 0);

    return bitmap;
};

/** The picture's shape in one colour: `copyChannel` of its alpha onto a solid fill. */
const createSilhouette = (source: VariableFxBitmap, color: string): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(source.width, source.height);
    const context = getBitmapContext(bitmap);

    context.drawImage(source, 0, 0);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = color;
    context.fillRect(0, 0, bitmap.width, bitmap.height);

    return bitmap;
};

/** `createOutlineBitmap`: the white silhouette stamped at every offset within 2 pixels. */
const createOutlineBitmap = (source: VariableFxBitmap): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(source.width + (OUTLINE_SIZE * 2), source.height + (OUTLINE_SIZE * 2));
    const context = getBitmapContext(bitmap);
    const white = createSilhouette(source, '#ffffff');

    for (let y = -OUTLINE_SIZE; y <= OUTLINE_SIZE; y++) {
        for (let x = -OUTLINE_SIZE; x <= OUTLINE_SIZE; x++) {
            if ((x === 0) && (y === 0)) continue;

            context.drawImage(white, OUTLINE_SIZE + x, OUTLINE_SIZE + y);
        }
    }

    return bitmap;
};

/**
 * `createBackgroundShadowBitmap`: the outline's black silhouette `copyPixels`ed to (6.5, 7) - a pixel
 * copy, so on whole pixels at (6, 7) -, its alpha at 55% (`colorTransform`) and Flash's
 * `BlurFilter(6, 6, 2)` over it, cut to the bitmap.
 */
const createBackgroundShadowBitmap = (outline: VariableFxBitmap): VariableFxBitmap => {
    const bitmap = createTransparentBitmap(outline.width + (BACKGROUND_SHADOW_PADDING * 2), outline.height + (BACKGROUND_SHADOW_PADDING * 2));
    const context = getBitmapContext(bitmap);

    context.drawImage(createSilhouette(outline, '#000000'), Math.trunc(BACKGROUND_SHADOW_PADDING + BACKGROUND_SHADOW_OFFSET_X), Math.trunc(BACKGROUND_SHADOW_PADDING + BACKGROUND_SHADOW_OFFSET_Y));

    const image = context.getImageData(0, 0, bitmap.width, bitmap.height);

    // black is the same premultiplied or not, so the alpha is all there is to scale and blur
    for (let i = 3; i < image.data.length; i += 4) image.data[i] = (image.data[i] * BACKGROUND_SHADOW_ALPHA_FIXED) >> 8;

    flashBlurPixels(image.data, bitmap.width, bitmap.height, BACKGROUND_SHADOW_BLUR, BACKGROUND_SHADOW_BLUR, BACKGROUND_SHADOW_BLUR_QUALITY);
    context.putImageData(image, 0, 0);

    return bitmap;
};

const cached = (cache: Map<string, VariableFxBitmap>, key: string, create: () => VariableFxBitmap): VariableFxBitmap => {
    let bitmap = cache.get(key);

    if (!bitmap) {
        bitmap = create();
        cache.set(key, bitmap);
    }

    return bitmap;
};

/** `drawBitmapLayer`: nothing at no alpha, else the layer at its alpha. */
const drawBitmapLayer = (context: CanvasRenderingContext2D, layer: VariableFxBitmap, x: number, y: number, alpha: number): void => {
    if (alpha <= 0) return;

    context.globalAlpha = Math.min(255, alpha) / 255;
    context.drawImage(layer, x, y);
    context.globalAlpha = 1;
};

/** `seededColor`: the placeholder's border colour. */
const seededColor = (seed: number): string => {
    switch (seed % 6) {
        case 0: return '#f9cf2f';
        case 1: return '#f39a2f';
        case 2: return '#ef7e2f';
        case 3: return '#8ecb3f';
        case 4: return '#4dc0e8';
        default: return '#c383f5';
    }
};

/**
 * The habbicon over an avatar - Flash's `HabbiconBubble`, an `IStackedAvatarAddition` in the
 * avatar's stack on the habbicon layer. It plays its picture (or its frames, once its animated
 * sheet is in) over a white 2 px outline and a soft shadow: the picture fades in over 150 ms while
 * the bubble rises 12 px over 180 ms, shows for 3 s and fades out over 350 ms; the outline and
 * shadow stay until 3350 ms and fade over 530 ms, and the bubble hides once both are gone. It is
 * mirrored when the habbicon faces one way and the avatar the other. Out of a stack it sits at
 * (-20, -126) - (-10, -65) in the small room - raised for a sitting or lying avatar.
 *
 * It never finishes on its own: the avatar's logic clears `figure_habbicon` after 6 s, and the
 * visualization takes it out of the stack then.
 */
export class HabbiconBubble implements IStackedAddition {
    private _id: number;
    private _habbiconId: number;
    private _triggerSequence: number;
    private _visualization: AvatarVisualization | undefined;
    private _scale: number = 0;
    private _bitmap: VariableFxBitmap | undefined = undefined;
    private _bitmapIsShared: boolean = false;
    private _hasBackground: boolean = false;
    private _runtimeAsset: HabbiconRuntimeAsset | undefined = undefined;
    private _animated: boolean = false;
    private _startTime: number = 0;
    private _sourceFadeStart: number = 0;
    private _endTime: number = 0;
    private _sourceEnd: number = 0;
    private _backgroundFadeStart: number = 0;
    private _backgroundEnd: number = 0;
    private _frameIndex: number = -1;
    private _lastSourceAlpha: number = -1;
    private _lastBackgroundAlpha: number = -1;
    private _initialized: boolean = false;
    private _expired: boolean = false;
    private _mirrorResolved: boolean = false;
    private _mirror: boolean = false;
    private _isPartOfStack: boolean = false;
    private _relativeDepth: number = DEFAULT_RELATIVE_DEPTH;

    constructor(id: number, habbiconId: number, triggerSequence: number, visualization: AvatarVisualization) {
        this._id = id;
        this._habbiconId = habbiconId;
        this._triggerSequence = triggerSequence;
        this._visualization = visualization;
    }

    public get id(): number {
        return this._id;
    }

    public get habbiconId(): number {
        return this._habbiconId;
    }

    public get triggerSequence(): number {
        return this._triggerSequence;
    }

    public get disposed(): boolean {
        return !this._visualization;
    }

    public set relativeDepth(depth: number) {
        this._relativeDepth = depth;
    }

    public get isPartOfStack(): boolean {
        return this._isPartOfStack;
    }

    public set isPartOfStack(flag: boolean) {
        this._isPartOfStack = flag;
    }

    public get contributesToStackLayout(): boolean {
        return true;
    }

    public get invisible(): boolean {
        return false;
    }

    public get isFinished(): boolean {
        return false;
    }

    public get requiresAnimationTick(): boolean {
        return true;
    }

    public dispose(): void {
        this._bitmap = undefined;
        this._runtimeAsset = undefined;
        this._visualization = undefined;
    }

    public update(sprite: StackedAdditionSprite, scale: number): void {
        if (!sprite) return;

        const now = GetTickerTime();

        if (this._expired || ((this._endTime > 0) && (now >= this._endTime))) {
            this._expired = true;
            sprite.alpha = 0;
            sprite.visible = false;

            return;
        }

        this._scale = scale;

        const first = !this._initialized;

        if (first) {
            this._runtimeAsset = HabbiconAssetManager.getRuntimeAsset(this._habbiconId);
            this._animated = !!this._runtimeAsset?.animated;
            this._startTime = now;
            this._frameIndex = this.resolveFrameIndex(0);
            this.configureTiming();
            this.applyFrame(this.resolveBitmap(scale, this.resolveAlpha(now), this.resolveBackgroundAlpha(now)));
            this._initialized = true;
        }

        sprite.bitmap = this._bitmap;
        sprite.offsetX = ((scale < SMALL_SCALE_LIMIT) ? ROOM_SMALL_OFFSET_X : ROOM_LARGE_OFFSET_X) + this.resolveFrameAnchorCompensationX();
        sprite.offsetY = this.resolveBaseOffsetY() + this.getIntroOffsetY(now - this._startTime) + this.resolveStackAwareFrameAnchorCompensationY();
        sprite.relativeDepth = this._relativeDepth;

        if (first) {
            sprite.visible = true;
            sprite.alpha = 255;
        }
    }

    public animate(sprite: StackedAdditionSprite): boolean {
        if (!sprite) return false;

        const now = GetTickerTime();
        const elapsed = now - this._startTime;
        let recompose = false;

        this._runtimeAsset = HabbiconAssetManager.getRuntimeAsset(this._habbiconId);

        if (this._runtimeAsset && (this._runtimeAsset.animated !== this._animated)) {
            this._animated = this._runtimeAsset.animated;
            this.configureTiming();
        }

        const frameIndex = this.resolveFrameIndex(elapsed);

        if (this._runtimeAsset && (frameIndex !== this._frameIndex)) {
            this._frameIndex = frameIndex;
            recompose = true;
        }

        const sourceAlpha = this.resolveAlpha(now);
        const backgroundAlpha = this.resolveBackgroundAlpha(now);

        if ((sourceAlpha !== this._lastSourceAlpha) || (backgroundAlpha !== this._lastBackgroundAlpha)) recompose = true;

        if (recompose) this.applyFrame(this.resolveBitmap(this._scale, sourceAlpha, backgroundAlpha));

        if (this._bitmap) sprite.bitmap = this._bitmap;

        sprite.relativeDepth = this._relativeDepth;
        sprite.offsetY = this.resolveBaseOffsetY() + this.getIntroOffsetY(elapsed) + this.resolveStackAwareFrameAnchorCompensationY();
        sprite.offsetX = ((this._scale < SMALL_SCALE_LIMIT) ? ROOM_SMALL_OFFSET_X : ROOM_LARGE_OFFSET_X) + this.resolveFrameAnchorCompensationX();

        if (now >= this._endTime) {
            this._expired = true;
            sprite.alpha = 0;
            sprite.visible = false;

            return true;
        }

        sprite.alpha = 255;
        sprite.visible = Math.max(sourceAlpha, backgroundAlpha) > 0;

        return true;
    }

    /** Out of a stack, the room's offset raised for a sitting (half) or lying (whole) avatar. */
    private resolveBaseOffsetY(): number {
        const small = this._scale < SMALL_SCALE_LIMIT;
        let offsetY = this._isPartOfStack ? 0 : (small ? ROOM_SMALL_OFFSET_Y : ROOM_LARGE_OFFSET_Y);

        if (this._isPartOfStack) return offsetY;

        const avatarHeight = small ? SMALL_AVATAR_HEIGHT : LARGE_AVATAR_HEIGHT;
        const posture = this._visualization?.posture;

        if (posture === AvatarActionStateType.Sit) offsetY += avatarHeight / 2;
        else if (posture === AvatarActionStateType.Lay) offsetY += avatarHeight;

        return offsetY;
    }

    private resolveBitmap(scale: number, sourceAlpha: number, backgroundAlpha: number): VariableFxBitmap {
        const small = scale < SMALL_SCALE_LIMIT;
        const placeholderSize = small ? PLACEHOLDER_SIZE_SMALL : PLACEHOLDER_SIZE_LARGE;
        let source: VariableFxBitmap | undefined = undefined;

        this._bitmapIsShared = false;
        this._hasBackground = false;

        const frames = this._runtimeAsset?.frames;

        if (frames && frames.length) {
            if ((this._frameIndex < 0) || (this._frameIndex >= frames.length)) this._frameIndex = 0;

            source = small ? frames[this._frameIndex].smallBitmap : frames[this._frameIndex].bitmap;
        } else {
            source = HabbiconAssetManager.getPreviewBitmap(this._habbiconId, small);
        }

        if (source) {
            this._hasBackground = true;
            this._lastSourceAlpha = sourceAlpha;
            this._lastBackgroundAlpha = backgroundAlpha;

            let key = this.createCacheKey(small);

            if (this.shouldMirror()) {
                key += ':mirrored';

                const unmirrored = source;

                source = cached(MIRROR_CACHE, key, () => createMirroredBitmap(unmirrored));
            }

            const picture = source;
            const outline = cached(OUTLINE_CACHE, key, () => createOutlineBitmap(picture));
            const shadow = cached(SHADOW_CACHE, key, () => createBackgroundShadowBitmap(outline));

            return this.composeBitmap(picture, outline, shadow, sourceAlpha, backgroundAlpha);
        }

        if (this._bitmap && !this._bitmapIsShared && (this._bitmap.width === placeholderSize)) return this._bitmap;

        return this.createPlaceholder(placeholderSize, seededColor(this._habbiconId * 37));
    }

    private applyFrame(bitmap: VariableFxBitmap): void {
        this._bitmap = bitmap;
    }

    /** `configureTiming`: the picture's fade-out start and end, the background's, and when the bubble hides. */
    private configureTiming(): void {
        const visibleDuration = Math.max(DEFAULT_VISIBLE_DURATION_MS, FADE_IN_DURATION_MS + FADE_OUT_DURATION_MS);
        const backgroundDuration = Math.max(BACKGROUND_VISIBLE_DURATION_MS, FADE_IN_DURATION_MS + BACKGROUND_FADE_OUT_DURATION_MS);

        this._sourceEnd = this._startTime + visibleDuration;
        this._sourceFadeStart = this._sourceEnd - FADE_OUT_DURATION_MS;
        this._backgroundEnd = this._startTime + backgroundDuration;
        this._backgroundFadeStart = this._backgroundEnd - BACKGROUND_FADE_OUT_DURATION_MS;
        this._endTime = Math.max(this._sourceEnd, this._backgroundEnd);
    }

    private resolveFrameIndex(elapsed: number): number {
        const frames = this._runtimeAsset?.frames;
        const step = this.getCurrentStep(elapsed);

        if (!frames || !frames.length || !step) return 0;

        return Math.max(0, Math.min(Math.trunc(step.sourceFrame), frames.length - 1));
    }

    private getCurrentStep(elapsed: number): HabbiconAnimationStep | undefined {
        const steps = this._runtimeAsset?.steps;

        if (!steps || !steps.length) return undefined;
        if (steps.length === 1) return steps[0];

        const total = steps.reduce((sum, step) => sum + Math.max(1, Math.trunc(step.durationMs)), 0);

        if (total <= 0) return steps[0];

        let time = elapsed;

        if (this._runtimeAsset?.animated) time %= total;
        else if (time >= total) return steps[steps.length - 1];

        let reached = 0;

        for (const step of steps) {
            reached += Math.max(1, Math.trunc(step.durationMs));

            if (time < reached) return step;
        }

        return steps[steps.length - 1];
    }

    private getIntroOffsetY(elapsed: number): number {
        const progress = Math.min(1, Math.max(0, elapsed / INTRO_DURATION_MS));

        return Math.trunc(Math.round((1 - progress) * INTRO_START_OFFSET_Y));
    }

    private resolveAlpha(time: number): number {
        const fadeIn = Math.min(1, Math.max(0, (time - this._startTime) / FADE_IN_DURATION_MS));
        const fadeOut = (time < this._sourceFadeStart) ? 1 : 1 - Math.min(1, Math.max(0, (time - this._sourceFadeStart) / FADE_OUT_DURATION_MS));

        if ((this._sourceEnd > 0) && (time >= this._sourceEnd)) return 0;

        return Math.trunc(Math.round(255 * Math.min(fadeIn, fadeOut)));
    }

    private resolveBackgroundAlpha(time: number): number {
        const fadeIn = Math.min(1, Math.max(0, (time - this._startTime) / FADE_IN_DURATION_MS));
        const fadeOut = (time < this._backgroundFadeStart) ? 1 : 1 - Math.min(1, Math.max(0, (time - this._backgroundFadeStart) / BACKGROUND_FADE_OUT_DURATION_MS));

        return Math.trunc(Math.round(255 * Math.min(fadeIn, fadeOut)));
    }

    private resolveFrameAnchorCompensationX(): number {
        if (!this._bitmap) return 0;
        if (!this._runtimeAsset) return this._hasBackground ? -BACKGROUND_CONTENT_INSET : 0;

        return Math.trunc(Math.round((this.resolveBaseDimension(this._runtimeAsset.baseWidth) - this._bitmap.width) * 0.5));
    }

    private resolveFrameAnchorCompensationY(): number {
        if (!this._bitmap) return 0;
        if (!this._runtimeAsset) return this._hasBackground ? -BACKGROUND_CONTENT_INSET : 0;

        return this.resolveBaseDimension(this._runtimeAsset.baseHeight) - this._bitmap.height + (this._hasBackground ? BACKGROUND_CONTENT_INSET : 0);
    }

    private resolveStackAwareFrameAnchorCompensationY(): number {
        return this._isPartOfStack ? 0 : this.resolveFrameAnchorCompensationY();
    }

    private resolveBaseDimension(dimension: number): number {
        const value = Math.trunc(dimension);

        if (this._scale < SMALL_SCALE_LIMIT) return Math.max(1, Math.trunc(Math.round(value * 0.5)));

        return Math.max(1, value);
    }

    /** `createBitmap`: a white square in a coloured border, for a habbicon with no picture. */
    private createPlaceholder(size: number, color: string): VariableFxBitmap {
        const bitmap = createTransparentBitmap(size, size);
        const context = getBitmapContext(bitmap);
        const border = Math.max(2, size / 8);
        const inner = Math.max(1, size / 4);

        context.fillStyle = color;
        context.fillRect(border, border, size - (border * 2), size - (border * 2));
        context.fillStyle = '#ffffff';
        context.fillRect(inner, inner, size - (inner * 2), size - (inner * 2));

        return bitmap;
    }

    private createCacheKey(small: boolean): string {
        const frames = this._runtimeAsset?.frames;
        const kind = (frames && frames.length) ? (this._runtimeAsset?.animated ? 'animated' : 'runtime') : 'preview';

        return `${this._habbiconId}:${kind}:${small ? 'small' : 'large'}:${this._frameIndex}`;
    }

    /** `shouldMirrorHabbicon`, worked out once: the avatar and the habbicon both face a way, and not the same one. */
    private shouldMirror(): boolean {
        if (!this._mirrorResolved) {
            const avatarDirection = this._visualization?.habbiconFacingDirection ?? 0;
            const habbiconDirection = HabbiconAssetManager.getDirection(this._habbiconId);

            this._mirror = (avatarDirection !== 0) && (habbiconDirection !== 0) && (avatarDirection !== habbiconDirection);
            this._mirrorResolved = true;
        }

        return this._mirror;
    }

    /** `composeBitmap`: the shadow, the outline at (5, 5) and the picture at (7, 7), each at its alpha. */
    private composeBitmap(picture: VariableFxBitmap, outline: VariableFxBitmap, shadow: VariableFxBitmap, sourceAlpha: number, backgroundAlpha: number): VariableFxBitmap {
        const bitmap = (this._bitmap && !this._bitmapIsShared && (this._bitmap.width === shadow.width) && (this._bitmap.height === shadow.height))
            ? this._bitmap
            : createTransparentBitmap(shadow.width, shadow.height);
        const context = getBitmapContext(bitmap);

        context.clearRect(0, 0, bitmap.width, bitmap.height);

        drawBitmapLayer(context, shadow, 0, 0, backgroundAlpha);
        drawBitmapLayer(context, outline, BACKGROUND_SHADOW_PADDING, BACKGROUND_SHADOW_PADDING, backgroundAlpha);
        drawBitmapLayer(context, picture, BACKGROUND_CONTENT_INSET, BACKGROUND_CONTENT_INSET, sourceAlpha);

        return bitmap;
    }
}
