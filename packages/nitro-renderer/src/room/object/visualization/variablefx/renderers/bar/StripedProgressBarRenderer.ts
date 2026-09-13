import { createTransparentBitmap, disposeBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer, VariableFxBlendMode } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';
import { VariableFxColorUtils } from '../../rendering/VariableFxColorUtils';
import { VariableFxConfiguredIcon } from '../../rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '../../rendering/VariableFxIconOverlayLayout';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxGenericRendererPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxWidth } from '../../VariableFxTables';
import { BarVariableFxRendererBase } from './BarVariableFxRendererBase';
import { VariableFxBarLayout, VariableFxBarSliceUtils } from './VariableFxBarLayout';

interface StripedBarAssets {
    background: VariableFxBitmap;
    bar: VariableFxBitmap;
    darkening: VariableFxBitmap;
    lighting: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    stripe: VariableFxBitmap;
}

interface StripedBarOverlay {
    blendMode: VariableFxBlendMode;
    layer: VariableFxBitmap;
    sliceLeftWidth: number;
    sliceRightWidth: number;
}

interface StripedBarPrebakeData {
    assets: StripedBarAssets;
    backgroundPrebake: VariableFxBitmap;
    barEndPrebake: VariableFxBitmap | undefined;
    barPrebake: VariableFxBitmap | undefined;
    barShapePrebake: VariableFxBitmap;
    foregroundPrebake: VariableFxBitmap | undefined;
    iconLayout: VariableFxIconOverlayLayout;
    layout: VariableFxBarLayout;
    overlays: StripedBarOverlay[];
    stripesOverlayPrebake: VariableFxBitmap | undefined;
    stripesOverlayShapePrebake: VariableFxBitmap;
}

/** A bar with diagonal stripes that scroll across the fill (one 10px period every 700ms). */
export class StripedProgressBarRenderer extends BarVariableFxRendererBase {
    private static FRAME_HEIGHT: number = 13;
    private static CHROME_EDGE_WIDTH: number = 3;
    private static FILL_Y: number = 3;
    private static FILL_HEIGHT: number = 7;
    private static FILL_OVERLAY_SLICE_WIDTH: number = 3;
    private static LIGHTING_SLICE_LEFT_WIDTH: number = 9;
    private static BAR_END_WIDTH: number = 2;
    private static BAR_END_MINIMUM_FILL_WIDTH: number = 4;
    private static STRIPE_PERIOD_PX: number = 10;
    private static STRIPE_STEP_MS: number = 70;
    private static STRIPE_VALUE_SCALE: number = 0.5;

    private static STRIPED_PROGRESS_BAR_ASSETS = {
        background: 'variablefx_striped_bar_background',
        bar: 'variablefx_striped_bar_fill',
        darkening: 'variablefx_striped_bar_darkening',
        darkeningMetallic: 'variablefx_striped_bar_darkening_metallic',
        lighting: 'variablefx_striped_bar_lighting',
        lightingMetallic: 'variablefx_striped_bar_lighting_metallic',
        metallic: 'variablefx_striped_bar_metallic',
        stripe: 'variablefx_striped_bar_stripe',
    };

    private _assets: StripedBarAssets;
    private _backgroundPrebake: VariableFxBitmap;
    private _barCache: VariableFxBitmap | undefined = undefined;
    private _barCacheArgb: number = -1;
    private _barEndCache: VariableFxBitmap | undefined = undefined;
    private _barEndPrebake: VariableFxBitmap | undefined;
    private _barPrebake: VariableFxBitmap | undefined;
    private _barShapePrebake: VariableFxBitmap;
    private _foregroundPrebake: VariableFxBitmap | undefined;
    private _iconLayout: VariableFxIconOverlayLayout;
    private _lastRenderedStripePhase: number = -1;
    private _layout: VariableFxBarLayout;
    private _overlays: StripedBarOverlay[];
    private _stripesOverlayCache: VariableFxBitmap | undefined = undefined;
    private _stripesOverlayCacheArgb: number = -1;
    private _stripesOverlayPrebake: VariableFxBitmap | undefined;
    private _stripesOverlayShapePrebake: VariableFxBitmap;

    constructor(context: VariableFxRendererContext) {
        super(context);

        const prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        const data = prebake.data;

        this._assets = data.assets;
        this._backgroundPrebake = data.backgroundPrebake;
        this._barEndPrebake = data.barEndPrebake;
        this._barPrebake = data.barPrebake;
        this._barShapePrebake = data.barShapePrebake;
        this._foregroundPrebake = data.foregroundPrebake;
        this._iconLayout = data.iconLayout;
        this._layout = data.layout;
        this._overlays = data.overlays;
        this._stripesOverlayPrebake = data.stripesOverlayPrebake;
        this._stripesOverlayShapePrebake = data.stripesOverlayShapePrebake;

        if (!this._barPrebake) {
            this._barCache = createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
            this._barEndCache = createTransparentBitmap(StripedProgressBarRenderer.BAR_END_WIDTH, this._iconLayout.frameHeight);
        }

        if (!this._stripesOverlayPrebake) {
            this._stripesOverlayCache = createTransparentBitmap(this._stripesOverlayShapePrebake.width, this._stripesOverlayShapePrebake.height);
        }
    }

    public static resolveStripedProgressBarFrameWidth(width: string): number {
        switch (width) {
            case VariableFxWidth.EXTRA_SMALL:
                return 29;
            case VariableFxWidth.SMALL:
                return 37;
            case VariableFxWidth.MEDIUM:
                return 53;
            case VariableFxWidth.LARGE:
                return 69;
            case VariableFxWidth.EXTRA_LARGE:
                return 85;
            default:
                return 53;
        }
    }

    protected override get frameWidth(): number {
        return this._iconLayout.frameWidth;
    }

    protected override get frameHeight(): number {
        return this._iconLayout.frameHeight;
    }

    protected override get progressPixelWidth(): number {
        return toInt(this._layout.fillWidth);
    }

    public override get isContinuous(): boolean {
        return this.calculateFilledPixelWidth() > 0;
    }

    protected override renderFrame(time: number): void {
        const bitmap = this.mutableFrame.bitmap;

        if (!bitmap) return;

        const composer = new VariableFxBitmapComposer(bitmap);
        const filledWidth = this.calculateFilledPixelWidth();

        composer.drawLayer(this._backgroundPrebake, 0, 0, 'normal', 255);

        if (filledWidth > 0) {
            const clip = this.createFillClip(filledWidth);

            composer.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, 'normal', 255, clip);

            if (this.shouldDrawBarEnd(filledWidth)) {
                composer.drawLayer(this.resolveBarEndPrebakeOrCache(), this._iconLayout.contentX + toInt(this._layout.fillX) + filledWidth - StripedProgressBarRenderer.BAR_END_WIDTH, 0, 'normal', 255, this.createFillClip(this._layout.fillWidth));
            }

            composer.drawLayer(this.resolveStripesOverlayPrebakeOrCache(), this.resolveStripeLayerX(time), 0, 'multiply', 255, clip);
        }

        if (this._foregroundPrebake) composer.drawLayer(this._foregroundPrebake, 0, 0, 'normal', 255);
    }

    protected override hasRendererSpecificRenderChange(time: number): boolean {
        return this.calculateFilledPixelWidth() > 0 && this.resolveStripePhase(time) !== this._lastRenderedStripePhase;
    }

    protected override didRenderFrame(time: number): void {
        this._lastRenderedStripePhase = this.resolveStripePhase(time);
    }

    public override dispose(): void {
        super.dispose();

        disposeBitmap(this._barCache);
        disposeBitmap(this._barEndCache);
        disposeBitmap(this._stripesOverlayCache);

        this._barCache = undefined;
        this._barEndCache = undefined;
        this._stripesOverlayCache = undefined;
    }

    private createPrebake(context: VariableFxRendererContext): VariableFxGenericRendererPrebake<StripedBarPrebakeData> {
        const layout = this.resolveLayout(context.config.width);
        const assets = this.resolveAssets();
        const icon = VariableFxConfiguredIcon.resolve(context);
        const iconLayout = this.resolveIconOverlayLayout(layout, icon);
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const overlays = this.resolveOverlays(assets);
        const isDynamicPaint = VariableFxPaintColors.isDynamicPaintColor(context.config.color);
        const backgroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barShapePrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const foregroundPrebake = iconLayout.hasIcon ? createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight) : undefined;
        const stripesOverlayShapePrebake = createTransparentBitmap(iconLayout.frameWidth + StripedProgressBarRenderer.STRIPE_PERIOD_PX + assets.stripe.width, iconLayout.frameHeight);
        const barPrebake = isDynamicPaint ? undefined : createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barEndPrebake = isDynamicPaint ? undefined : createTransparentBitmap(StripedProgressBarRenderer.BAR_END_WIDTH, iconLayout.frameHeight);
        const stripesOverlayPrebake = isDynamicPaint ? undefined : createTransparentBitmap(stripesOverlayShapePrebake.width, stripesOverlayShapePrebake.height);

        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeBarShape(barShapePrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, icon, iconLayout);
        this.prebakeStripesOverlayShape(stripesOverlayShapePrebake, assets, layout, iconLayout);

        if (barPrebake && barEndPrebake && stripesOverlayPrebake) {
            this.drawBarBitmap(barPrebake, barEndPrebake, (0xff000000 | paintColor.rgb) >>> 0, barShapePrebake, assets, overlays, layout, iconLayout);
            this.drawStripesOverlayBitmap(stripesOverlayPrebake, (0xff000000 | this.resolveStripeRgb(paintColor.rgb)) >>> 0, stripesOverlayShapePrebake);
        }

        return new VariableFxGenericRendererPrebake<StripedBarPrebakeData>({
            assets,
            backgroundPrebake,
            barEndPrebake,
            barPrebake,
            barShapePrebake,
            foregroundPrebake,
            iconLayout,
            layout,
            overlays,
            stripesOverlayPrebake,
            stripesOverlayShapePrebake,
        }, () => {
            disposeBitmap(backgroundPrebake);
            disposeBitmap(barShapePrebake);
            disposeBitmap(stripesOverlayShapePrebake);
            disposeBitmap(barPrebake);
            disposeBitmap(barEndPrebake);
            disposeBitmap(foregroundPrebake);
            disposeBitmap(stripesOverlayPrebake);
        });
    }

    private prebakeBackground(target: VariableFxBitmap, assets: StripedBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(layout), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(layout), layout.width, iconLayout.contentX, iconLayout.contentY, 'normal', 255);
    }

    private prebakeBarShape(target: VariableFxBitmap, assets: StripedBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.bar, layout.sliceLeftWidth, layout.sliceRightWidth, layout.fillWidth, iconLayout.contentX + toInt(layout.fillX), iconLayout.contentY + toInt(layout.fillY), 'normal', 255);
    }

    private prebakeForeground(target: VariableFxBitmap | undefined, icon: VariableFxConfiguredIcon | undefined, iconLayout: VariableFxIconOverlayLayout): void {
        if (!target || !icon) return;

        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawLayer(icon.bitmap, iconLayout.iconX, iconLayout.iconY, 'normal', 255);
    }

    private prebakeStripesOverlayShape(target: VariableFxBitmap, assets: StripedBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        for (let x = 0; x <= toInt(layout.fillWidth) + StripedProgressBarRenderer.STRIPE_PERIOD_PX; x += StripedProgressBarRenderer.STRIPE_PERIOD_PX) {
            composer.drawLayer(assets.stripe, iconLayout.contentX + toInt(layout.fillX) + x, iconLayout.contentY + toInt(layout.fillY), 'normal', 255);
        }
    }

    private resolveBarPrebakeOrCache(): VariableFxBitmap {
        if (this._barPrebake) return this._barPrebake;

        this.resolveDynamicBarCaches();

        return this._barCache!;
    }

    private resolveBarEndPrebakeOrCache(): VariableFxBitmap {
        if (this._barEndPrebake) return this._barEndPrebake;

        this.resolveDynamicBarCaches();

        return this._barEndCache!;
    }

    private resolveStripesOverlayPrebakeOrCache(): VariableFxBitmap {
        if (this._stripesOverlayPrebake) return this._stripesOverlayPrebake;

        const argb = (0xff000000 | this.resolveStripeRgb(this.displayedFillArgb & 0xffffff)) >>> 0;

        if (this._stripesOverlayCacheArgb !== argb && this._stripesOverlayCache) {
            this._stripesOverlayCacheArgb = argb;

            this.drawStripesOverlayBitmap(this._stripesOverlayCache, argb, this._stripesOverlayShapePrebake);
        }

        return this._stripesOverlayCache!;
    }

    private resolveDynamicBarCaches(): void {
        const argb = this.displayedFillArgb;

        if (this._barCacheArgb === argb || !this._barCache || !this._barEndCache) return;

        this._barCacheArgb = argb;

        this.drawBarBitmap(this._barCache, this._barEndCache, argb, this._barShapePrebake, this._assets, this._overlays, this._layout, this._iconLayout);
    }

    private drawBarBitmap(target: VariableFxBitmap, barEndTarget: VariableFxBitmap, argb: number, barShape: VariableFxBitmap, assets: StripedBarAssets, overlays: StripedBarOverlay[], layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawTintedLayer(barShape, 0, 0, argb, 'normal', 255);

        if (assets.metallic) this.drawFullFillLayer(composer, assets.metallic, 'add', layout, iconLayout, StripedProgressBarRenderer.LIGHTING_SLICE_LEFT_WIDTH, StripedProgressBarRenderer.FILL_OVERLAY_SLICE_WIDTH);

        for (const overlay of overlays) this.drawFullFillLayer(composer, overlay.layer, overlay.blendMode, layout, iconLayout, overlay.sliceLeftWidth, overlay.sliceRightWidth);

        this.drawBarEndBitmap(barEndTarget, target, layout, iconLayout);
    }

    private drawStripesOverlayBitmap(target: VariableFxBitmap, argb: number, shape: VariableFxBitmap): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawTintedLayer(shape, 0, 0, argb, 'normal', 255);
    }

    private drawBarEndBitmap(target: VariableFxBitmap, barBitmap: VariableFxBitmap, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawLayer(barBitmap, -(iconLayout.contentX + toInt(layout.fillX) + toInt(layout.fillWidth) - StripedProgressBarRenderer.BAR_END_WIDTH), 0, 'normal', 255);
    }

    private drawFullFillLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap, blendMode: VariableFxBlendMode, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout, sliceLeftWidth: number, sliceRightWidth: number): void {
        composer.drawRepeatedThreeSlice(layer, sliceLeftWidth, sliceRightWidth, layout.fillWidth, iconLayout.contentX + toInt(layout.fillX), iconLayout.contentY + toInt(layout.fillY), blendMode, 255);
    }

    private createFillClip(width: number, layout?: VariableFxBarLayout, iconLayout?: VariableFxIconOverlayLayout): VariableFxClipRect {
        const resolvedLayout = layout ?? this._layout;
        const resolvedIconLayout = iconLayout ?? this._iconLayout;

        return new VariableFxClipRect(resolvedIconLayout.contentX + toInt(resolvedLayout.fillX), resolvedIconLayout.contentY + toInt(resolvedLayout.fillY), width, resolvedLayout.fillHeight);
    }

    private shouldDrawBarEnd(filledWidth: number): boolean {
        return filledWidth >= StripedProgressBarRenderer.BAR_END_MINIMUM_FILL_WIDTH;
    }

    private resolveStripeLayerX(time: number): number {
        return this.resolveStripePhase(time) - StripedProgressBarRenderer.STRIPE_PERIOD_PX;
    }

    private resolveStripePhase(time: number): number {
        if (time <= 0) return 0;

        return Math.trunc(time / StripedProgressBarRenderer.STRIPE_STEP_MS) % StripedProgressBarRenderer.STRIPE_PERIOD_PX;
    }

    private resolveStripeRgb(rgb: number): number {
        return VariableFxColorUtils.scaleRgbValueInHsv(rgb, StripedProgressBarRenderer.STRIPE_VALUE_SCALE);
    }

    private resolveAssets(): StripedBarAssets {
        const paintColor = VariableFxPaintColors.resolvePaintColor(this.context.config.color, this.context.config.extra);
        const names = StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS;
        const isMetallic = paintColor.isMetallic;

        return {
            background: this.getLayer(names.background),
            bar: this.getLayer(names.bar),
            darkening: isMetallic ? this.getLayer(names.darkeningMetallic) : this.getLayer(names.darkening),
            lighting: isMetallic ? this.getLayer(names.lightingMetallic) : this.getLayer(names.lighting),
            metallic: isMetallic ? this.getLayer(names.metallic) : undefined,
            stripe: this.getLayer(names.stripe),
        };
    }

    private resolveOverlays(assets: StripedBarAssets): StripedBarOverlay[] {
        return [
            { blendMode: 'multiply', layer: assets.darkening, sliceLeftWidth: StripedProgressBarRenderer.FILL_OVERLAY_SLICE_WIDTH, sliceRightWidth: StripedProgressBarRenderer.FILL_OVERLAY_SLICE_WIDTH },
            { blendMode: 'add', layer: assets.lighting, sliceLeftWidth: StripedProgressBarRenderer.LIGHTING_SLICE_LEFT_WIDTH, sliceRightWidth: StripedProgressBarRenderer.FILL_OVERLAY_SLICE_WIDTH },
        ];
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX striped progress bar layer '${name}'.`);

        return bitmap;
    }

    private resolveLayout(width: string): VariableFxBarLayout {
        const frameWidth = StripedProgressBarRenderer.resolveStripedProgressBarFrameWidth(width);

        return {
            fillHeight: StripedProgressBarRenderer.FILL_HEIGHT,
            fillWidth: Math.max(0, frameWidth - StripedProgressBarRenderer.CHROME_EDGE_WIDTH * 2),
            fillX: StripedProgressBarRenderer.CHROME_EDGE_WIDTH,
            fillY: StripedProgressBarRenderer.FILL_Y,
            height: StripedProgressBarRenderer.FRAME_HEIGHT,
            sliceLeftWidth: 3,
            sliceRightWidth: 3,
            width: frameWidth,
        };
    }

    private resolveIconOverlayLayout(layout: VariableFxBarLayout, icon: VariableFxConfiguredIcon | undefined): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(layout.width, layout.height, icon, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }
}
