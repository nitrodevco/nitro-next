import { createTransparentBitmap, disposeBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer, VariableFxBlendMode } from '../../rendering/VariableFxBitmapComposer';
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

interface BlockBarLayout extends VariableFxBarLayout {
    blockCount: number;
    blockWidth: number;
    splitterWidth: number;
}

interface BlockBarAssets {
    background: VariableFxBitmap;
    bar: VariableFxBitmap;
    metallic: VariableFxBitmap | undefined;
    overlays: VariableFxBarOverlay[];
    splitters: VariableFxBitmap;
}

interface BlockBarPrebakeData {
    assets: BlockBarAssets;
    backgroundPrebake: VariableFxBitmap;
    barPrebake: VariableFxBitmap | undefined;
    foregroundPrebake: VariableFxBitmap;
    iconLayout: VariableFxIconOverlayLayout;
    layout: BlockBarLayout;
}

/** A bar of 7px blocks separated by 1px splitters; the fill is a solid colour with tiled overlays. */
export class BlockProgressBarRenderer extends BarVariableFxRendererBase {
    private static BLOCK_WIDTH: number = 7;
    private static SPLITTER_WIDTH: number = 1;
    private static CHROME_EDGE_WIDTH: number = 3;
    private static FRAME_HEIGHT: number = 13;
    private static FILL_Y: number = 3;
    private static FILL_HEIGHT: number = 7;
    private static BLOCK_CHUNK_WIDTH: number = 8;

    private static BLOCK_PROGRESS_BAR_ASSETS = {
        background: 'variablefx_block_bar_background',
        bar: 'variablefx_block_bar_fill',
        darkening: 'variablefx_block_bar_darkening',
        lighting: 'variablefx_block_bar_lighting',
        metallic: 'variablefx_block_bar_metallic',
        splitters: 'variablefx_block_bar_splitters',
    };

    private _assets: BlockBarAssets;
    private _backgroundPrebake: VariableFxBitmap;
    private _barCache: VariableFxBitmap | undefined = undefined;
    private _barCacheArgb: number = -1;
    private _barPrebake: VariableFxBitmap | undefined;
    private _foregroundPrebake: VariableFxBitmap;
    private _iconLayout: VariableFxIconOverlayLayout;
    private _layout: BlockBarLayout;

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

        if (!this._barPrebake) this._barCache = createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
    }

    public static resolveBlockProgressBarBlockCount(width: string, extra: Map<string, string> | undefined): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(width, extra, value => BlockProgressBarRenderer.resolveDefaultBlockProgressBarBlockCount(value));
    }

    private static resolveDefaultBlockProgressBarBlockCount(width: string): number {
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

        if (filledWidth > 0) composer.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, 'normal', 255, this.resolveProgressClip(filledWidth));

        composer.drawLayer(this._foregroundPrebake, 0, 0, 'normal', 255);
    }

    public override dispose(): void {
        super.dispose();

        disposeBitmap(this._barCache);

        this._barCache = undefined;
    }

    private createPrebake(context: VariableFxRendererContext): VariableFxGenericRendererPrebake<BlockBarPrebakeData> {
        const layout = this.resolveLayout(context.config.width, context.config.extra);
        const assets = this.resolveAssets();
        const icon = VariableFxConfiguredIcon.resolve(context);
        const iconLayout = this.resolveIconOverlayLayout(layout, icon);
        const paintColor = VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra);
        const isDynamicPaint = VariableFxPaintColors.isDynamicPaintColor(context.config.color);
        const backgroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const foregroundPrebake = createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        const barPrebake = isDynamicPaint ? undefined : createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);

        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, assets, layout, iconLayout, icon);

        if (barPrebake) this.drawBarBitmap(barPrebake, (0xff000000 | paintColor.rgb) >>> 0, assets, layout, iconLayout);

        return new VariableFxGenericRendererPrebake<BlockBarPrebakeData>({
            assets,
            backgroundPrebake,
            barPrebake,
            foregroundPrebake,
            iconLayout,
            layout,
        }, () => {
            disposeBitmap(backgroundPrebake);
            disposeBitmap(foregroundPrebake);
            disposeBitmap(barPrebake);
        });
    }

    private prebakeBackground(target: VariableFxBitmap, assets: BlockBarAssets, layout: BlockBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(layout), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(layout), layout.width, iconLayout.contentX, iconLayout.contentY, 'normal', 255);
    }

    private prebakeForeground(target: VariableFxBitmap, assets: BlockBarAssets, layout: BlockBarLayout, iconLayout: VariableFxIconOverlayLayout, icon: VariableFxConfiguredIcon | undefined): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        this.drawSplitters(composer, assets.splitters, iconLayout.contentX, iconLayout.contentY, layout);

        if (icon) composer.drawLayer(icon.bitmap, iconLayout.iconX, iconLayout.iconY, 'normal', 255);
    }

    private resolveBarPrebakeOrCache(): VariableFxBitmap {
        if (this._barPrebake) return this._barPrebake;

        const argb = this.displayedFillArgb;

        if (this._barCacheArgb !== argb && this._barCache) {
            this._barCacheArgb = argb;

            this.drawBarBitmap(this._barCache, argb, this._assets, this._layout, this._iconLayout);
        }

        return this._barCache!;
    }

    private drawBarBitmap(target: VariableFxBitmap, argb: number, assets: BlockBarAssets, layout: BlockBarLayout, iconLayout: VariableFxIconOverlayLayout): void {
        const contentX = iconLayout.contentX;
        const contentY = iconLayout.contentY;
        const clip = this.resolveProgressClip(layout.fillWidth, layout, iconLayout);
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.fillRect(contentX + toInt(layout.fillX), contentY + toInt(layout.fillY), layout.fillWidth, layout.fillHeight, argb);

        this.drawRepeatedFillLayer(composer, assets.bar, 'multiply', contentX, contentY, clip, layout);

        if (assets.metallic) this.drawRepeatedFillLayer(composer, assets.metallic, 'normal', contentX, contentY, clip, layout);

        for (const overlay of assets.overlays) this.drawRepeatedFillLayer(composer, overlay.layer, overlay.blendMode, contentX, contentY, clip, layout);
    }

    private drawRepeatedFillLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap, blendMode: VariableFxBlendMode, contentX: number, contentY: number, clip: VariableFxClipRect, layout: BlockBarLayout): void {
        if (clip.width <= 0) return;

        composer.drawTiledChunk(layer, new VariableFxClipRect(0, 0, BlockProgressBarRenderer.BLOCK_CHUNK_WIDTH, layout.fillHeight), contentX + toInt(layout.fillX), contentY + toInt(layout.fillY), layout.fillWidth, layout.fillHeight, blendMode, 255, clip);
    }

    private drawSplitters(composer: VariableFxBitmapComposer, splitters: VariableFxBitmap, contentX: number, contentY: number, layout: BlockBarLayout): void {
        for (let index = 1; index <= toInt(layout.blockCount); index++) {
            const x = contentX + toInt(layout.fillX) + index * BlockProgressBarRenderer.BLOCK_CHUNK_WIDTH - toInt(layout.splitterWidth);

            composer.drawTiledChunk(splitters, new VariableFxClipRect(0, layout.fillY, layout.splitterWidth, layout.fillHeight), x, contentY + toInt(layout.fillY), layout.splitterWidth, layout.fillHeight, 'normal', 255);
        }
    }

    private resolveProgressClip(width: number, layout?: BlockBarLayout, iconLayout?: VariableFxIconOverlayLayout): VariableFxClipRect {
        const resolvedLayout = layout ?? this._layout;
        const resolvedIconLayout = iconLayout ?? this._iconLayout;

        return new VariableFxClipRect(resolvedIconLayout.contentX + toInt(resolvedLayout.fillX), resolvedIconLayout.contentY + toInt(resolvedLayout.fillY), width, resolvedLayout.fillHeight);
    }

    private resolveAssets(): BlockBarAssets {
        const paintColor = VariableFxPaintColors.resolvePaintColor(this.context.config.color, this.context.config.extra);
        const names = BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS;
        const isMetallic = paintColor.isMetallic;
        const darkening = this.getLayer(names.darkening);
        const lighting = this.getLayer(names.lighting);

        return {
            background: this.getLayer(names.background),
            bar: this.getLayer(names.bar),
            metallic: isMetallic ? this.getLayer(names.metallic) : undefined,
            overlays: isMetallic
                ? [
                        { blendMode: 'add', layer: lighting },
                        { blendMode: 'multiply', layer: darkening },
                        { blendMode: 'add', layer: lighting },
                        { blendMode: 'multiply', layer: darkening },
                    ]
                : [
                        { blendMode: 'multiply', layer: darkening },
                        { blendMode: 'add', layer: lighting },
                    ],
            splitters: this.getLayer(names.splitters),
        };
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX block progress bar layer '${name}'.`);

        return bitmap;
    }

    private resolveIconOverlayLayout(layout: BlockBarLayout, icon: VariableFxConfiguredIcon | undefined): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(layout.width, layout.height, icon, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }

    private resolveLayout(width: string, extra: Map<string, string> | undefined): BlockBarLayout {
        const blockCount = BlockProgressBarRenderer.resolveBlockProgressBarBlockCount(width, extra);
        const fillWidth = blockCount * BlockProgressBarRenderer.BLOCK_WIDTH + (blockCount - 1) * BlockProgressBarRenderer.SPLITTER_WIDTH;

        return {
            blockCount,
            blockWidth: BlockProgressBarRenderer.BLOCK_WIDTH,
            fillHeight: BlockProgressBarRenderer.FILL_HEIGHT,
            fillWidth,
            fillX: BlockProgressBarRenderer.CHROME_EDGE_WIDTH,
            fillY: BlockProgressBarRenderer.FILL_Y,
            height: BlockProgressBarRenderer.FRAME_HEIGHT,
            sliceLeftWidth: 3,
            sliceRightWidth: 3,
            splitterWidth: BlockProgressBarRenderer.SPLITTER_WIDTH,
            width: fillWidth + BlockProgressBarRenderer.CHROME_EDGE_WIDTH * 2,
        };
    }
}
