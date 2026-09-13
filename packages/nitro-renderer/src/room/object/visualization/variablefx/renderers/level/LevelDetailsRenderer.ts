import { IVariableFxRenderer } from '../../IVariableFxRenderer';
import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxConfigData } from '../../VariableFxConfigData';
import { VariableFxFrame } from '../../VariableFxFrame';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxStatusData } from '../../VariableFxStatusData';
import { VariableFxCategory, VariableFxRendererName, VariableFxWidth } from '../../VariableFxTables';
import { ClassicMiniProgressBarRenderer } from '../bar/ClassicMiniProgressBarRenderer';
import { LevelBadgePainter, LevelBadgeRender } from './LevelBadgePainter';
import { LevelDetailsConfigPrebake } from './LevelDetailsConfigPrebake';
import { LevelDetailsNumberPainter, LevelDetailsNumberRenderPlan } from './LevelDetailsNumberPainter';
import { LevelDetailsNumberProgress } from './LevelDetailsNumberProgress';
import { LevelProgressPathAnimator } from './LevelProgressPathAnimator';
import { LevelProgressPathSample } from './LevelProgressPathSample';

/** A level badge, a mini progress bar and the "current/max" numbers, in one framed panel. */
export class LevelDetailsRenderer implements IVariableFxRenderer {
    public static BADGE_X: number = 5;
    public static BADGE_Y: number = 4;
    public static BADGE_SOURCE_WIDTH: number = 21;
    public static BADGE_SOURCE_HEIGHT: number = 21;
    public static BAR_SPACING_X: number = 3;
    public static BAR_Y: number = 19;
    public static NUMBER_Y: number = 7;
    public static RIGHT_PADDING: number = 6;
    public static FRAME_HEIGHT: number = 29;
    public static BACKGROUND_SLICE_LEFT_WIDTH: number = 29;
    public static BACKGROUND_SLICE_RIGHT_WIDTH: number = 6;

    private static LEVEL_DETAILS_ASSETS = {
        background: 'variablefx_level_details_background',
        darkening: 'variablefx_level_details_darkening',
        darkeningMetallic: 'variablefx_level_details_darkening_metallic',
        frame: 'variablefx_level_details_frame',
        lighting: 'variablefx_level_details_lighting',
        lightingMetallic: 'variablefx_level_details_lighting_metallic',
        numbers: 'variablefx_numbers_large',
        smallNumbers: 'variablefx_numbers_small',
    };

    private _badgeRender: LevelBadgeRender | undefined = undefined;
    private _badgeRenderKey: string = '';
    private _context: VariableFxRendererContext;
    private _frame: VariableFxFrame = new VariableFxFrame();
    private _lastRenderedDigitCount: number = 0;
    private _lastRenderedNumberKey: string = '';
    private _renderedSignature: string = '';
    private _levelProgress: LevelProgressPathAnimator = new LevelProgressPathAnimator();
    private _levelProgressInitialized: boolean = false;
    private _numberProgress: LevelDetailsNumberProgress = new LevelDetailsNumberProgress();
    private _prebake: LevelDetailsConfigPrebake;
    private _progressRenderer: ClassicMiniProgressBarRenderer;
    private _progressRendererConfig: VariableFxConfigData;

    constructor(context: VariableFxRendererContext) {
        this._context = context;
        this._prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        this._progressRendererConfig = this._prebake.getOrCreateProgressRendererConfig(() => this.createProgressRendererConfig(context));
        this._progressRenderer = new ClassicMiniProgressBarRenderer(this.createProgressRendererContext(context));
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return this._progressRenderer.isContinuous;
    }

    public updateData(context: VariableFxRendererContext, time: number): void {
        this._context = context;

        const sample = this.resolveLevelProgressSample(context);

        this.updateLevelProgressTarget(context, sample, time);
        this.updateNumberProgressTarget(context, sample);
        this.updateProgressRendererData(context, time);
    }

    public needsUpdate(time: number): boolean {
        if (this.isConfigPrebakeDisposed()) return false;

        return this._levelProgress.needsUpdate(time, this.levelProgressPathPixelScale) || this._progressRenderer.needsUpdate(time) || this.hasRenderChange() || this.hasFinalNumberRenderChange();
    }

    public update(time: number): boolean {
        if (this.isConfigPrebakeDisposed()) return false;

        const pathChanged = this._levelProgress.update(time);

        if (pathChanged) this.updateProgressRendererData(this._context, time);

        const barChanged = this._progressRenderer.update(time);

        if (!barChanged && !this.hasRenderChange() && !this.hasFinalNumberRenderChange()) return false;

        this.ensureFrameBitmap();
        this.renderFrame();

        this._renderedSignature = this.createRenderedSignature();
        this._frame.updateId++;

        return true;
    }

    public dispose(): void {
        this.disposeCurrentBadgeRender();
        this._progressRenderer.dispose();
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

    private get progressX(): number {
        return LevelDetailsRenderer.BADGE_X + this.badgeWidth + LevelDetailsRenderer.BAR_SPACING_X;
    }

    private get progressFrameWidth(): number {
        return this._progressRenderer.frame.width > 0 ? this._progressRenderer.frame.width : this.resolveClassicProgressBarFrameWidth(this._context.config.width);
    }

    private get frameWidth(): number {
        return this.progressX + this.progressFrameWidth + LevelDetailsRenderer.RIGHT_PADDING;
    }

    private get frameHeight(): number {
        return LevelDetailsRenderer.FRAME_HEIGHT;
    }

    private get levelProgressPathPixelScale(): number {
        return Math.max(1, this.progressFrameWidth);
    }

    private get displayedFrameArgb(): number {
        const paint = VariableFxPaintColors.resolveTargetPaintColor(this._context.config.color, this._context.config.extra, this._levelProgress.displayedProgress, this.createDisplayedLevelStatusExtra());

        return (0xff000000 | paint.rgb) >>> 0;
    }

    private createPrebake(context: VariableFxRendererContext): LevelDetailsConfigPrebake {
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const names = LevelDetailsRenderer.LEVEL_DETAILS_ASSETS;
        const badgePainter = new LevelBadgePainter({
            background: undefined,
            darkening: this.getLayer(paintColor.isMetallic ? names.darkeningMetallic : names.darkening),
            frame: this.getLayer(names.frame),
            lighting: this.getLayer(paintColor.isMetallic ? names.lightingMetallic : names.lighting),
            numbers: this.getLayer(names.numbers),
        }, {
            height: LevelDetailsRenderer.BADGE_SOURCE_HEIGHT,
            width: LevelDetailsRenderer.BADGE_SOURCE_WIDTH,
            x: LevelDetailsRenderer.BADGE_X,
            y: LevelDetailsRenderer.BADGE_Y,
        });
        const numberPainter = new LevelDetailsNumberPainter(this.getLayer(names.smallNumbers));

        return new LevelDetailsConfigPrebake(this.getLayer(names.background), badgePainter, numberPainter);
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this._context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX level details layer '${name}'.`);

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
        const numberPainter = this._prebake.numberPainter;

        if (!bitmap || !numberPainter) return;

        const composer = new VariableFxBitmapComposer(bitmap);
        const digitCount = this.digitCount;
        const background = this._prebake.getBackgroundPrebake(digitCount, this.frameWidth);
        const progressBitmap = this._progressRenderer.frame.bitmap;
        const badgeRender = this.getCurrentBadgeRender();
        const numberPlan = this.createCurrentNumberRenderPlan();

        try {
            composer.clear(0);
            composer.drawLayer(background.bitmap, 0, 0, 'normal', 255);

            if (progressBitmap) composer.drawLayer(progressBitmap, this.progressX, LevelDetailsRenderer.BAR_Y, 'normal', 255);

            numberPainter.draw(composer, numberPlan, this.resolveNumberX(numberPlan), LevelDetailsRenderer.NUMBER_Y);

            this._prebake.badgePainter.drawBadge(composer, badgeRender, this.levelText, LevelDetailsRenderer.BADGE_X, LevelDetailsRenderer.BADGE_Y);

            this._lastRenderedDigitCount = digitCount;
            this._lastRenderedNumberKey = numberPlan.key;
        } finally {
            if (background.ownsPrebake) disposeBitmap(background.bitmap);
        }
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

    private hasFinalNumberRenderChange(): boolean {
        return this._numberProgress.isAtTarget(this._levelProgress.displayedPath) && this.createCurrentNumberRenderPlan().key !== this._lastRenderedNumberKey;
    }

    private createCurrentNumberRenderPlan(): LevelDetailsNumberRenderPlan {
        const display = this._numberProgress.resolveDisplay(this._levelProgress.displayedPath);
        const numberPainter = this._prebake.numberPainter;

        if (!numberPainter) return { key: 'empty', parts: [], width: 0 };

        return numberPainter.createRenderPlan(display.currentText, display.maxText, this.progressFrameWidth);
    }

    private resolveNumberX(plan: LevelDetailsNumberRenderPlan): number {
        return this.progressX + Math.trunc((this.progressFrameWidth - Math.trunc(plan.width)) / 2);
    }

    private updateProgressRendererData(context: VariableFxRendererContext, time: number): void {
        this._progressRenderer.updateData(this.createProgressRendererContext(context), time);
    }

    private createProgressRendererConfig(context: VariableFxRendererContext): VariableFxConfigData {
        const color = context.config.color === VariableFxPaintColors.DYNAMIC_LEVELLING ? VariableFxPaintColors.DYNAMIC_DELEGATED : context.config.color;

        return new VariableFxConfigData(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.CLASSIC_MINI_PROGRESS, VariableFxRendererName.CLASSIC_MINI_PROGRESS, context.config.width, color, 0, 1, this.createProgressRendererConfigExtra(context), context.config.categoryId, context.config.styleId, VariableFxRendererName.CLASSIC_MINI_PROGRESS_ID);
    }

    private createProgressRendererConfigExtra(context: VariableFxRendererContext): Map<string, string> {
        const extra = new Map<string, string>();
        const color = VariableFxPaintColors.readExtra(context.config.extra, 'color');
        const metallic = VariableFxPaintColors.readExtra(context.config.extra, 'metallic');

        if (color !== undefined) extra.set('color', color);
        if (metallic !== undefined) extra.set('metallic', metallic);

        return extra;
    }

    private createProgressRendererContext(context: VariableFxRendererContext): VariableFxRendererContext {
        const progress = this._levelProgress.displayedProgress;

        return new VariableFxRendererContext(context.assetProvider, this._progressRendererConfig, new VariableFxStatusData(progress, undefined, undefined, this.createProgressRendererStatusExtra(), true), 0, 1, progress, context.registry);
    }

    private updateLevelProgressTarget(context: VariableFxRendererContext, sample: LevelProgressPathSample, time: number): void {
        if (!this._levelProgressInitialized || context.status.isInitialize) {
            this._levelProgress.snapTo(sample, time);
            this._levelProgressInitialized = true;

            return;
        }

        this._levelProgress.setTarget(sample, time);
    }

    private updateNumberProgressTarget(context: VariableFxRendererContext, sample: LevelProgressPathSample): void {
        const target = {
            maxValue: context.maxValue,
            pathSample: sample,
            value: Math.min(context.maxValue, context.status.value),
        };

        if (context.status.isInitialize) {
            this._numberProgress.snapTo(target);

            return;
        }

        this._numberProgress.setTarget(target, this._levelProgress.displayedPath);
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

    private createProgressRendererStatusExtra(): Map<string, string> {
        const extra = new Map<string, string>();

        if (this._progressRendererConfig.color !== VariableFxPaintColors.DYNAMIC_DELEGATED) {
            const delegated = this._progressRendererConfig.color === VariableFxPaintColors.DYNAMIC_TEAM_COLOR ? VariableFxPaintColors.readExtra(this._context.status.extra, 'delegated_color') : undefined;

            if (delegated !== undefined) extra.set('delegated_color', delegated);

            return extra;
        }

        extra.set('delegated_color', this.formatRgbHex(this.displayedFrameArgb & 0xffffff));

        return extra;
    }

    private resolveClassicProgressBarFrameWidth(width: string): number {
        switch (width) {
            case VariableFxWidth.EXTRA_SMALL:
                return 29;
            case VariableFxWidth.SMALL:
                return 45;
            case VariableFxWidth.MEDIUM:
                return 61;
            case VariableFxWidth.LARGE:
                return 77;
            case VariableFxWidth.EXTRA_LARGE:
                return 93;
            default:
                return 61;
        }
    }

    private formatRgbHex(rgb: number): string {
        return '#' + (rgb & 0xffffff).toString(16).padStart(6, '0');
    }
}
