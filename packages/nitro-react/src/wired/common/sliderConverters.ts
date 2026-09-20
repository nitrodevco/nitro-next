/**
 * `wired_setup.common.slider_converter.*` - how a slider's int param reads as text and back.
 * The interface is Flash's `§_-71X§`; `precision` and `endsWithFive` also configure the number
 * input `SliderSection` puts next to the title (`NumberInputParam.precision` / `endsWithFive`).
 */

/** `slider_converter.§_-71X§`. */
export interface WiredSliderConverter {
    /** `toIntParam` - the displayed text back to the int param. */
    toIntParam: (text: string) => number;
    /** `toString` - the int param as displayed text. */
    toText: (value: number) => string;
    /** `precision` - decimals of the number input (negative: that many forced trailing zeros). */
    precision: number;
    /** `endsWithFive` - the number input shows the value times five and only accepts a last digit of 0 or 5. */
    endsWithFive: boolean;
}

/** ActionScript's `int(x)`. */
const toInt = (value: number): number => (value | 0);

/** `slider_converter.§_-L3§` (`SliderSection.CONVERTER_ECHO`) - the value as it is. */
export const SLIDER_CONVERTER_ECHO: WiredSliderConverter = {
    toIntParam: text => toInt(Number(text)),
    toText: value => value.toString(),
    precision: 0,
    endsWithFive: false,
};

/** `SliderValuePulses` (`SliderSection.CONVERTER_PULSES`) - half second pulses shown as seconds. */
export const SLIDER_CONVERTER_PULSES: WiredSliderConverter = {
    toIntParam: text => Math.round(Number(text) * 2),
    toText: (value) => {
        const seconds = Math.floor(value / 2);

        return ((value % 2) === 0) ? `${seconds}` : `${seconds}.5`;
    },
    precision: 1,
    endsWithFive: true,
};

/** `SliderValueSeconds5` - steps of five seconds. */
export const SLIDER_CONVERTER_SECONDS5: WiredSliderConverter = {
    toIntParam: text => Math.round(Number(text) / 5),
    toText: value => String(value * 5),
    precision: 0,
    endsWithFive: true,
};

/** `SliderValueHundredth` - hundredths shown with two decimals. */
export const SLIDER_CONVERTER_HUNDREDTH: WiredSliderConverter = {
    toIntParam: text => Math.round(Number(text) * 100),
    toText: value => (value / 100).toFixed(2),
    precision: 2,
    endsWithFive: false,
};

/** `SliderValueMilliseconds50` - steps of fifty milliseconds. */
export const SLIDER_CONVERTER_MILLISECONDS50: WiredSliderConverter = {
    toIntParam: text => toInt(Number(text) / 50),
    toText: value => `${value * 50}`,
    precision: -1,
    endsWithFive: true,
};

/** `SliderValueCountOrUnlimited` - a count, with one value (`unlimitedValue`) standing for "no limit". */
export const createSliderConverterCountOrUnlimited = (unlimitedValue: number): WiredSliderConverter => ({
    toIntParam: text => toInt(Number(text)),
    toText: value => ((value === unlimitedValue) ? '∞' : `${value}`),
    precision: 0,
    endsWithFive: false,
});
