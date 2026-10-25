/**
 * `wired_setup.common.slider_converter.*` - how a slider's int param reads as text and back.
 * The interface is Flash's `§_-71X§`; `precision` and `endsWithFive` also configure the number
 * input `SliderSection` puts next to the title (`NumberInputParam.precision` / `endsWithFive`).
 */
import { toInt } from './WiredUtil';

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

/** `slider_converter.§_-L3§` (`SliderSection.CONVERTER_ECHO`) - the value as it is. */
export const SLIDER_CONVERTER_ECHO: WiredSliderConverter = {
    toIntParam: text => toInt(Number(text)),
    toText: value => value.toString(),
    precision: 0,
    endsWithFive: false,
};

/**
 * `slider_converter.§_-Cw§` (`ActionDelaySection.CONVERTER_PRECISE_DELAY`, WIN63-202610121624) -
 * steps of 0.05 s shown as seconds: `38.8`, `0.05`, `2`.
 */
export const SLIDER_CONVERTER_PRECISE_DELAY: WiredSliderConverter = {
    toIntParam: text => Math.round(Number(text) * 20),
    toText: (value) => {
        const ms = value * 50;
        const seconds = toInt(ms / 1000);
        const rest = ms % 1000;

        if (rest === 0) return String(seconds);

        return `${seconds}.${((rest % 100) === 0) ? String(rest / 100) : (((rest < 100) ? '0' : '') + String(rest / 10))}`;
    },
    precision: 2,
    endsWithFive: true,
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
