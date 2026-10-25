import { VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxPrebakeCache } from '../../VariableFxPrebakeCache';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { NumberDisplayDesigns, NumberDisplayDigit, RecolorableNumberDisplayDesign } from './NumberDisplayDesigns';
import { NumberDisplayRendererBase } from './NumberDisplayRendererBase';
import { RecolorableNumberDisplayColorPrebake, RecolorableNumberDisplayLayers } from './RecolorableNumberDisplayColorPrebake';

/** Digits from a white sheet tinted to the paint colour, with darkening/lighting layers on top. */
export class RecolorableNumberDisplayRenderer extends NumberDisplayRendererBase {
    private _paintRgb: number;
    private _renderedPaintRgb: number | undefined = undefined;
    private _prebake: RecolorableNumberDisplayColorPrebake;

    constructor(context: VariableFxRendererContext) {
        const design = RecolorableNumberDisplayRenderer.resolveDesign(context);

        super(context, design);

        this._prebake = VariableFxPrebakeCache.getOrCreate(context.config, () => this.createPrebake(context, design));
        this._paintRgb = this.resolvePaintRgb(context);
    }

    private static resolveDesign(context: VariableFxRendererContext): RecolorableNumberDisplayDesign {
        const name = VariableFxPaintColors.readExtra(context.config.extra, 'design');
        const design = NumberDisplayDesigns.getRecolorableDesign(name);

        if (!design) throw new Error(`Unknown recolorable Variable FX number display design '${name ?? ''}'.`);

        return design;
    }

    protected override drawDigit(digit: NumberDisplayDigit, x: number, y: number): void {
        const sheet = this._prebake.getOrCreateNumbersPrebake(this._paintRgb >>> 0);

        this.composer.drawSourceRegion(sheet, digit.sourceX, 0, digit.width, this.digitHeight, x, y, 'normal', 255);
    }

    protected override resolveBitmapDataClassLayer(): VariableFxBitmap | undefined {
        return this._prebake.numbers;
    }

    protected override updateRendererData(context: VariableFxRendererContext, _time: number): void {
        this._paintRgb = this.resolvePaintRgb(context);
    }

    protected override needsRendererUpdate(): boolean {
        return this._renderedPaintRgb === undefined || this._renderedPaintRgb !== this._paintRgb;
    }

    protected override didRenderFrame(): void {
        this._renderedPaintRgb = this._paintRgb;
    }

    private createPrebake(context: VariableFxRendererContext, design: RecolorableNumberDisplayDesign): RecolorableNumberDisplayColorPrebake {
        return new RecolorableNumberDisplayColorPrebake(this.resolveLayers(context, design));
    }

    private resolveLayers(context: VariableFxRendererContext, design: RecolorableNumberDisplayDesign): RecolorableNumberDisplayLayers {
        return {
            darkening: this.getOptionalLayer(context, design.layers.darkening),
            lighting: this.getOptionalLayer(context, design.layers.lighting),
            numberLines: this.getOptionalLayer(context, design.layers.numberLines),
            numbers: this.getLayer(context, design.layers.numbers),
        };
    }

    private getOptionalLayer(context: VariableFxRendererContext, name: string | undefined): VariableFxBitmap | undefined {
        return name === undefined ? undefined : this.getLayer(context, name);
    }

    private getLayer(context: VariableFxRendererContext, name: string): VariableFxBitmap {
        const bitmap = context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX number display layer '${name}'.`);

        return bitmap;
    }

    private resolvePaintRgb(context: VariableFxRendererContext): number {
        if (VariableFxPaintColors.resolve(context.config.color).typeName === VariableFxPaintColors.DYNAMIC_TEAM_COLOR) {
            return VariableFxPaintColors.resolveTargetPaintColor(context.config.color, context.config.extra, 0, context.status.extra).rgb;
        }

        return VariableFxPaintColors.resolvePaintColor(context.config.color, context.config.extra).rgb;
    }
}
