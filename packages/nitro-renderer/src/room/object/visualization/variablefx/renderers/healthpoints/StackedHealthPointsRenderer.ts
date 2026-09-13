import { IVariableFxRenderer } from '../../IVariableFxRenderer';
import { createTransparentBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxFrame } from '../../VariableFxFrame';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxWidth } from '../../VariableFxTables';
import { StackedHealthPointsAnimator } from './StackedHealthPointsAnimator';
import { StackedHealthPointsAssets, StackedHealthPointsHeartPrebake } from './StackedHealthPointsHeartPrebake';

/** One heart per health point, laid out in rows (3 or 5 per row) that grow upward. */
export class StackedHealthPointsRenderer implements IVariableFxRenderer {
    private static HORIZONTAL_SPACING: number = 1;
    private static VERTICAL_SPACING: number = 3;
    private static MAX_ROWS: number = 20;

    private static STACKED_HEALTH_POINTS_ASSETS = {
        background: 'variablefx_stacked_health_points_background',
        darkening: 'variablefx_stacked_health_points_darkening',
        darkeningMetallic: 'variablefx_stacked_health_points_darkening_metallic',
        lighting: 'variablefx_stacked_health_points_lighting',
        lightingMetallic: 'variablefx_stacked_health_points_lighting_metallic',
        metallic: 'variablefx_stacked_health_points_metallic',
    };

    private _context: VariableFxRendererContext;
    private _fillArgb: number = -1;
    private _frame: VariableFxFrame = new VariableFxFrame();
    private _hearts: StackedHealthPointsAnimator = new StackedHealthPointsAnimator();
    private _initialized: boolean = false;
    private _renderedSignature: string = '';
    private _prebake: StackedHealthPointsHeartPrebake;
    private _targetHeartCount: number = 0;

    constructor(context: VariableFxRendererContext) {
        this._context = context;
        this._prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        this._fillArgb = this.resolveFillArgb(context);
    }

    public static resolveStackedHealthPointsPerRow(width: string): number {
        switch (width) {
            case VariableFxWidth.LARGE:
                return 5;
            case VariableFxWidth.MEDIUM:
            default:
                return 3;
        }
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(context: VariableFxRendererContext, time: number): void {
        this._context = context;
        this._fillArgb = this.resolveFillArgb(context);
        this._targetHeartCount = this.resolveTargetHeartCount();

        if (!this._initialized || context.status.isInitialize) {
            this._hearts.snapTo(this._targetHeartCount, time);
            this._initialized = true;

            return;
        }

        this._hearts.setTarget(this._targetHeartCount, time);
    }

    public needsUpdate(time: number): boolean {
        return !this._frame.bitmap || this._frame.width !== this.frameWidth || this._frame.height !== this.frameHeight || this.createRenderedSignature() !== this._renderedSignature || this._hearts.needsUpdate(time, 1);
    }

    public update(time: number): boolean {
        const animated = this._hearts.update(time);

        if (!animated && !this.needsUpdate(time)) return false;

        this.ensureFrameBitmap();
        this.renderFrame();

        this._renderedSignature = this.createRenderedSignature();
        this._frame.updateId++;

        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    private get heartWidth(): number {
        return this._prebake.heartWidth;
    }

    private get heartHeight(): number {
        return this._prebake.heartHeight;
    }

    private get heartsPerRow(): number {
        return StackedHealthPointsRenderer.resolveStackedHealthPointsPerRow(this._context.config.width);
    }

    private get renderHeartCount(): number {
        return this._hearts.visibleHeartCount;
    }

    private get heightHeartCount(): number {
        return Math.max(this._targetHeartCount, this._hearts.visibleHeartCount);
    }

    private get rowCount(): number {
        return Math.max(1, Math.ceil(this.heightHeartCount / this.heartsPerRow));
    }

    private get columnCount(): number {
        const visible = this._hearts.visibleHeartCount;

        if (Math.ceil(visible / this.heartsPerRow) > 1) return this.heartsPerRow;

        return Math.max(1, Math.min(this.heartsPerRow, visible));
    }

    private get frameWidth(): number {
        return this.columnCount * this.heartWidth + (this.columnCount - 1) * StackedHealthPointsRenderer.HORIZONTAL_SPACING;
    }

    private get frameHeight(): number {
        return this.rowCount * this.heartHeight + (this.rowCount - 1) * StackedHealthPointsRenderer.VERTICAL_SPACING;
    }

    private ensureFrameBitmap(): void {
        if (this._frame.bitmap && this._frame.width === this.frameWidth && this._frame.height === this.frameHeight) return;

        this._frame.disposeBitmap();

        const bitmap = createTransparentBitmap(this.frameWidth, this.frameHeight);

        this._frame.bitmap = bitmap;
        this._frame.width = bitmap.width;
        this._frame.height = bitmap.height;
        this._renderedSignature = '';
    }

    private renderFrame(): void {
        const bitmap = this._frame.bitmap;

        if (!bitmap) return;

        const composer = new VariableFxBitmapComposer(bitmap);

        composer.clear(0);

        for (let index = 0; index < this.renderHeartCount; index++) {
            const opacity = this.resolveHeartOpacity(index);

            if (opacity > 0) this.drawHeart(composer, index, opacity);
        }
    }

    private drawHeart(composer: VariableFxBitmapComposer, index: number, opacity: number): void {
        const row = Math.trunc(index / this.heartsPerRow);
        const column = index % this.heartsPerRow;
        const x = column * (this.heartWidth + StackedHealthPointsRenderer.HORIZONTAL_SPACING);
        const y = (this.rowCount - row - 1) * (this.heartHeight + StackedHealthPointsRenderer.VERTICAL_SPACING);

        composer.drawLayer(this._prebake.getOrCreateHeartPrebake(this._fillArgb >>> 0), x, y, 'normal', opacity);
    }

    private resolveHeartOpacity(index: number): number {
        return Math.max(0, Math.min(255, Math.round((this._hearts.getOpacity(index) + 1e-9) * 255)));
    }

    private createRenderedSignature(): string {
        const opacities: number[] = [];

        for (let index = 0; index < this.renderHeartCount; index++) opacities.push(this.resolveHeartOpacity(index));

        return `${this.frameWidth}x${this.frameHeight}:${this._fillArgb}:${opacities.join(',')}`;
    }

    private resolveTargetHeartCount(): number {
        const value = this._context.status.value - this._context.minValue;
        const range = this._context.maxValue - this._context.minValue;

        if (!Number.isFinite(value) || !Number.isFinite(range)) return 0;

        const hearts = Math.max(0, Math.trunc(value));
        const maxHearts = Math.max(0, Math.trunc(range));
        const cap = this.heartsPerRow * StackedHealthPointsRenderer.MAX_ROWS;

        return Math.min(hearts, maxHearts, cap);
    }

    private createPrebake(context: VariableFxRendererContext): StackedHealthPointsHeartPrebake {
        return new StackedHealthPointsHeartPrebake(this.resolveAssets(context));
    }

    private resolveAssets(context: VariableFxRendererContext): StackedHealthPointsAssets {
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const names = StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS;
        const isMetallic = paintColor.isMetallic;
        const darkening = isMetallic ? this.getLayer(context, names.darkeningMetallic) : this.getLayer(context, names.darkening);
        const lighting = isMetallic ? this.getLayer(context, names.lightingMetallic) : this.getLayer(context, names.lighting);

        return {
            background: this.getLayer(context, names.background),
            metallic: isMetallic ? this.getLayer(context, names.metallic) : undefined,
            overlays: [
                { blendMode: 'multiply', layer: darkening },
                { blendMode: 'add', layer: lighting },
            ],
        };
    }

    private getLayer(context: VariableFxRendererContext, name: string): VariableFxBitmap {
        const bitmap = context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX stacked health points layer '${name}'.`);

        return bitmap;
    }

    private resolveFillArgb(context: VariableFxRendererContext): number {
        return (0xff000000 | VariableFxPaintColors.resolveTargetPaintColor(context.config.color, context.config.extra, context.progress, context.status.extra).rgb) >>> 0;
    }
}
