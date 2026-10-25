import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer, VariableFxBlendMode, VariableFxColorMultipliers } from '../../rendering/VariableFxBitmapComposer';
import { IVariableFxPrebake } from '../../VariableFxPrebakeCache';

export interface RecolorableNumberDisplayLayers {
    darkening: VariableFxBitmap | undefined;
    lighting: VariableFxBitmap | undefined;
    numberLines: VariableFxBitmap | undefined;
    numbers: VariableFxBitmap;
}

/** The whole digit sheet recoloured per RGB, cached by colour and shared across visualizers of the config. */
export class RecolorableNumberDisplayColorPrebake implements IVariableFxPrebake {
    public numbers: VariableFxBitmap | undefined;

    private _layers: RecolorableNumberDisplayLayers | undefined;
    private _sheets: Map<number, VariableFxBitmap> = new Map();

    constructor(layers: RecolorableNumberDisplayLayers) {
        this._layers = layers;
        this.numbers = layers.numbers;
    }

    public getOrCreateNumbersPrebake(rgb: number): VariableFxBitmap {
        const normalized = rgb & 0xffffff;
        const existing = this._sheets.get(normalized);

        if (existing) return existing;

        const sheet = this.createNumbersPrebake(normalized);

        this._sheets.set(normalized, sheet);

        return sheet;
    }

    public dispose(): void {
        for (const sheet of this._sheets.values()) disposeBitmap(sheet);

        this._sheets.clear();
        this._layers = undefined;
        this.numbers = undefined;
    }

    private createNumbersPrebake(rgb: number): VariableFxBitmap {
        const layers = this._layers;
        const source = layers?.numbers;

        if (!layers || !source) return createTransparentBitmap(1, 1);

        const sheet = createTransparentBitmap(source.width, source.height);
        const composer = new VariableFxBitmapComposer(sheet);

        composer.clear(0);
        composer.drawSourceRegion(source, 0, 0, source.width, source.height, 0, 0, 'normal', 255, undefined, this.createBaseColorTransformFromRgb(rgb));

        this.drawOptionalPrebakeLayer(composer, layers.numberLines, 'normal');
        this.drawOptionalPrebakeLayer(composer, layers.darkening, 'multiply');
        this.drawOptionalPrebakeLayer(composer, layers.lighting, 'add');

        return sheet;
    }

    private drawOptionalPrebakeLayer(composer: VariableFxBitmapComposer, layer: VariableFxBitmap | undefined, blendMode: VariableFxBlendMode): void {
        if (layer) composer.drawLayer(layer, 0, 0, blendMode, 255);
    }

    private createBaseColorTransformFromRgb(rgb: number): VariableFxColorMultipliers {
        return {
            red: ((rgb >>> 16) & 0xff) / 255,
            green: ((rgb >>> 8) & 0xff) / 255,
            blue: (rgb & 0xff) / 255,
            alpha: 1,
        };
    }
}
