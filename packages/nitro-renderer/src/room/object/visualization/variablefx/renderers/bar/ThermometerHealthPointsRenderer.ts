import { createTransparentBitmap, disposeBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer, VariableFxBlendMode } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';
import { VariableFxGenericRendererPrebake, VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxSegmentedProgress } from '../../VariableFxSegmentedProgress';
import { VariableFxWidth } from '../../VariableFxTables';
import { BarVariableFxRendererBase } from './BarVariableFxRendererBase';
import { VariableFxBarLayout, VariableFxBarSliceUtils } from './VariableFxBarLayout';

interface ThermometerAssets {
    background: VariableFxBitmap;
    darkening: VariableFxBitmap;
    fill: VariableFxBitmap;
    lighting: VariableFxBitmap;
    splitters: VariableFxBitmap;
    top: VariableFxBitmap;
}

interface ThermometerPrebakeData {
    backgroundPrebake: VariableFxBitmap;
    barPrebake: VariableFxBitmap;
    darkeningPrebake: VariableFxBitmap;
    layout: VariableFxBarLayout;
    splittersPrebake: VariableFxBitmap;
}

/** A segmented tube (5px segments) whose fill is a fixed colour taken from the fill asset; no recolouring. */
export class ThermometerHealthPointsRenderer extends BarVariableFxRendererBase {
    private static FRAME_EDGE_WIDTH: number = 3;
    private static DARKENING_SLICE_WIDTH: number = 4;
    private static FILL_X: number = 2;
    private static FILL_Y: number = 2;
    private static LIGHTING_INSET_X: number = 3;
    private static LIGHTING_Y: number = 3;
    private static LIGHTING_SOURCE_X: number = 3;
    private static LIGHTING_SOURCE_Y: number = 1;
    private static LIGHTING_SOURCE_WIDTH: number = 1;
    private static LIGHTING_SOURCE_HEIGHT: number = 1;
    private static SEGMENT_WIDTH: number = 5;
    private static SPLITTER_WIDTH: number = 2;
    private static SPLITTER_SOURCE_X: number = 0;
    private static SPLITTER_SOURCE_Y: number = 2;

    private static THERMOMETER_HEALTH_POINTS_ASSETS = {
        background: 'variablefx_thermometer_health_points_background',
        darkening: 'variablefx_thermometer_health_points_darkening',
        fill: 'variablefx_thermometer_health_points_fill',
        lighting: 'variablefx_thermometer_health_points_lighting',
        splitters: 'variablefx_thermometer_health_points_splitters',
        top: 'variablefx_thermometer_health_points_top',
    };

    private _backgroundPrebake: VariableFxBitmap;
    private _barPrebake: VariableFxBitmap;
    private _darkeningPrebake: VariableFxBitmap;
    private _layout: VariableFxBarLayout;
    private _splittersPrebake: VariableFxBitmap;

    constructor(context: VariableFxRendererContext) {
        super(context);

        const prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context));
        const data = prebake.data;

        this._backgroundPrebake = data.backgroundPrebake;
        this._barPrebake = data.barPrebake;
        this._darkeningPrebake = data.darkeningPrebake;
        this._layout = data.layout;
        this._splittersPrebake = data.splittersPrebake;
    }

    public static resolveThermometerHealthPointsFrameWidth(width: string, extra?: Map<string, string>): number {
        const segments = ThermometerHealthPointsRenderer.resolveThermometerHealthPointsSegmentCount(width, extra);

        return segments * ThermometerHealthPointsRenderer.SEGMENT_WIDTH + ThermometerHealthPointsRenderer.FILL_X * 2 + 1;
    }

    public static resolveThermometerHealthPointsSegmentCount(width: string, extra?: Map<string, string>): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(width, extra, value => ThermometerHealthPointsRenderer.resolveDefaultThermometerHealthPointsSegmentCount(value));
    }

    private static resolveDefaultThermometerHealthPointsSegmentCount(width: string): number {
        switch (width) {
            case VariableFxWidth.EXTRA_SMALL:
                return 4;
            case VariableFxWidth.SMALL:
                return 6;
            case VariableFxWidth.MEDIUM:
                return 9;
            case VariableFxWidth.LARGE:
                return 12;
            case VariableFxWidth.EXTRA_LARGE:
                return 15;
            default:
                return 9;
        }
    }

    protected override get frameWidth(): number {
        return toInt(this._layout.width);
    }

    protected override get frameHeight(): number {
        return toInt(this._layout.height);
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

        if (filledWidth > 0) composer.drawLayer(this._barPrebake, 0, 0, 'normal', 255, this.createFillClip(filledWidth));

        composer.drawLayer(this._darkeningPrebake, 0, 0, 'multiply', 255);
        composer.drawLayer(this._splittersPrebake, 0, 0, 'normal', 255);
    }

    private createPrebake(context: VariableFxRendererContext): VariableFxGenericRendererPrebake<ThermometerPrebakeData> {
        const assets = this.resolveAssets();
        const layout = this.resolveLayout(context.config.width, context.config.extra, assets.background);
        const backgroundPrebake = createTransparentBitmap(layout.width, layout.height);
        const barPrebake = createTransparentBitmap(layout.width, layout.height);
        const darkeningPrebake = createTransparentBitmap(layout.width, layout.height);
        const splittersPrebake = createTransparentBitmap(layout.width, layout.height);

        this.prebakeBackground(backgroundPrebake, assets, layout);
        this.prebakeBar(barPrebake, assets, layout);
        this.prebakeDarkening(darkeningPrebake, assets, layout);
        this.prebakeSplitters(splittersPrebake, assets, layout);

        return new VariableFxGenericRendererPrebake<ThermometerPrebakeData>({
            backgroundPrebake,
            barPrebake,
            darkeningPrebake,
            layout,
            splittersPrebake,
        }, () => {
            disposeBitmap(backgroundPrebake);
            disposeBitmap(barPrebake);
            disposeBitmap(darkeningPrebake);
            disposeBitmap(splittersPrebake);
        });
    }

    private prebakeBackground(target: VariableFxBitmap, assets: ThermometerAssets, layout: VariableFxBarLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);
        composer.drawThreeSlice(assets.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(layout), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(layout), layout.width, 0, 0, 'normal', 255);
    }

    private prebakeBar(target: VariableFxBitmap, assets: ThermometerAssets, layout: VariableFxBarLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        this.drawFill(composer, assets.fill, layout.fillWidth, layout);
        this.drawLighting(composer, assets.lighting, layout.fillWidth, layout);
    }

    private prebakeDarkening(target: VariableFxBitmap, assets: ThermometerAssets, layout: VariableFxBarLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        this.drawFullTrackLayer(composer, assets.darkening, 'normal', layout);
    }

    private prebakeSplitters(target: VariableFxBitmap, assets: ThermometerAssets, layout: VariableFxBarLayout): void {
        const composer = new VariableFxBitmapComposer(target);

        composer.clear(0);

        this.drawTopPixels(composer, assets.top, layout);
        this.drawSplitters(composer, assets.splitters, layout);
    }

    private drawFill(composer: VariableFxBitmapComposer, fill: VariableFxBitmap, width: number, layout: VariableFxBarLayout): void {
        if (width <= 0 || fill.width <= 0 || fill.height <= 0) return;

        composer.drawTiledChunk(fill, new VariableFxClipRect(0, 0, 1, 1), layout.fillX, layout.fillY, width, layout.fillHeight, 'normal', 255);
    }

    private drawFullTrackLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap, blendMode: VariableFxBlendMode, layout: VariableFxBarLayout): void {
        composer.drawThreeSlice(layer, ThermometerHealthPointsRenderer.DARKENING_SLICE_WIDTH, ThermometerHealthPointsRenderer.DARKENING_SLICE_WIDTH, layout.fillWidth, layout.fillX, layout.fillY, blendMode, 255);
    }

    private drawLighting(composer: VariableFxBitmapComposer, lighting: VariableFxBitmap, width: number, layout: VariableFxBarLayout): void {
        const inset = ThermometerHealthPointsRenderer.LIGHTING_INSET_X;
        const drawWidth = Math.min(width - inset, toInt(layout.fillWidth) - inset * 2);

        if (drawWidth <= 0 || lighting.width < ThermometerHealthPointsRenderer.LIGHTING_SOURCE_X + 1 || lighting.height < ThermometerHealthPointsRenderer.LIGHTING_SOURCE_Y + 1) return;

        composer.drawTiledChunk(lighting, new VariableFxClipRect(ThermometerHealthPointsRenderer.LIGHTING_SOURCE_X, ThermometerHealthPointsRenderer.LIGHTING_SOURCE_Y, ThermometerHealthPointsRenderer.LIGHTING_SOURCE_WIDTH, ThermometerHealthPointsRenderer.LIGHTING_SOURCE_HEIGHT), toInt(layout.fillX) + inset, ThermometerHealthPointsRenderer.LIGHTING_Y, drawWidth, 1, 'add', 255);
    }

    private drawTopPixels(composer: VariableFxBitmapComposer, top: VariableFxBitmap, layout: VariableFxBarLayout): void {
        const leftSourceX = Math.min(2, top.width - 1);
        const rightSourceX = Math.max(0, top.width - 2 - 1);
        const topSourceY = Math.min(2, top.height - 1);
        const bottomSourceY = Math.max(0, top.height - 2 - 1);
        const leftX = toInt(layout.fillX);
        const rightX = toInt(layout.width) - toInt(layout.fillX) - 1;
        const topY = toInt(layout.fillY);
        const bottomY = toInt(layout.fillY) + toInt(layout.fillHeight) - 1;

        this.drawSingleSourcePixel(composer, top, leftSourceX, topSourceY, leftX, topY);
        this.drawSingleSourcePixel(composer, top, leftSourceX, bottomSourceY, leftX, bottomY);
        this.drawSingleSourcePixel(composer, top, rightSourceX, topSourceY, rightX, topY);
        this.drawSingleSourcePixel(composer, top, rightSourceX, bottomSourceY, rightX, bottomY);
    }

    private drawSingleSourcePixel(composer: VariableFxBitmapComposer, source: VariableFxBitmap, sourceX: number, sourceY: number, x: number, y: number): void {
        composer.drawTiledChunk(source, new VariableFxClipRect(sourceX, sourceY, 1, 1), x, y, 1, 1, 'normal', 255);
    }

    private drawSplitters(composer: VariableFxBitmapComposer, splitters: VariableFxBitmap, layout: VariableFxBarLayout): void {
        const height = Math.min(toInt(layout.fillHeight), splitters.height - ThermometerHealthPointsRenderer.SPLITTER_SOURCE_Y);
        const width = Math.min(ThermometerHealthPointsRenderer.SPLITTER_WIDTH, splitters.width - ThermometerHealthPointsRenderer.SPLITTER_SOURCE_X);
        const clip = this.createFillClip(layout.fillWidth, layout);

        if (width <= 0 || height <= 0) return;

        const segment = ThermometerHealthPointsRenderer.SEGMENT_WIDTH;

        for (let x = segment; x <= toInt(layout.fillWidth) - segment - 1; x += segment) {
            composer.drawTiledChunk(splitters, new VariableFxClipRect(ThermometerHealthPointsRenderer.SPLITTER_SOURCE_X, ThermometerHealthPointsRenderer.SPLITTER_SOURCE_Y, width, height), toInt(layout.fillX) + x, layout.fillY, width, layout.fillHeight, 'normal', 255, clip);
        }
    }

    private createFillClip(width: number, layout?: VariableFxBarLayout): VariableFxClipRect {
        const resolvedLayout = layout ?? this._layout;

        return new VariableFxClipRect(resolvedLayout.fillX, resolvedLayout.fillY, width, resolvedLayout.fillHeight);
    }

    private resolveAssets(): ThermometerAssets {
        const names = ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS;

        return {
            background: this.getLayer(names.background),
            darkening: this.getLayer(names.darkening),
            fill: this.getLayer(names.fill),
            lighting: this.getLayer(names.lighting),
            splitters: this.getLayer(names.splitters),
            top: this.getLayer(names.top),
        };
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX thermometer health points layer '${name}'.`);

        return bitmap;
    }

    private resolveLayout(width: string, extra: Map<string, string> | undefined, background: VariableFxBitmap): VariableFxBarLayout {
        const frameWidth = ThermometerHealthPointsRenderer.resolveThermometerHealthPointsFrameWidth(width, extra);
        const fillHeight = Math.max(1, background.height - ThermometerHealthPointsRenderer.FILL_Y * 2);

        return {
            fillHeight,
            fillWidth: Math.max(0, frameWidth - ThermometerHealthPointsRenderer.FILL_X * 2),
            fillX: ThermometerHealthPointsRenderer.FILL_X,
            fillY: ThermometerHealthPointsRenderer.FILL_Y,
            height: background.height,
            sliceLeftWidth: ThermometerHealthPointsRenderer.FRAME_EDGE_WIDTH,
            sliceRightWidth: ThermometerHealthPointsRenderer.FRAME_EDGE_WIDTH,
            width: frameWidth,
        };
    }
}
