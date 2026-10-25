import { AnimatedPaintColor, AnimatedPaintColorSource } from '../../animation/AnimatedPaintColor';
import { AnimatedScalar } from '../../animation/AnimatedScalar';
import { IVariableFxRenderer } from '../../IVariableFxRenderer';
import { createTransparentBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxFrame } from '../../VariableFxFrame';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';

/**
 * Shared behaviour of every bar-shaped renderer: the fill width eases toward the target
 * progress, the fill colour fades toward its target, and the frame is only redrawn when the
 * rounded pixel width, the colour or a renderer-specific detail actually changed.
 */
export abstract class BarVariableFxRendererBase implements IVariableFxRenderer {
    private static FILL_COLOR_TRANSITION_MS: number = 300;

    private _context: VariableFxRendererContext;
    private _fillColor: AnimatedPaintColor;
    private _frame: VariableFxFrame;
    private _initialized: boolean = false;
    private _lastRenderedFillRgb: number = -1;
    private _lastRenderedPixelWidth: number = -1;
    private _progress: AnimatedScalar;

    constructor(context: VariableFxRendererContext) {
        this._context = context;
        this._fillColor = new AnimatedPaintColor(BarVariableFxRendererBase.FILL_COLOR_TRANSITION_MS);
        this._frame = new VariableFxFrame();
        this._progress = new AnimatedScalar(0.00001, 0.003, 0.0001, 0.000008);
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(context: VariableFxRendererContext, time: number): void {
        this._context = context;

        if (!this._initialized || context.status.isInitialize) {
            this._progress.snapTo(context.progress, time);
            this._fillColor.snapTo(this.resolveFillColorSource(), time);
            this._initialized = true;

            return;
        }

        this._progress.setTarget(context.progress, time);
        this._fillColor.setTarget(this.resolveFillColorSource(), time);
    }

    public needsUpdate(time: number): boolean {
        return this.hasRenderChange(time) || this._progress.needsUpdate(time, this.progressPixelWidth) || this._fillColor.needsUpdate(time);
    }

    public update(time: number): boolean {
        this.advanceAnimation(time);

        if (!this.hasRenderChange(time)) return false;

        this.ensureFrameBitmap();

        // The Flash renderers redraw over the previous frame and rely on the chrome being opaque;
        // clearing first keeps any anti-aliased edge pixels from accumulating alpha between frames.
        if (this._frame.bitmap) new VariableFxBitmapComposer(this._frame.bitmap).clear(0);

        this.renderFrame(time);

        this._lastRenderedFillRgb = this._fillColor.value;
        this._lastRenderedPixelWidth = this.calculateFilledPixelWidth();

        this.didRenderFrame(time);

        this._frame.updateId++;

        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    protected get context(): VariableFxRendererContext {
        return this._context;
    }

    protected get displayedFillArgb(): number {
        return this._fillColor.argb;
    }

    protected get displayedFillRgb(): number {
        return this._fillColor.value;
    }

    protected get displayedProgress(): number {
        return this._progress.value;
    }

    protected get mutableFrame(): VariableFxFrame {
        return this._frame;
    }

    protected get frameWidth(): number {
        return 0;
    }

    protected get frameHeight(): number {
        return 0;
    }

    protected get progressPixelWidth(): number {
        return 0;
    }

    protected calculateFilledPixelWidth(): number {
        return Math.max(0, Math.min(this.progressPixelWidth, Math.trunc(this.displayedProgress * this.progressPixelWidth)));
    }

    protected createFrameBitmap(width: number, height: number): VariableFxBitmap {
        return createTransparentBitmap(width, height);
    }

    protected renderFrame(_time: number): void {
        return;
    }

    protected hasRendererSpecificRenderChange(_time: number): boolean {
        return false;
    }

    protected didRenderFrame(_time: number): void {
        return;
    }

    private advanceAnimation(time: number): void {
        this._progress.update(time);
        this._fillColor.update(this.resolveFillColorSource(), time);
    }

    private hasRenderChange(time: number): boolean {
        const pixelWidth = this.calculateFilledPixelWidth();

        if (!this._frame.bitmap || this._frame.width !== this.frameWidth || this._frame.height !== this.frameHeight || pixelWidth !== this._lastRenderedPixelWidth) return true;

        return (this._fillColor.value !== this._lastRenderedFillRgb && (pixelWidth > 0 || this._lastRenderedPixelWidth > 0)) || this.hasRendererSpecificRenderChange(time);
    }

    private ensureFrameBitmap(): void {
        if (this._frame.bitmap && this._frame.width === this.frameWidth && this._frame.height === this.frameHeight) return;

        this._frame.disposeBitmap();

        const bitmap = this.createFrameBitmap(this.frameWidth, this.frameHeight);

        this._frame.bitmap = bitmap;
        this._frame.width = bitmap.width;
        this._frame.height = bitmap.height;
        this._lastRenderedFillRgb = -1;
        this._lastRenderedPixelWidth = -1;
    }

    private resolveFillColorSource(): AnimatedPaintColorSource {
        return {
            color: this._context.config.color,
            extra: this._context.config.extra,
            progress: this.displayedProgress,
            statusExtra: this._context.status.extra,
        };
    }
}
