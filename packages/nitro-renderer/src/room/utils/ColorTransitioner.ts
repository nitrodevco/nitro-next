import { ColorConverter } from '@nitrodevco/nitro-api';

/**
 * `com.sulake.room.utils.ColorTransitioner`: a colour and a brightness faded linearly to a target
 * over a transition (1500 ms unless told otherwise). The colour it hands out is the faded colour
 * with its lightness replaced by the faded brightness. `RoomLogic` fades the room planes'
 * background colour with one, `RoomDesktop` the room view's colorizer with another.
 */
export class ColorTransitioner {
    private _color: number;
    private _light: number;
    private _originalColor: number;
    private _originalLight: number;
    private _targetColor: number;
    private _targetLight: number;
    private _colorChangedTime: number = 0;
    private _colorTransitionLength: number = 0;

    constructor(color: number = 0xFFFFFF, light: number = 0xFF) {
        this._color = color;
        this._light = light;
        this._originalColor = color;
        this._originalLight = light;
        this._targetColor = color;
        this._targetLight = light;
    }

    public startTransition(color: number, light: number, time: number, length: number = 1500): void {
        this._originalColor = this._color;
        this._originalLight = this._light;
        this._targetColor = color;
        this._targetLight = light;
        this._colorChangedTime = time;
        this._colorTransitionLength = length;
    }

    /** Moves the fade on to `time`; false when no transition is running. */
    public updateColor(time: number): boolean {
        if (!this._colorChangedTime) return false;

        if ((time - this._colorChangedTime) >= this._colorTransitionLength) {
            this._color = this._targetColor;
            this._light = this._targetLight;
            this._colorChangedTime = 0;

            return true;
        }

        const offset = (time - this._colorChangedTime) / this._colorTransitionLength;

        // AS3 keeps each channel in an untyped local, so the sums below stay fractional until the `<<`.
        const red = ((this._originalColor >> 16) & 0xFF) + ((((this._targetColor >> 16) & 0xFF) - ((this._originalColor >> 16) & 0xFF)) * offset);
        const green = ((this._originalColor >> 8) & 0xFF) + ((((this._targetColor >> 8) & 0xFF) - ((this._originalColor >> 8) & 0xFF)) * offset);
        const blue = (this._originalColor & 0xFF) + (((this._targetColor & 0xFF) - (this._originalColor & 0xFF)) * offset);

        this._color = (red << 16) + (green << 8) + Math.trunc(blue);
        this._light = Math.trunc(this._originalLight + ((this._targetLight - this._originalLight) * offset));

        return true;
    }

    public get color(): number {
        const hsl = ColorConverter.rgbToHSL(this._color);

        return ColorConverter.hslToRGB((hsl & 0xFFFF00) + this._light);
    }
}
