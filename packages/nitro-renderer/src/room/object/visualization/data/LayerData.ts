import { BLEND_MODES } from 'pixi.js';

/**
 * The per-layer settings of a furniture visualization size (tag, ink, alpha, mouse, offsets).
 * Ports `com.sulake.habbo.room.object.visualization.data.LayerData`; its static constants are
 * checked by `scripts/drift/constants.py`.
 *
 * Flash keeps a layer's ink as one of the `INK_*` ints, which `SizeData` maps from the XML `ink`
 * name. The port keeps the Pixi blend mode of the same name instead (`SizeData` lowercases the
 * asset's `ink`), so `DEFAULT_BLEND_MODE` stands for Flash's `DEFAULT_INK` and the `INK_*`
 * values below are mirrored for reference with no reader. `DEFAULT_COUNT` and
 * `DEFAULT_DIRECTION` are the port's own fallbacks for a missing size.
 */
export class LayerData {
    public static DEFAULT_COUNT: number = 0;
    public static DEFAULT_DIRECTION: number = 0;
    public static DEFAULT_TAG: string = '' as const;
    /** Flash `DEFAULT_INK` (0): no blending. */
    public static DEFAULT_BLEND_MODE: BLEND_MODES = 'normal';
    public static DEFAULT_ALPHA: number = 255;
    public static DEFAULT_IGNORE_MOUSE: boolean = false;
    public static DEFAULT_XOFFSET: number = 0;
    public static DEFAULT_YOFFSET: number = 0;
    public static DEFAULT_ZOFFSET: number = 0;
    public static INK_ADD: number = 1;
    public static INK_SUBTRACT: number = 2;
    public static INK_DARKEN: number = 3;
    public static INK_DIFFERENCE: number = 4;
    public static INK_MULTIPLY: number = 5;
    public static INK_INVERT: number = 6;
    public static INK_SCREEN: number = 7;

    private _tag: string = LayerData.DEFAULT_TAG;
    private _blendMode: BLEND_MODES = LayerData.DEFAULT_BLEND_MODE;
    private _alpha: number = LayerData.DEFAULT_ALPHA;
    private _ignoreMouse: boolean = LayerData.DEFAULT_IGNORE_MOUSE;
    private _xOffset: number = LayerData.DEFAULT_XOFFSET;
    private _yOffset: number = LayerData.DEFAULT_YOFFSET;
    private _zOffset: number = LayerData.DEFAULT_ZOFFSET;

    public setFromLayer(layer: LayerData | undefined): void {
        if (!layer) return;

        this._tag = layer.tag;
        this._blendMode = layer.blendMode;
        this._alpha = layer.alpha;
        this._ignoreMouse = layer.ignoreMouse;
        this._xOffset = layer.xOffset;
        this._yOffset = layer.yOffset;
        this._zOffset = layer.zOffset;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(tag: string) {
        this._tag = tag;
    }

    public get blendMode(): BLEND_MODES {
        return this._blendMode;
    }

    public set blendMode(value: BLEND_MODES) {
        this._blendMode = value;
    }

    public get alpha(): number {
        return this._alpha;
    }

    public set alpha(alpha: number) {
        this._alpha = alpha;
    }

    public get ignoreMouse(): boolean {
        return this._ignoreMouse;
    }

    public set ignoreMouse(flag: boolean) {
        this._ignoreMouse = flag;
    }

    public get xOffset(): number {
        return this._xOffset;
    }

    public set xOffset(offset: number) {
        this._xOffset = offset;
    }

    public get yOffset(): number {
        return this._yOffset;
    }

    public set yOffset(offset: number) {
        this._yOffset = offset;
    }

    public get zOffset(): number {
        return this._zOffset;
    }

    public set zOffset(offset: number) {
        this._zOffset = offset;
    }
}
