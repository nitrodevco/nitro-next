import { IVariableFxRenderer } from '../../IVariableFxRenderer';
import { createTransparentBitmap, toInt, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxConfiguredIcon } from '../../rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '../../rendering/VariableFxIconOverlayLayout';
import { VariableFxFrame } from '../../VariableFxFrame';
import { VariableFxRendererContext } from '../../VariableFxRendererContext';
import { VariableFxIconAlignment } from '../../VariableFxTables';
import { NumberDisplayDesign, NumberDisplayDigit } from './NumberDisplayDesigns';

/** Draws the status value as a row of bitmap digits, with optional icon(s) beside it. */
export abstract class NumberDisplayRendererBase implements IVariableFxRenderer {
    private _composer: VariableFxBitmapComposer | undefined = undefined;
    private _design: NumberDisplayDesign;
    private _digitsByValue: Map<string, NumberDisplayDigit> = new Map();
    private _displayValue: string;
    private _frame: VariableFxFrame = new VariableFxFrame();
    private _icon: VariableFxConfiguredIcon | undefined;
    private _iconAlignment: VariableFxIconAlignment;
    private _renderedValue: string = '';

    constructor(context: VariableFxRendererContext, design: NumberDisplayDesign) {
        this._design = design;
        this._displayValue = this.normalizeDisplayValue(context.status.value);
        this._icon = VariableFxConfiguredIcon.resolve(context);
        this._iconAlignment = VariableFxConfiguredIcon.resolveAlignment(context);

        for (const digit of design.digits) this._digitsByValue.set(digit.value, digit);
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(context: VariableFxRendererContext, time: number): void {
        this._displayValue = this.normalizeDisplayValue(context.status.value);

        this.updateRendererData(context, time);
    }

    public needsUpdate(_time: number): boolean {
        return !this._frame.bitmap || this._displayValue !== this._renderedValue || this.needsRendererUpdate();
    }

    public update(time: number): boolean {
        if (!this.needsUpdate(time)) return false;

        this.ensureFrameBitmap();
        this.renderFrame();

        this._renderedValue = this._displayValue;

        this.didRenderFrame();

        this._frame.updateId++;

        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    protected get composer(): VariableFxBitmapComposer {
        if (!this._composer) throw new Error('Variable FX number display composer is only available while rendering.');

        return this._composer;
    }

    protected get digitHeight(): number {
        return toInt(this._design.digitHeight);
    }

    protected get digitSpacing(): number {
        return toInt(this._design.digitSpacing ?? 0);
    }

    protected abstract drawDigit(digit: NumberDisplayDigit, x: number, y: number): void;

    protected updateRendererData(_context: VariableFxRendererContext, _time: number): void {
        return;
    }

    protected needsRendererUpdate(): boolean {
        return false;
    }

    protected didRenderFrame(): void {
        return;
    }

    protected resolveBitmapDataClassLayer(): VariableFxBitmap | undefined {
        return undefined;
    }

    protected resolveContentLayout(): VariableFxIconOverlayLayout {
        return VariableFxIconOverlayLayout.resolve({
            alignment: this._iconAlignment,
            contentHeight: this.contentHeight,
            contentWidth: this.contentWidth,
            contentYOffsetPx: toInt(this._design.iconContentYOffsetPx),
            iconHeight: this._icon ? this._icon.bitmap.height : 0,
            iconOffsetX: 0,
            iconOffsetY: 0,
            iconWidth: this._icon ? this._icon.bitmap.width : 0,
            overlapPx: toInt(this._design.iconOverlapPx),
        });
    }

    private get contentWidth(): number {
        const digits = this.resolveDisplayDigits();

        let width = 0;

        for (let i = 0; i < digits.length; i++) {
            if (i > 0) width += this.digitSpacing;

            width += toInt(digits[i].width);
        }

        return Math.max(0, width);
    }

    private get contentHeight(): number {
        return toInt(this._design.digitHeight);
    }

    private ensureFrameBitmap(): void {
        const layout = this.resolveContentLayout();

        if (this._frame.bitmap && this._frame.width === layout.frameWidth && this._frame.height === layout.frameHeight) return;

        this._frame.disposeBitmap();

        const bitmap = createTransparentBitmap(layout.frameWidth, layout.frameHeight);

        this._frame.bitmap = bitmap;
        this._frame.width = bitmap.width;
        this._frame.height = bitmap.height;
        this._renderedValue = '';
    }

    private renderFrame(): void {
        const bitmap = this._frame.bitmap;

        if (!bitmap) return;

        const layout = this.resolveContentLayout();

        this._composer = new VariableFxBitmapComposer(bitmap);

        try {
            this._composer.clear(0);

            this.drawNumberContent(layout.contentX, layout.contentY);
            this.drawConfiguredIcons(layout);
        } finally {
            this._composer = undefined;
        }
    }

    private drawNumberContent(x: number, y: number): void {
        let cursor = x;

        for (const digit of this.resolveDisplayDigits()) {
            this.drawDigit(digit, cursor, y);

            cursor += toInt(digit.width) + this.digitSpacing;
        }
    }

    private drawConfiguredIcons(layout: VariableFxIconOverlayLayout): void {
        if (!this._icon) return;

        for (const placement of layout.placements) this.composer.drawLayer(this._icon.bitmap, placement.x, placement.y, 'normal', 255);
    }

    private resolveDisplayDigits(): NumberDisplayDigit[] {
        const digits: NumberDisplayDigit[] = [];

        for (const character of this._displayValue) digits.push(this.resolveDigit(character));

        return digits;
    }

    private resolveDigit(character: string): NumberDisplayDigit {
        const digit = this._digitsByValue.get(character);

        if (!digit) throw new Error(`Missing Variable FX number display digit '${character}'.`);

        return digit;
    }

    private normalizeDisplayValue(value: number): string {
        if (!Number.isFinite(value)) return '0';

        return String(Math.trunc(value));
    }
}
