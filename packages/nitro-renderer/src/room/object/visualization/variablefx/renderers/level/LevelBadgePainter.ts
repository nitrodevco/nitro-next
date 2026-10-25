import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';

export interface LevelBadgeAssets {
    background: VariableFxBitmap | undefined;
    darkening: VariableFxBitmap;
    frame: VariableFxBitmap;
    lighting: VariableFxBitmap;
    numbers: VariableFxBitmap;
}

/** The region of the source layers the badge is cut from (the level-details sheet holds the badge inside a bigger image). */
export interface LevelBadgeSourceRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface LevelBadgeSourcePrebake {
    backgroundAndFrame: VariableFxBitmap;
    darkening: VariableFxBitmap;
    frame: VariableFxBitmap;
    lighting: VariableFxBitmap;
}

export interface LevelBadgeRender {
    backgroundAndFrame: VariableFxBitmap;
    ownsSourcePrebake: boolean;
    sourcePrebake: LevelBadgeSourcePrebake;
}

/** Paints the level badge: a three-sliced frame sized to the digit count, tinted, with the level digits inside. */
export class LevelBadgePainter {
    public static MAX_SHARED_BADGE_PREBAKE_DIGITS: number = 5;

    private static DIGIT_WIDTH: number = 8;
    private static NUMBER_Y: number = 5;
    private static SINGLE_DIGIT_NUMBER_X: number = 7;
    private static MULTI_DIGIT_NUMBER_X: number = 6;
    private static SINGLE_DIGIT_FRAME_WIDTH: number = 21;
    private static MULTI_DIGIT_RIGHT_PADDING: number = 5;
    private static THREE_SLICE_LEFT_WIDTH: number = 10;
    private static THREE_SLICE_RIGHT_WIDTH: number = 10;

    private _badgePrebakes: Map<number, LevelBadgeSourcePrebake> = new Map();
    private _layers: { background: VariableFxBitmap | undefined; darkening: VariableFxBitmap; frame: VariableFxBitmap; lighting: VariableFxBitmap };
    private _numbers: VariableFxBitmap;

    constructor(assets: LevelBadgeAssets, sourceRect: LevelBadgeSourceRect) {
        this._numbers = assets.numbers;
        this._layers = {
            background: assets.background ? this.createNormalizedLayer(assets.background, sourceRect) : undefined,
            darkening: this.createNormalizedLayer(assets.darkening, sourceRect),
            frame: this.createNormalizedLayer(assets.frame, sourceRect),
            lighting: this.createNormalizedLayer(assets.lighting, sourceRect),
        };
    }

    public resolveFrameWidth(digitCount: number): number {
        const digits = Math.max(1, digitCount);

        if (digits === 1) return LevelBadgePainter.SINGLE_DIGIT_FRAME_WIDTH;

        return LevelBadgePainter.MULTI_DIGIT_NUMBER_X + digits * LevelBadgePainter.DIGIT_WIDTH + LevelBadgePainter.MULTI_DIGIT_RIGHT_PADDING;
    }

    public createBadgeRender(digitCount: number, argb: number): LevelBadgeRender {
        const source = this.getBadgeSourcePrebake(digitCount);
        const prebake = source.prebake;
        const backgroundAndFrame = createTransparentBitmap(prebake.backgroundAndFrame.width, prebake.backgroundAndFrame.height);

        this.drawRecoloredBackgroundAndFrame(backgroundAndFrame, prebake, argb);

        return {
            backgroundAndFrame,
            ownsSourcePrebake: source.ownsPrebake,
            sourcePrebake: prebake,
        };
    }

    public disposeBadgeRender(render: LevelBadgeRender | undefined): void {
        if (!render) return;

        disposeBitmap(render.backgroundAndFrame);

        if (render.ownsSourcePrebake) this.disposeBadgeSourcePrebake(render.sourcePrebake);
    }

    public drawBadge(composer: VariableFxBitmapComposer, render: LevelBadgeRender, levelText: string, x: number, y: number): void {
        composer.drawLayer(render.backgroundAndFrame, x, y, 'normal', 255);

        this.drawDigits(composer, levelText, x, y);

        composer.drawLayer(render.sourcePrebake.darkening, x, y, 'multiply', 255);
        composer.drawLayer(render.sourcePrebake.lighting, x, y, 'add', 255);
    }

    public dispose(): void {
        for (const prebake of this._badgePrebakes.values()) this.disposeBadgeSourcePrebake(prebake);

        this._badgePrebakes.clear();

        disposeBitmap(this._layers.background);
        disposeBitmap(this._layers.darkening);
        disposeBitmap(this._layers.frame);
        disposeBitmap(this._layers.lighting);
    }

    private getBadgeSourcePrebake(digitCount: number): { ownsPrebake: boolean; prebake: LevelBadgeSourcePrebake } {
        const digits = Math.max(1, digitCount);

        if (digits > LevelBadgePainter.MAX_SHARED_BADGE_PREBAKE_DIGITS) return { ownsPrebake: true, prebake: this.createBadgeSourcePrebake(digits) };

        let prebake = this._badgePrebakes.get(digits);

        if (!prebake) {
            prebake = this.createBadgeSourcePrebake(digits);

            this._badgePrebakes.set(digits, prebake);
        }

        return { ownsPrebake: false, prebake };
    }

    private createBadgeSourcePrebake(digitCount: number): LevelBadgeSourcePrebake {
        const width = this.resolveFrameWidth(digitCount);
        const height = this._layers.frame.height;
        const backgroundAndFrame = createTransparentBitmap(width, height);
        const frame = createTransparentBitmap(width, height);
        const darkening = createTransparentBitmap(width, height);
        const lighting = createTransparentBitmap(width, height);

        this.drawBackgroundAndFramePrebake(backgroundAndFrame);
        this.drawFramePrebake(frame);
        this.drawOverlayPrebake(darkening, this._layers.darkening);
        this.drawOverlayPrebake(lighting, this._layers.lighting);

        return { backgroundAndFrame, darkening, frame, lighting };
    }

    private drawBackgroundAndFramePrebake(target: VariableFxBitmap): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        if (this._layers.background) composer.drawThreeSlice(this._layers.background, LevelBadgePainter.THREE_SLICE_LEFT_WIDTH, LevelBadgePainter.THREE_SLICE_RIGHT_WIDTH, target.width, 0, 0, 'normal', 255);

        composer.drawThreeSlice(this._layers.frame, LevelBadgePainter.THREE_SLICE_LEFT_WIDTH, LevelBadgePainter.THREE_SLICE_RIGHT_WIDTH, target.width, 0, 0, 'normal', 255);
    }

    private drawFramePrebake(target: VariableFxBitmap): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(this._layers.frame, LevelBadgePainter.THREE_SLICE_LEFT_WIDTH, LevelBadgePainter.THREE_SLICE_RIGHT_WIDTH, target.width, 0, 0, 'normal', 255);
    }

    private drawOverlayPrebake(target: VariableFxBitmap, layer: VariableFxBitmap): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(layer, LevelBadgePainter.THREE_SLICE_LEFT_WIDTH, LevelBadgePainter.THREE_SLICE_RIGHT_WIDTH, target.width, 0, 0, 'normal', 255);
    }

    private drawRecoloredBackgroundAndFrame(target: VariableFxBitmap, prebake: LevelBadgeSourcePrebake, argb: number): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawLayer(prebake.backgroundAndFrame, 0, 0, 'normal', 255);
        composer.drawTintedLayer(prebake.frame, 0, 0, argb, 'normal', 255);
    }

    private drawDigits(composer: VariableFxBitmapComposer, levelText: string, x: number, y: number): void {
        const numberX = levelText.length === 1 ? LevelBadgePainter.SINGLE_DIGIT_NUMBER_X : LevelBadgePainter.MULTI_DIGIT_NUMBER_X;

        for (let i = 0; i < levelText.length; i++) {
            const digit = parseInt(levelText.charAt(i)) || 0;
            const digitX = x + numberX + i * LevelBadgePainter.DIGIT_WIDTH;
            const digitY = y + LevelBadgePainter.NUMBER_Y;

            composer.drawLayer(this._numbers, digitX - digit * LevelBadgePainter.DIGIT_WIDTH, digitY, 'normal', 255, new VariableFxClipRect(digitX, digitY, LevelBadgePainter.DIGIT_WIDTH, this._numbers.height));
        }
    }

    private createNormalizedLayer(layer: VariableFxBitmap, sourceRect: LevelBadgeSourceRect): VariableFxBitmap {
        const normalized = createTransparentBitmap(sourceRect.width, sourceRect.height);
        const composer = new VariableFxBitmapComposer(normalized);

        composer.clear(0);
        composer.drawLayer(layer, -Math.trunc(sourceRect.x), -Math.trunc(sourceRect.y), 'normal', 255);

        return normalized;
    }

    private disposeBadgeSourcePrebake(prebake: LevelBadgeSourcePrebake): void {
        disposeBitmap(prebake.backgroundAndFrame);
        disposeBitmap(prebake.darkening);
        disposeBitmap(prebake.frame);
        disposeBitmap(prebake.lighting);
    }
}
