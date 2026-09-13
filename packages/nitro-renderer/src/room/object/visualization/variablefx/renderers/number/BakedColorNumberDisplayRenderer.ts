import { VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxPaintColors } from '../../VariableFxPaintColors';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { BakedColorNumberDisplayDesign, NumberDisplayDesigns, NumberDisplayDigit } from './NumberDisplayDesigns';
import { NumberDisplayRendererBase } from './NumberDisplayRendererBase';

/** Digits from a sheet that already holds one row per colour; the colour picks the row. */
export class BakedColorNumberDisplayRenderer extends NumberDisplayRendererBase {
    private static DEFAULT_COLOR: string = 'GREEN';

    private _bakedDesign: BakedColorNumberDisplayDesign;
    private _renderedSourceY: number | undefined = undefined;
    private _numbers: VariableFxBitmap;
    private _sourceY: number;
    private _usesDynamicTeamColor: boolean;

    constructor(context: VariableFxRendererContext) {
        const design = BakedColorNumberDisplayRenderer.resolveDesign(context);

        super(context, design);

        this._bakedDesign = design;
        this._numbers = this.getLayer(context, this.resolveNumbersAssetName(design));
        this._usesDynamicTeamColor = VariableFxPaintColors.resolve(context.config.color).typeName === VariableFxPaintColors.DYNAMIC_TEAM_COLOR;
        this._sourceY = this.resolveSourceY(context, design);
    }

    private static resolveDesign(context: VariableFxRendererContext): BakedColorNumberDisplayDesign {
        const name = VariableFxPaintColors.readExtra(context.config.extra, 'design');
        const design = NumberDisplayDesigns.getBakedColorDesign(name);

        if (!design) throw new Error(`Unknown baked-color Variable FX number display design '${name ?? ''}'.`);

        return design;
    }

    protected override drawDigit(digit: NumberDisplayDigit, x: number, y: number): void {
        this.composer.drawSourceRegion(this._numbers, digit.sourceX, this._sourceY, digit.width, this.digitHeight, x, y, 'normal', 255);
    }

    protected override resolveBitmapDataClassLayer(): VariableFxBitmap | undefined {
        return this._numbers;
    }

    protected override updateRendererData(context: VariableFxRendererContext, _time: number): void {
        if (this._usesDynamicTeamColor) this._sourceY = this.resolveSourceY(context, this._bakedDesign);
    }

    protected override needsRendererUpdate(): boolean {
        return this._renderedSourceY === undefined || this._renderedSourceY !== this._sourceY;
    }

    protected override didRenderFrame(): void {
        this._renderedSourceY = this._sourceY;
    }

    private resolveSourceY(context: VariableFxRendererContext, design: BakedColorNumberDisplayDesign): number {
        const typeName = VariableFxPaintColors.resolve(context.config.color).typeName;
        const colorName = typeName === VariableFxPaintColors.DYNAMIC_TEAM_COLOR ? this.resolveDelegatedSourceColor(context, design) : typeName;

        let row = design.colorRows[colorName];

        if (row === undefined) row = design.colorRows[BakedColorNumberDisplayRenderer.DEFAULT_COLOR];

        return row === undefined ? 0 : Math.trunc(row);
    }

    private resolveDelegatedSourceColor(context: VariableFxRendererContext, design: BakedColorNumberDisplayDesign): string {
        const delegated = VariableFxPaintColors.parseRgbColor(VariableFxPaintColors.readExtra(context.status.extra, 'delegated_color'));

        if (delegated !== undefined) {
            for (const colorName of Object.keys(design.colorRows)) {
                if ((VariableFxPaintColors.resolve(colorName).rgb >>> 0) === (delegated >>> 0)) return colorName;
            }
        }

        return design.colorRows.WHITE !== undefined ? 'WHITE' : BakedColorNumberDisplayRenderer.DEFAULT_COLOR;
    }

    private resolveNumbersAssetName(design: BakedColorNumberDisplayDesign): string {
        return `variablefx_number_${design.design}_numbers`;
    }

    private getLayer(context: VariableFxRendererContext, name: string): VariableFxBitmap {
        const bitmap = context.assetProvider?.getBitmap(name);

        if (!bitmap) throw new Error(`Missing Variable FX number display layer '${name}'.`);

        return bitmap;
    }
}
