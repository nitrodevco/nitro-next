import { createTransparentBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { BarVariableFxRendererBase } from './BarVariableFxRendererBase';
import { MaskedHeartFillAssets, MaskedHeartFillFramePrebake } from './MaskedHeartFillFramePrebake';

/** A single heart that fills from the left, with an end pointer masked to the heart's silhouette. */
export class MaskedHeartFillRenderer extends BarVariableFxRendererBase {
    private static MASKED_HEART_FILL_ASSETS = {
        background: 'variablefx_masked_heart_fill_background',
        bar: 'variablefx_masked_heart_fill_bar',
        darkening: 'variablefx_masked_heart_fill_darkening',
        darkeningMetallic: 'variablefx_masked_heart_fill_darkening_metallic',
        endPointer: 'variablefx_masked_heart_fill_end_pointer',
        lighting: 'variablefx_masked_heart_fill_lighting',
        lightingMetallic: 'variablefx_masked_heart_fill_lighting_metallic',
        mask: 'variablefx_masked_heart_fill_mask',
        metallic: 'variablefx_masked_heart_fill_metallic',
    };

    private _prebake: MaskedHeartFillFramePrebake;

    constructor(context: VariableFxRendererContext) {
        super(context);

        this._prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake());
    }

    protected override get frameWidth(): number {
        return this._prebake.frameWidth;
    }

    protected override get frameHeight(): number {
        return this._prebake.frameHeight;
    }

    protected override get progressPixelWidth(): number {
        return this._prebake.progressPixelWidth;
    }

    protected override createFrameBitmap(width: number, height: number): VariableFxBitmap {
        return createTransparentBitmap(width, height);
    }

    protected override renderFrame(_time: number): void {
        const bitmap = this.mutableFrame.bitmap;

        if (!bitmap) return;

        const composer = new VariableFxBitmapComposer(bitmap);
        const frame = this._prebake.getOrCreateFrame(this.displayedFillArgb, this.calculateFilledPixelWidth());

        composer.clear(0);
        composer.drawLayer(frame, 0, 0, 'normal', 255);
    }

    private createPrebake(): MaskedHeartFillFramePrebake {
        const paintColor = VariableFxPaintColors.resolvePaintColor(this.context.config.color, this.context.config.extra);

        return new MaskedHeartFillFramePrebake(this.resolveAssets(paintColor.isMetallic));
    }

    private resolveAssets(isMetallic: boolean): MaskedHeartFillAssets {
        const names = MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS;
        const darkening = isMetallic ? this.getLayer(names.darkeningMetallic) : this.getLayer(names.darkening);
        const lighting = isMetallic ? this.getLayer(names.lightingMetallic) : this.getLayer(names.lighting);

        return {
            background: this.getLayer(names.background),
            bar: this.getLayer(names.bar),
            endPointer: this.getLayer(names.endPointer),
            mask: this.getLayer(names.mask),
            metallic: isMetallic ? this.getLayer(names.metallic) : undefined,
            overlays: [
                { blendMode: 'multiply', layer: darkening },
                { blendMode: 'add', layer: lighting },
            ],
        };
    }

    private getLayer(name: string): VariableFxBitmap {
        const bitmap = this.context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX masked heart fill layer '${name}'.`);

        return bitmap;
    }
}
