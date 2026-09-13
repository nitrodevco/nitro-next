import { VariableFxPaintColor, VariableFxPaintColors } from '../VariableFxPaintColors';
import { AnimatedColor } from './AnimatedColor';

export interface AnimatedPaintColorSource {
    color: string;
    extra: Map<string, string> | undefined;
    progress: number;
    statusExtra: Map<string, string> | undefined;
}

const sign = (value: number): number => {
    if (value > 0) return 1;
    if (value < 0) return -1;

    return 0;
};

/**
 * A bar's fill colour: fades between the named colours, snaps for delegated/levelling colours,
 * and walks the red-to-green bands one at a time so a big value jump still passes through
 * yellow instead of cutting straight from red to green.
 */
export class AnimatedPaintColor {
    private _color: AnimatedColor;
    private _targetBandIndex: number | undefined = undefined;
    private _targetRgb: number = -1;
    private _bandDirection: number = 0;

    constructor(durationMs: number) {
        this._color = new AnimatedColor(durationMs);
    }

    public get value(): number {
        return this._color.value;
    }

    public get argb(): number {
        return (0xff000000 | this._color.value) >>> 0;
    }

    public snapTo(source: AnimatedPaintColorSource, time: number): void {
        const paint = this.resolvePaintColor(source);
        const rgb = paint.rgb & 0xffffff;

        this._color.snapTo(rgb, time);
        this._targetBandIndex = paint.dynamicBandIndex;
        this._targetRgb = rgb;
        this._bandDirection = 0;
    }

    public setTarget(source: AnimatedPaintColorSource, time: number): void {
        this.syncTarget(source, time);
    }

    public needsUpdate(time: number): boolean {
        return this._color.needsUpdate(time);
    }

    public update(source: AnimatedPaintColorSource, time: number): boolean {
        const before = this.syncTarget(source, time);
        const changed = this._color.update(time);
        const after = this.syncTarget(source, time);

        return before || changed || after;
    }

    private syncTarget(source: AnimatedPaintColorSource, time: number): boolean {
        const paint = this.resolvePaintColor(source);

        if (paint.snapTransition === true) return this.snapColorTarget(paint.rgb, undefined, time);

        const bandIndex = paint.dynamicBandIndex;

        if (bandIndex === undefined) return this.setColorTarget(paint.rgb, undefined, time);

        const nextBand = this.resolveNextDynamicBandIndex(bandIndex);
        const bandRgb = VariableFxPaintColors.resolveDynamicPaintBandRgb(source.color, nextBand);

        return this.setColorTarget(bandRgb === undefined ? paint.rgb : bandRgb, nextBand, time);
    }

    private setColorTarget(rgb: number, bandIndex: number | undefined, time: number): boolean {
        const normalized = rgb & 0xffffff;

        if (this._targetRgb === normalized && this._targetBandIndex === bandIndex) return false;

        const previousBand = this._targetBandIndex;

        this._color.setTarget(normalized, time);
        this._targetBandIndex = bandIndex;
        this._targetRgb = normalized;
        this._bandDirection = previousBand !== undefined && bandIndex !== undefined ? sign(bandIndex - previousBand) : 0;

        return true;
    }

    private snapColorTarget(rgb: number, bandIndex: number | undefined, time: number): boolean {
        const normalized = rgb & 0xffffff;

        if (this._targetRgb === normalized && this._targetBandIndex === bandIndex && this._color.value === normalized) return false;

        this._color.snapTo(normalized, time);
        this._targetBandIndex = bandIndex;
        this._targetRgb = normalized;
        this._bandDirection = 0;

        return true;
    }

    private resolveNextDynamicBandIndex(bandIndex: number): number {
        if (this._targetBandIndex === undefined) return bandIndex;
        if (bandIndex === this._targetBandIndex) return this._targetBandIndex;

        const direction = sign(bandIndex - this._targetBandIndex);

        if (!this.isAtTarget() && direction === this._bandDirection) return this._targetBandIndex;
        if (!this.isAtTarget()) return bandIndex;

        return this._targetBandIndex + direction;
    }

    private isAtTarget(): boolean {
        return this._color.value === this._targetRgb;
    }

    private resolvePaintColor(source: AnimatedPaintColorSource): VariableFxPaintColor {
        return VariableFxPaintColors.resolveTargetPaintColor(source.color, source.extra, source.progress, source.statusExtra);
    }
}
