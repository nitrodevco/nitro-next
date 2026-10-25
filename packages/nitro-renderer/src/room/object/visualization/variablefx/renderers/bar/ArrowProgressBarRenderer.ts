import { createTransparentBitmap, disposeBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';
import { VariableFxConfiguredIcon } from '../../rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '../../rendering/VariableFxIconOverlayLayout';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxGenericRendererPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxSegmentedProgress } from '../../VariableFxSegmentedProgress';
import { VariableFxWidth } from '../../VariableFxTables';
import { BarVariableFxRendererBase } from './BarVariableFxRendererBase';
import { VariableFxBarLayout, VariableFxBarOverlay, VariableFxBarSliceUtils } from './VariableFxBarLayout';

interface ArrowBarLayout extends VariableFxBarLayout {
    arrowCount: number;
}

interface ArrowBarAssets {
    background: VariableFxBitmap;
    barChunk: VariableFxBitmap;
    darkening: VariableFxBitmap;
    lighting: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    splitter: VariableFxBitmap;
    splitterLeft: VariableFxBitmap;
}

interface ArrowBarPrebakeData {
    assets: ArrowBarAssets;
    backgroundPrebake: VariableFxBitmap;
    barPrebake: VariableFxBitmap | undefined;
    foregroundPrebake: VariableFxBitmap;
    iconLayout: VariableFxIconOverlayLayout;
    layout: ArrowBarLayout;
    overlays: VariableFxBarOverlay[];
}

/** A bar made of arrow-shaped chunks (9px apart) with splitter chevrons drawn over the fill. */
export class ArrowProgressBarRenderer extends BarVariableFxRendererBase {
    private static FRAME_HEIGHT: number = 13;
    private static CHROME_EDGE_WIDTH: number = 3;
    private static FILL_Y: number = 3;
    private static FILL_HEIGHT: number = 7;
    private static ARROW_WIDTH: number = 9;
    private static BAR_CHUNK_WIDTH: number = 11;
    private static SPLITTER_START_X: number = 7;

    private static ARROW_PROGRESS_BAR_ASSETS = {
        background: 'variablefx_arrow_bar_background',
        barChunk: 'variablefx_arrow_bar_chunk',
        darkening: 'variablefx_arrow_bar_darkening',
        lighting: 'variablefx_arrow_bar_lighting',
        metallic: 'variablefx_arrow_bar_metallic',
        splitter: 'variablefx_arrow_bar_splitter',
        splitterLeft: 'variablefx_arrow_bar_splitter_left',
    };

    private _assets: ArrowBarAssets;
    private _backgroundPrebake: VariableFxBitmap;
    private _barCache: VariableFxBitmap | undefined = undefined;
    private _barCacheArgb: number = -1;
    private _barPrebake: VariableFxBitmap | undefined;
    private _foregroundPrebake: VariableFxBitmap;
    private _iconLayout: VariableFxIconOverlayLayout;
    private _layout: ArrowBarLayout;
    private _overlays: VariableFxBarOverlay[];

    constructor(context: VariableFxRendererContext) {
        super(context);

        const prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        const data = prebake.data;

        this._assets = data.assets;
        this._backgroundPrebake = data.backgroundPrebake;
        this._barPrebake = data.barPrebake;
        this._foregroundPrebake = data.foregroundPrebake;
        this._iconLayout = data.iconLayout;
        this._layout = data.layout;
        this._overlays = data.overlays;

        if (!this._barPrebake) this._barCache = createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
    }

    public static resolveArrowProgressBarArrowCount(width: string, extra: Map<string, string> | undefined): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(width, extra, value => ArrowProgressBarRenderer.resolveDefaultArrowProgressBarArrowCount(value));
    }

    public static resolveArrowProgressBarFrameWidth(width: string, extra: Map<string, string> | undefined): number {
        return ArrowProgressBarRenderer.CHROME_EDGE_WIDTH * 2 + ArrowProgressBarRenderer.resolveArrowProgressBarArrowCount(width, extra) * ArrowProgressBarRenderer.ARROW_WIDTH;
    }

    private static resolveDefaultArrowProgressBarArrowCount(width: string): number {
        switch (width) {
            case VariableFxWidth.EXTRA_SMALL:
                return 3;
            case VariableFxWidth.SMALL:
                return 4;
            case VariableFxWidth.MEDIUM:
                return 6;
            case VariableFxWidth.LARGE:
                return 8;
            case VariableFxWidth.EXTRA_LARGE:
                return 10;
            default:
                return 6;
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

    protected override renderFrame(_time: number): void {
        const bitmap = this.mutableFrame.bitmap;

        if (!bitmap) return;

        const composer = new VariableFxBitmapComposer(bitmap);
        const filledWidth = this.calculateFilledPixelWidth();

        composer.drawLayer(this._backgroundPrebake, 0, 0, 'normal', 255);

        if (filledWidth > 0) composer.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, 'normal', 255, this.createFillClip(filledWidth));

        composer.drawLayer(this._foregroundPrebake, 0, 0, 'normal', 255);
    }

    public override dispose(): void {
        super.dispose();

        disposeBitmap(this._barCache);

        this._barCache = undefined;
    }

    private createPrebake(context: VariableFxRendererContext): VariableFxGenericRendererPrebake<ArrowBarPrebakeData> {
        const layout = this.resolveLayout(context.config.width, context.config.extra);
        const assets = this.resolveAssets();
        const icon = VariableFxConfiguredIcon.resolve(context);
        const iconLayout = this.resolveIconOverlayLayout(layout, icon);
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const overlays = this.resolveOverlays(assets, paintColor.isMetallic);
        const isDynamicPaint = VariableFxPaintColors.isDynamicPaintColor(context.config.color);
        const backgroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const foregroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barPrebake = isDynamicPaint ? undefined : createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);

        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, assets, layout, iconLayout, icon);

        if (barPrebake) this.drawBarBitmap(barPrebake, (0xff000000 | paintColor.rgb) >>> 0, assets, overlays, layout, iconLayout);

        return new VariableFxGenericRendererPrebake<ArrowBarPrebakeData>({
            assets,
            backgroundPrebake,
            barPrebake,
            foregroundPrebake,
            iconLayout,
            layout,
            overlays,
        }, () => {
            disposeBitmap(backgroundPrebake);
            disposeBitmap(foregroundPrebake);
            disposeBitmap(barPrebake);
        });
    }

    private prebakeBackground(target: VariableFxBitmap, assets: ArrowBarAssets, layout: ArrowBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(layout), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(layout), layout.width, iconLayout.contentX, iconLayout.contentY, 'normal', 255);
    }

    private prebakeForeground(target: VariableFxBitmap, assets: ArrowBarAssets, layout: ArrowBarLayout, iconLayout: VariableFxIconOverlayLayout, icon: VariableFxConfiguredIcon | undefined): void {
        const composer = new VariableFxBitmapComposer(target);
        const clip = this.createFillClip(layout.fillWidth, layout, iconLayout);

        composer.clear(0);
        composer.drawLayer(assets.splitterLeft, iconLayout.contentX + toInt(layout.fillX), iconLayout.contentY + toInt(layout.fillY), 'normal', 255, clip);

        for (let x = ArrowProgressBarRenderer.SPLITTER_START_X; x < toInt(layout.fillWidth); x += ArrowProgressBarRenderer.ARROW_WIDTH) {
            composer.drawLayer(assets.splitter, iconLayout.contentX + toInt(layout.fillX) + x, iconLayout.contentY + toInt(layout.fillY), 'normal', 255, clip);
        }

        if (icon) composer.drawLayer(icon.bitmap, iconLayout.iconX, iconLayout.iconY, 'normal', 255);
    }

    private resolveBarPrebakeOrCache(): VariableFxBitmap {
        if (this._barPrebake) return this._barPrebake;

        const argb = this.displayedFillArgb;

        if (this._barCacheArgb !== argb && this._barCache) {
            this._barCacheArgb = argb;

            this.drawBarBitmap(this._barCache, argb, this._assets, this._overlays, this._layout, this._iconLayout);
        }

        return this._barCache!;
    }

    private drawBarBitmap(target: VariableFxBitmap, argb: number, assets: ArrowBarAssets, overlays: VariableFxBarOverlay[], layout: ArrowBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const chunk = this.createBarChunkBitmap(argb, assets, overlays);
        const clip = this.createFillClip(layout.fillWidth, layout, iconLayout);
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        for (let x = 0; x < toInt(layout.fillWidth); x += ArrowProgressBarRenderer.ARROW_WIDTH) {
            composer.drawLayer(chunk, iconLayout.contentX + toInt(layout.fillX) + x, iconLayout.contentY + toInt(layout.fillY), 'normal', 255, clip);
        }

        disposeBitmap(chunk);
    }

    private createBarChunkBitmap(argb: number, assets: ArrowBarAssets, overlays: VariableFxBarOverlay[]): VariableFxBitmap {
        const chunk = createTransparentBitmap(ArrowProgressBarRenderer.BAR_CHUNK_WIDTH, ArrowProgressBarRenderer.FILL_HEIGHT);
        const composer = new VariableFxBitmapComposer(chunk);

        composer.clear(0);
        composer.drawTintedLayer(assets.barChunk, 0, 0, argb, 'normal', 255);

        if (assets.metallic) composer.drawLayer(assets.metallic, 0, 0, 'add', 255);

        for (const overlay of overlays) composer.drawLayer(overlay.layer, 0, 0, overlay.blendMode, 255);

        return chunk;
    }

    private createFillClip(width: number = -1, layout?: ArrowBarLayout, iconLayout?: VariableFxIconOverlayLayout): VariableFxClipRect {
        const resolvedLayout = layout ?? this._layout;
        const resolvedIconLayout = iconLayout ?? this._iconLayout;
        const clipWidth = width < 0 ? toInt(resolvedLayout.fillWidth) : width;

        return new VariableFxClipRect(resolvedIconLayout.contentX + toInt(resolvedLayout.fillX), resolvedIconLayout.contentY + toInt(resolvedLayout.fillY), clipWidth, resolvedLayout.fillHeight);
    }

    private resolveAssets(): ArrowBarAssets {
        const paintColor = VariableFxPaintColors.resolvePaintColor(this.context.config.color, this.context.config.extra);
        const names = ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS;

        return {
            background: this.getLayer(names.background),
            barChunk: this.getLayer(names.barChunk),
            darkening: this.getLayer(names.darkening),
            lighting: this.getLayer(names.lighting),
            metallic: paintColor.isMetallic ? this.getLayer(names.metallic) : undefined,
            splitter: this.getLayer(names.splitter),
            splitterLeft: this.getLayer(names.splitterLeft),
        };
    }

    private resolveOverlays(assets: ArrowBarAssets, isMetallic: boolean): VariableFxBarOverlay[] {
        return isMetallic
            ? [
                    { blendMode: 'add', layer: assets.lighting },
                    { blendMode: 'multiply', layer: assets.darkening },
                    { blendMode: 'add', layer: assets.lighting },
                    { blendMode: 'multiply', layer: assets.darkening },
                ]
            : [
                    { blendMode: 'multiply', layer: assets.darkening },
                    { blendMode: 'add', layer: assets.lighting },
                ];
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX arrow progress bar layer '${name}'.`);

        return bitmap;
    }

    private resolveIconOverlayLayout(layout: ArrowBarLayout, icon: VariableFxConfiguredIcon | undefined): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(layout.width, layout.height, icon, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }

    private resolveLayout(width: string, extra: Map<string, string> | undefined): ArrowBarLayout {
        const arrowCount = ArrowProgressBarRenderer.resolveArrowProgressBarArrowCount(width, extra);
        const fillWidth = arrowCount * ArrowProgressBarRenderer.ARROW_WIDTH;

        return {
            arrowCount,
            fillHeight: ArrowProgressBarRenderer.FILL_HEIGHT,
            fillWidth,
            fillX: ArrowProgressBarRenderer.CHROME_EDGE_WIDTH,
            fillY: ArrowProgressBarRenderer.FILL_Y,
            height: ArrowProgressBarRenderer.FRAME_HEIGHT,
            sliceLeftWidth: 3,
            sliceRightWidth: 3,
            width: fillWidth + ArrowProgressBarRenderer.CHROME_EDGE_WIDTH * 2,
        };
    }
}
