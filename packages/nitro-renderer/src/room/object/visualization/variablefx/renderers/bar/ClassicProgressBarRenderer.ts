import { createTransparentBitmap, disposeBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer, VariableFxBlendMode } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';
import { VariableFxConfiguredIcon } from '../../rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '../../rendering/VariableFxIconOverlayLayout';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxGenericRendererPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxWidth } from '../../VariableFxTables';
import { BarVariableFxRendererBase } from './BarVariableFxRendererBase';
import { VariableFxBarLayout, VariableFxBarOverlay, VariableFxBarSliceUtils } from './VariableFxBarLayout';

export interface ClassicBarAssetNames {
    background: string;
    bar: string;
    darkening: string;
    lighting: string;
    metallic: string | undefined;
}

export interface ClassicBarLayoutMetrics {
    fillX: number;
    fillY: number;
    sliceLeftWidth: number;
    sliceRightWidth: number;
}

export interface ClassicBarOverlaySlice {
    leftWidth: number;
    rightWidth: number;
}

interface ClassicBarAssets {
    background: VariableFxBitmap;
    bar: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    overlays: VariableFxBarOverlay[];
}

interface ClassicBarPrebakeData {
    assets: ClassicBarAssets;
    backgroundPrebake: VariableFxBitmap;
    barEndPrebake: VariableFxBitmap | undefined;
    barPrebake: VariableFxBitmap | undefined;
    icon: VariableFxConfiguredIcon | undefined;
    iconLayout: VariableFxIconOverlayLayout;
    layout: VariableFxBarLayout;
}

/**
 * The classic three-slice bar: background chrome, a tinted fill that stretches with progress,
 * darkening/lighting overlays on the fill and a separate bar-end cap that follows the fill's
 * right edge. Mini, health and boss bars only swap assets and metrics.
 */
export class ClassicProgressBarRenderer extends BarVariableFxRendererBase {
    private static CLASSIC_PROGRESS_BAR_ASSETS: ClassicBarAssetNames = {
        background: 'variablefx_classic_bar_background',
        bar: 'variablefx_classic_bar_fill',
        darkening: 'variablefx_classic_bar_darkening',
        lighting: 'variablefx_classic_bar_lighting',
        metallic: 'variablefx_classic_bar_metallic',
    };

    private static BASE_LAYOUT_METRICS: ClassicBarLayoutMetrics = {
        fillX: 1,
        fillY: 1,
        sliceLeftWidth: 2,
        sliceRightWidth: 2,
    };

    private static OVERLAY_SLICE: ClassicBarOverlaySlice = {
        leftWidth: 3,
        rightWidth: 3,
    };

    private _assets: ClassicBarAssets;
    private _backgroundPrebake: VariableFxBitmap;
    private _barCache: VariableFxBitmap | undefined = undefined;
    private _barCacheArgb: number = -1;
    private _barEndCache: VariableFxBitmap | undefined = undefined;
    private _barEndPrebake: VariableFxBitmap | undefined;
    private _barPrebake: VariableFxBitmap | undefined;
    private _icon: VariableFxConfiguredIcon | undefined;
    private _iconLayout: VariableFxIconOverlayLayout;
    private _layout: VariableFxBarLayout;

    constructor(context: VariableFxRendererContext) {
        super(context);

        const prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        const data = prebake.data;

        this._assets = data.assets;
        this._backgroundPrebake = data.backgroundPrebake;
        this._barEndPrebake = data.barEndPrebake;
        this._barPrebake = data.barPrebake;
        this._icon = data.icon;
        this._iconLayout = data.iconLayout;
        this._layout = data.layout;

        if (!this._barPrebake) {
            this._barCache = createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
            this._barEndCache = createTransparentBitmap(this.barEndWidthPx, this._layout.height);
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

    protected get assetNames(): ClassicBarAssetNames {
        return ClassicProgressBarRenderer.CLASSIC_PROGRESS_BAR_ASSETS;
    }

    protected get baseLayoutMetrics(): ClassicBarLayoutMetrics {
        return ClassicProgressBarRenderer.BASE_LAYOUT_METRICS;
    }

    protected get iconContentYOffsetPx(): number {
        return VariableFxConfiguredIcon.BAR_ICON_CONTENT_Y_OFFSET_PX;
    }

    protected get layerDescription(): string {
        return 'classic progress bar';
    }

    protected get overlaySlice(): ClassicBarOverlaySlice {
        return ClassicProgressBarRenderer.OVERLAY_SLICE;
    }

    protected get barEndWidthPx(): number {
        return 2;
    }

    protected get barEndMinimumFillWidthPx(): number {
        return 4;
    }

    protected get barBodyIncludesEndWidth(): boolean {
        return true;
    }

    protected get barEndSourceRightPaddingPx(): number {
        return 1;
    }

    protected get barEndBaseSourceRightPaddingPx(): number {
        return this.barEndSourceRightPaddingPx;
    }

    protected get usesSeparateBarEndOverlaySource(): boolean {
        return false;
    }

    protected override createFrameBitmap(width: number, height: number): VariableFxBitmap {
        return createTransparentBitmap(width, height);
    }

    protected override renderFrame(_time: number): void {
        const bitmap = this.mutableFrame.bitmap;

        if (!bitmap) return;

        const composer = new VariableFxBitmapComposer(bitmap);
        const filledWidth = this.calculateFilledPixelWidth();
        const contentX = this._iconLayout.contentX;
        const contentY = this._iconLayout.contentY;

        composer.drawLayer(this._backgroundPrebake, 0, 0, 'normal', 255);

        if (filledWidth > 0) {
            composer.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, 'normal', 255, this.resolveBarBodyClip(filledWidth));

            if (this.shouldDrawBarEnd(filledWidth)) {
                composer.drawLayer(this.resolveBarEndPrebakeOrCache(), contentX + toInt(this._layout.fillX) + filledWidth - this.barEndWidthPx, contentY, 'normal', 255, this.resolveBarEndClip());
            }
        }

        this.drawIconOverlay(composer, this._layout, this._iconLayout, this._icon);
    }

    public override dispose(): void {
        super.dispose();

        disposeBitmap(this._barCache);
        disposeBitmap(this._barEndCache);

        this._barCache = undefined;
        this._barEndCache = undefined;
    }

    protected drawIconOverlay(composer: VariableFxBitmapComposer, _layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout, icon: VariableFxConfiguredIcon | undefined): void {
        if (!icon) return;

        composer.drawLayer(icon.bitmap, iconLayout.iconX, iconLayout.iconY, 'normal', 255);
    }

    protected resolveFrameWidth(width: string): number {
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

    protected resolveMetallicOverlays(darkening: VariableFxBitmap, lighting: VariableFxBitmap): VariableFxBarOverlay[] {
        return [
            { blendMode: 'add', layer: lighting },
            { blendMode: 'multiply', layer: darkening },
            { blendMode: 'add', layer: lighting },
            { blendMode: 'multiply', layer: darkening },
        ];
    }

    protected resolveNormalOverlays(darkening: VariableFxBitmap, lighting: VariableFxBitmap): VariableFxBarOverlay[] {
        return [
            { blendMode: 'multiply', layer: darkening },
            { blendMode: 'add', layer: lighting },
        ];
    }

    private createPrebake(context: VariableFxRendererContext): VariableFxGenericRendererPrebake<ClassicBarPrebakeData> {
        const layout = this.resolveLayout(context.config.width);
        const assets = this.resolveAssets();
        const icon = VariableFxConfiguredIcon.resolve(context);
        const iconLayout = this.resolveIconOverlayLayout(layout, icon);
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const isDynamicPaint = VariableFxPaintColors.isDynamicPaintColor(context.config.color);
        const backgroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barPrebake = isDynamicPaint ? undefined : createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barEndPrebake = isDynamicPaint ? undefined : createTransparentBitmap(this.barEndWidthPx, layout.height);

        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);

        if (barPrebake && barEndPrebake) {
            this.drawBarBitmap(barPrebake, barEndPrebake, (0xff000000 | paintColor.rgb) >>> 0, assets, layout, iconLayout);
        }

        return new VariableFxGenericRendererPrebake<ClassicBarPrebakeData>({
            assets,
            backgroundPrebake,
            barEndPrebake,
            barPrebake,
            icon,
            iconLayout,
            layout,
        }, () => {
            disposeBitmap(backgroundPrebake);
            disposeBitmap(barPrebake);
            disposeBitmap(barEndPrebake);
        });
    }

    private prebakeBackground(target: VariableFxBitmap, assets: ClassicBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(layout), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(layout), layout.width, iconLayout.contentX, iconLayout.contentY, 'normal', 255);
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

    private resolveDynamicBarCaches(): void {
        const argb = this.displayedFillArgb;

        if (this._barCacheArgb === argb || !this._barCache || !this._barEndCache) return;

        this._barCacheArgb = argb;

        this.drawBarBitmap(this._barCache, this._barEndCache, argb, this._assets, this._layout, this._iconLayout);
    }

    private drawBarBitmap(target: VariableFxBitmap, barEndTarget: VariableFxBitmap, argb: number, assets: ClassicBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);
        const contentX = iconLayout.contentX;
        const contentY = iconLayout.contentY;
        const fullClip = this.resolveFullFillClip(layout, iconLayout);

        composer.clear(0);
        composer.drawThreeSlice(assets.bar, layout.sliceLeftWidth, layout.sliceRightWidth, layout.fillWidth, contentX + toInt(layout.fillX), contentY + toInt(layout.fillY), 'normal', 255, fullClip, argb);

        if (assets.metallic) this.drawOverlayLayer(composer, assets.metallic, 'add', layout.fillWidth, contentX, contentY, layout);

        for (const overlay of assets.overlays) this.drawOverlayLayer(composer, overlay.layer, overlay.blendMode, layout.fillWidth, contentX, contentY, layout);

        this.drawBarEndBitmap(barEndTarget, target, assets, layout, iconLayout);
    }

    private drawBarEndBitmap(target: VariableFxBitmap, barBitmap: VariableFxBitmap, assets: ClassicBarAssets, layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);
        const sourceY = iconLayout.contentY;

        let sourceX = iconLayout.contentX + toInt(layout.width) - this.barEndSourceRightPaddingPx - this.barEndWidthPx;

        composer.clear(0);

        if (this.usesSeparateBarEndOverlaySource) {
            sourceX = iconLayout.contentX + toInt(layout.width) - this.barEndBaseSourceRightPaddingPx - this.barEndWidthPx;

            composer.drawLayer(barBitmap, -sourceX, -sourceY, 'normal', 255);

            if (assets.metallic) this.drawOverlayEndLayer(composer, assets.metallic, 'add', layout);

            for (const overlay of assets.overlays) this.drawOverlayEndLayer(composer, overlay.layer, overlay.blendMode, layout);

            return;
        }

        composer.drawLayer(barBitmap, -sourceX, -sourceY, 'normal', 255);
    }

    private drawOverlayEndLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap, blendMode: VariableFxBlendMode, layout: VariableFxBarLayout): void {
        const offset = toInt(layout.fillWidth) - this.barEndSourceRightPaddingPx - this.barEndWidthPx;

        composer.drawThreeSlice(layer, this.overlaySlice.leftWidth, this.overlaySlice.rightWidth, layout.fillWidth, -offset, layout.fillY, blendMode, 255);
    }

    private drawOverlayLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap, blendMode: VariableFxBlendMode, width: number, contentX: number, contentY: number, layout: VariableFxBarLayout, clip?: VariableFxClipRect): void {
        if (width <= 0) return;

        const drawWidth = Math.min(toInt(layout.fillWidth), width);

        composer.drawThreeSlice(layer, this.overlaySlice.leftWidth, this.overlaySlice.rightWidth, drawWidth, contentX + toInt(layout.fillX), contentY + toInt(layout.fillY), blendMode, 255, clip);
    }

    private resolveBarBodyClip(filledWidth: number): VariableFxClipRect {
        const width = this.barBodyIncludesEndWidth ? filledWidth : Math.max(0, filledWidth - this.barEndWidthPx);

        return new VariableFxClipRect(this._iconLayout.contentX + toInt(this._layout.fillX), this._iconLayout.contentY + toInt(this._layout.fillY), width, this._layout.fillHeight);
    }

    private shouldDrawBarEnd(filledWidth: number): boolean {
        return filledWidth >= this.barEndMinimumFillWidthPx;
    }

    private resolveBarEndClip(): VariableFxClipRect {
        return new VariableFxClipRect(this._iconLayout.contentX + toInt(this._layout.fillX), this._iconLayout.contentY + toInt(this._layout.fillY), this._layout.fillWidth, this._layout.fillHeight);
    }

    private resolveFullFillClip(layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout): VariableFxClipRect {
        return new VariableFxClipRect(iconLayout.contentX + toInt(layout.fillX), iconLayout.contentY + toInt(layout.fillY), layout.fillWidth, layout.fillHeight);
    }

    private resolveAssets(): ClassicBarAssets {
        const paintColor = VariableFxPaintColors.resolvePaintColor(this.context.config.color, this.context.config.extra);
        const names = this.assetNames;
        const darkening = this.getLayer(names.darkening);
        const lighting = this.getLayer(names.lighting);
        const isMetallic = paintColor.isMetallic;

        return {
            background: this.getLayer(names.background),
            bar: this.getLayer(names.bar),
            metallic: isMetallic && names.metallic ? this.getLayer(names.metallic) : undefined,
            overlays: isMetallic ? this.resolveMetallicOverlays(darkening, lighting) : this.resolveNormalOverlays(darkening, lighting),
        };
    }

    protected getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX ${this.layerDescription} layer '${name}'.`);

        return bitmap;
    }

    private resolveLayout(width: string): VariableFxBarLayout {
        const background = this.context.assetProvider?.getBitmap(this.assetNames.background);
        const metrics = this.baseLayoutMetrics;
        const frameWidth = this.resolveFrameWidth(width);

        if (!background) throw new Error(`Missing Variable FX ${this.layerDescription} background layer for layout resolution.`);

        const fillHeight = Math.max(1, background.height - toInt(metrics.fillY) * 2);

        return {
            fillHeight,
            fillWidth: Math.max(0, frameWidth - toInt(metrics.fillX) * 2),
            fillX: toInt(metrics.fillX),
            fillY: toInt(metrics.fillY),
            height: background.height,
            sliceLeftWidth: toInt(metrics.sliceLeftWidth),
            sliceRightWidth: toInt(metrics.sliceRightWidth),
            width: frameWidth,
        };
    }

    protected resolveIconOverlayLayout(layout: VariableFxBarLayout, icon: VariableFxConfiguredIcon | undefined): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(layout.width, layout.height, icon, VariableFxConfiguredIcon.resolveAlignment(this.context), this.iconContentYOffsetPx);
    }
}
