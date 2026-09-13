import { IVariableFxRenderer } from '../../IVariableFxRenderer';
import { createTransparentBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxConfigData } from '../../VariableFxConfigData';
import { VariableFxFrame } from '../../VariableFxFrame';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxRendererFactory } from '../../VariableFxRendererRegistry';
import { VariableFxStatusData } from '../../VariableFxStatusData';
import { VariableFxCategory, VariableFxRendererName } from '../../VariableFxTables';
import { LevelBadgePainter, LevelBadgeRender } from './LevelBadgePainter';
import { LevelProgressPathAnimator } from './LevelProgressPathAnimator';
import { LevelProgressPathSample } from './LevelProgressPathSample';
import { LevelWithProgressConfigPrebake } from './LevelWithProgressConfigPrebake';

/** A level badge with a progress bar (any bar renderer, picked by the `sub_renderer` extra) tucked behind its right edge. */
export class LevelWithProgressRenderer implements IVariableFxRenderer {
    private static FRAME_HEIGHT: number = 21;
    private static PROGRESS_BAR_OVERLAP_WIDTH: number = 3;

    private static LEVEL_WITH_PROGRESS_ASSETS = {
        background: 'variablefx_level_with_progress_background',
        darkening: 'variablefx_level_with_progress_darkening',
        darkeningMetallic: 'variablefx_level_with_progress_darkening_metallic',
        frame: 'variablefx_level_with_progress_frame',
        lighting: 'variablefx_level_with_progress_lighting',
        lightingMetallic: 'variablefx_level_with_progress_lighting_metallic',
        numbers: 'variablefx_numbers_large',
    };

    private _badgeRender: LevelBadgeRender | undefined = undefined;
    private _badgeRenderKey: string = '';
    private _context: VariableFxRendererContext;
    private _frame: VariableFxFrame = new VariableFxFrame();
    private _renderedSignature: string = '';
    private _levelProgress: LevelProgressPathAnimator = new LevelProgressPathAnimator();
    private _levelProgressInitialized: boolean = false;
    private _prebake: LevelWithProgressConfigPrebake;
    private _progressRenderer: IVariableFxRenderer | undefined = undefined;
    private _progressRendererConfig: VariableFxConfigData | undefined = undefined;

    constructor(context: VariableFxRendererContext) {
        this._context = context;
        this._prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));

        this.initializeProgressRenderer(context);
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return !!this._progressRenderer && this._progressRenderer.isContinuous;
    }

    public updateData(context: VariableFxRendererContext, time: number): void {
        this._context = context;

        this.updateLevelProgressTarget(context, time);
        this.updateProgressRendererData(context, time);
    }

    public needsUpdate(time: number): boolean {
        if (this.isConfigPrebakeDisposed()) return false;

        return this._levelProgress.needsUpdate(time, this.levelProgressPathPixelScale) || (!!this._progressRenderer && this._progressRenderer.needsUpdate(time)) || this.hasRenderChange();
    }

    public update(time: number): boolean {
        if (this.isConfigPrebakeDisposed()) return false;

        const pathChanged = this._levelProgress.update(time);

        if (pathChanged) this.updateProgressRendererData(this._context, time);

        const barChanged = !!this._progressRenderer && this._progressRenderer.update(time);

        if (!barChanged && !this.hasRenderChange()) return false;

        this.ensureFrameBitmap();
        this.renderFrame();

        this._renderedSignature = this.createRenderedSignature();
        this._frame.updateId++;

        return true;
    }

    public dispose(): void {
        this.disposeCurrentBadgeRender();
        this.disposeProgressRenderer();
        this._frame.disposeBitmap();
    }

    private get levelText(): string {
        return String(this._levelProgress.displayedLevel);
    }

    private get digitCount(): number {
        return Math.max(1, this.levelText.length);
    }

    private get badgeWidth(): number {
        return this._prebake.badgePainter.resolveFrameWidth(this.digitCount);
    }

    private get frameWidth(): number {
        const progressWidth = this._progressRenderer ? this._progressRenderer.frame.width : 0;

        if (progressWidth <= 0) return this.badgeWidth;

        return this.progressX + progressWidth;
    }

    private get frameHeight(): number {
        return Math.max(LevelWithProgressRenderer.FRAME_HEIGHT, this._progressRenderer ? this._progressRenderer.frame.height : 0);
    }

    private get progressX(): number {
        return Math.max(0, this.badgeWidth - LevelWithProgressRenderer.PROGRESS_BAR_OVERLAP_WIDTH);
    }

    private get progressY(): number {
        const progressHeight = this._progressRenderer ? this._progressRenderer.frame.height : 0;

        if (progressHeight <= 0) return 0;

        return Math.max(0, Math.trunc((this.frameHeight - progressHeight) / 2));
    }

    private get levelProgressPathPixelScale(): number {
        return Math.max(1, this._progressRenderer ? this._progressRenderer.frame.width : this.badgeWidth);
    }

    private get displayedFrameArgb(): number {
        const paint = VariableFxPaintColors.resolveTargetPaintColor(this._context.config.color, this._context.config.extra, this._levelProgress.displayedProgress, this.createDisplayedLevelStatusExtra());

        return (0xff000000 | paint.rgb) >>> 0;
    }

    private createPrebake(context: VariableFxRendererContext): LevelWithProgressConfigPrebake {
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const names = LevelWithProgressRenderer.LEVEL_WITH_PROGRESS_ASSETS;
        const badgePainter = new LevelBadgePainter({
            background: this.getLayer(context, names.background),
            darkening: this.getLayer(context, paintColor.isMetallic ? names.darkeningMetallic : names.darkening),
            frame: this.getLayer(context, names.frame),
            lighting: this.getLayer(context, paintColor.isMetallic ? names.lightingMetallic : names.lighting),
            numbers: this.getLayer(context, names.numbers),
        }, {
            height: 21,
            width: 21,
            x: 0,
            y: 0,
        });

        return new LevelWithProgressConfigPrebake(badgePainter);
    }

    private getLayer(context: VariableFxRendererContext, name: string): VariableFxBitmap {
        const bitmap = context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX level with progress layer '${name}'.`);

        return bitmap;
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
        const progressBitmap = this._progressRenderer ? this._progressRenderer.frame.bitmap : undefined;
        const badgeRender = this.getCurrentBadgeRender();

        composer.clear(0);

        if (progressBitmap) composer.drawLayer(progressBitmap, this.progressX, this.progressY, 'normal', 255);

        this._prebake.badgePainter.drawBadge(composer, badgeRender, this.levelText, 0, 0);
    }

    private getCurrentBadgeRender(): LevelBadgeRender {
        const key = `${this.digitCount}:${this.displayedFrameArgb}`;

        if (this._badgeRender && this._badgeRenderKey === key) return this._badgeRender;

        this.disposeCurrentBadgeRender();

        this._badgeRender = this._prebake.badgePainter.createBadgeRender(this.digitCount, this.displayedFrameArgb);
        this._badgeRenderKey = key;

        return this._badgeRender;
    }

    private disposeCurrentBadgeRender(): void {
        if (this._prebake?.badgePainter) this._prebake.badgePainter.disposeBadgeRender(this._badgeRender);

        this._badgeRender = undefined;
        this._badgeRenderKey = '';
    }

    private createRenderedSignature(): string {
        return `${this.frameWidth}x${this.frameHeight}:${this._levelProgress.displayedLevel}:${this.displayedFrameArgb}`;
    }

    private hasRenderChange(): boolean {
        return !this._frame.bitmap || this._frame.width !== this.frameWidth || this._frame.height !== this.frameHeight || this.createRenderedSignature() !== this._renderedSignature;
    }

    private isConfigPrebakeDisposed(): boolean {
        return !this._prebake || this._prebake.disposed;
    }

    private initializeProgressRenderer(context: VariableFxRendererContext): void {
        const subRendererId = this.resolveSubRendererId(context);
        const rendererName = subRendererId === undefined ? undefined : VariableFxRendererName.resolveById(subRendererId);

        if (subRendererId === undefined || rendererName === undefined || rendererName === context.config.renderer) return;

        const factory = this.resolveSubRendererFactory(context, subRendererId, rendererName);

        if (!factory) return;

        this._progressRendererConfig = this._prebake.getOrCreateProgressRendererConfig(() => this.createProgressRendererConfig(context, subRendererId, rendererName));
        this._progressRenderer = factory(this.createProgressRendererContext(context));
    }

    private updateProgressRendererData(context: VariableFxRendererContext, time: number): void {
        if (this._progressRenderer) this._progressRenderer.updateData(this.createProgressRendererContext(context), time);
    }

    private resolveSubRendererId(context: VariableFxRendererContext): number | undefined {
        const raw = VariableFxPaintColors.readExtra(context.config.extra, 'sub_renderer');

        if (!raw || !raw.length) return undefined;

        const parsed = Number(raw);

        return Number.isFinite(parsed) ? Math.trunc(parsed) : undefined;
    }

    private resolveSubRendererFactory(context: VariableFxRendererContext, rendererId: number, rendererName: string): VariableFxRendererFactory | undefined {
        if (!context.registry) return undefined;

        return context.registry.resolveByServerRenderer(rendererId) ?? context.registry.resolve(VariableFxCategory.PROGRESS_BAR, rendererName);
    }

    private createProgressRendererConfig(context: VariableFxRendererContext, rendererId: number, rendererName: string): VariableFxConfigData {
        const color = context.config.color === VariableFxPaintColors.DYNAMIC_LEVELLING ? VariableFxPaintColors.DYNAMIC_DELEGATED : context.config.color;

        return new VariableFxConfigData(VariableFxCategory.PROGRESS_BAR, rendererName, rendererName, context.config.width, color, 0, 1, context.config.extra, context.config.categoryId, context.config.styleId, rendererId);
    }

    private createProgressRendererContext(context: VariableFxRendererContext): VariableFxRendererContext {
        const progress = this._levelProgress.displayedProgress;
        const config = this._progressRendererConfig ?? context.config;

        return new VariableFxRendererContext(context.assetProvider, config, new VariableFxStatusData(progress, undefined, undefined, this.createProgressRendererStatusExtra(config), true), 0, 1, progress, context.registry);
    }

    private disposeProgressRenderer(): void {
        if (this._progressRenderer) {
            this._progressRenderer.dispose();
            this._progressRenderer = undefined;
        }

        this._progressRendererConfig = undefined;
    }

    private updateLevelProgressTarget(context: VariableFxRendererContext, time: number): void {
        const sample = this.resolveLevelProgressSample(context);

        if (!this._levelProgressInitialized || context.status.isInitialize) {
            this._levelProgress.snapTo(sample, time);
            this._levelProgressInitialized = true;

            return;
        }

        this._levelProgress.setTarget(sample, time);
    }

    private resolveLevelProgressSample(context: VariableFxRendererContext): LevelProgressPathSample {
        const currentLevel = Number(VariableFxPaintColors.readExtra(context.status.extra, 'current_level'));
        const maxLevel = Number(VariableFxPaintColors.readExtra(context.status.extra, 'max_level'));
        const isMaxed = (VariableFxPaintColors.readExtra(context.status.extra, 'is_maxed') ?? '').toLowerCase() === 'true';
        const progress = LevelProgressPathAnimator.resolveLevelProgressSampleProgress(context.progress, context.status.value, context.minValue, context.maxValue, isMaxed);

        return new LevelProgressPathSample(currentLevel, progress, isMaxed, Number.isFinite(maxLevel) ? maxLevel : undefined);
    }

    private createDisplayedLevelStatusExtra(): Map<string, string> {
        const extra = new Map<string, string>();
        const maxLevel = VariableFxPaintColors.readExtra(this._context.status.extra, 'max_level');
        const isMaxed = VariableFxPaintColors.readExtra(this._context.status.extra, 'is_maxed');
        const delegated = VariableFxPaintColors.readExtra(this._context.status.extra, 'delegated_color');

        if (maxLevel !== undefined) extra.set('max_level', maxLevel);
        if (isMaxed !== undefined) extra.set('is_maxed', isMaxed);

        extra.set('current_level', String(this._levelProgress.displayedLevel));

        if (delegated !== undefined) extra.set('delegated_color', delegated);

        return extra;
    }

    private createProgressRendererStatusExtra(config: VariableFxConfigData): Map<string, string> {
        const extra = new Map<string, string>();

        if (config.color !== VariableFxPaintColors.DYNAMIC_DELEGATED) {
            const delegated = config.color === VariableFxPaintColors.DYNAMIC_TEAM_COLOR ? VariableFxPaintColors.readExtra(this._context.status.extra, 'delegated_color') : undefined;

            if (delegated !== undefined) extra.set('delegated_color', delegated);

            return extra;
        }

        extra.set('delegated_color', this.formatRgbHex(this.displayedFrameArgb & 0xffffff));

        return extra;
    }

    private formatRgbHex(rgb: number): string {
        return '#' + (rgb & 0xffffff).toString(16).padStart(6, '0');
    }
}
