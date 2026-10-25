/**
 * `uibuilder/presets/sections/ActionDelaySection` (WIN63-202610121624) - an action's delay, in
 * one of two modes picked in the section header (`delay.mode.standard` / `delay.mode.precise`):
 * standard is 0 to 120 half-second pulses (60 s), precise 0 to 1200 steps of 0.05 s. The title is
 * `delay.seconds` with the number input on its left, which the slider and the input keep in step.
 *
 * Controlled: `value` is the saved delay as `encodedDelay` writes it - the pulses, or for a
 * precise delay minus its milliseconds (`-(steps * 50)`), so a negative value opens in precise
 * mode. The mode itself is local, as Flash's dropdown is: a precise delay of 0 is saved as 0 and
 * opens as standard again.
 *
 * The mode is a `MiniIconDropdownPreset` in the header: the `delay_standard` / `delay_precise`
 * mini icon over a 90px dropdown (`createMiniIconDropdownPreset(..., "delay_standard", "")`).
 * Each mode keeps its own slider, as Flash's two do: switching shows the other slider's value,
 * 0 until it was moved, and the saved delay is the shown slider's (`encodedDelay`).
 */
import { useState } from 'react';

import { SLIDER_CONVERTER_PRECISE_DELAY, SLIDER_CONVERTER_PULSES } from '#base/wired';

import { WiredMiniIconDropdown } from './WiredMiniIconDropdown';
import { WiredNumberInput } from './WiredNumberInput';
import { WiredSection } from './WiredSection';
import { WiredSlider } from './WiredSlider';
import { useWiredStyle } from './WiredStyleContext';

/** `MODE_STANDARD` / `MODE_PRECISE`. */
const MODE_STANDARD = 0;
const MODE_PRECISE = 1;

/** `STANDARD_MAX` / `PRECISE_MAX`. */
const STANDARD_MAX = 120;
const PRECISE_MAX = 1200;

/** The milliseconds of one precise step (`encodedDelay = -(steps * 50)`). */
const PRECISE_STEP_MS = 50;

/** `MODE_STANDARD_ASSET` / `MODE_PRECISE_ASSET`. */
const MODE_STANDARD_ASSET = 'delay_standard';
const MODE_PRECISE_ASSET = 'delay_precise';

/** `DELAY_INPUT_WIDTH` / `MODE_DROPDOWN_WIDTH`. */
const DELAY_INPUT_WIDTH = 40;
const MODE_DROPDOWN_WIDTH = 90;

export interface WiredActionDelaySectionProps {
    value: number;
    onChange: (value: number) => void;
}

export const WiredActionDelaySection = ({ value, onChange }: WiredActionDelaySectionProps) => {
    const style = useWiredStyle();
    const [ mode, setMode ] = useState(value < 0 ? MODE_PRECISE : MODE_STANDARD);
    // The two sliders (`encodedDelay` setter: the one the value belongs to takes it, the other 0).
    const [ sliders, setSliders ] = useState(() => ({ standard: Math.max(0, value), precise: (value < 0) ? Math.abs(value) / PRECISE_STEP_MS : 0 }));
    const precise = mode === MODE_PRECISE;
    const converter = precise ? SLIDER_CONVERTER_PRECISE_DELAY : SLIDER_CONVERTER_PULSES;
    const max = precise ? PRECISE_MAX : STANDARD_MAX;
    const active = precise ? sliders.precise : sliders.standard;
    const encode = (next: number) => {
        setSliders(current => (precise ? { ...current, precise: next } : { ...current, standard: next }));
        onChange(precise ? -(next * PRECISE_STEP_MS) : next);
    };

    const selectMode = (next: number) => {
        if (next === mode) return;

        setMode(next);
        onChange((next === MODE_PRECISE) ? -(sliders.precise * PRECISE_STEP_MS) : sliders.standard);
    };

    return (
        <WiredSection
            title="${wiredfurni.params.delay.seconds}"
            titleYOffset={style.namedInputOffset}
            headerOptionLeft={(
                <WiredNumberInput
                    value={active}
                    onChange={encode}
                    min={0}
                    max={max}
                    width={DELAY_INPUT_WIDTH}
                    precision={converter.precision}
                    endsWithFive={converter.endsWithFive}
                />
            )}
            headerOptions={(
                <WiredMiniIconDropdown
                    options={[
                        { id: MODE_STANDARD, label: '${wiredfurni.params.delay.mode.standard}' },
                        { id: MODE_PRECISE, label: '${wiredfurni.params.delay.mode.precise}' },
                    ]}
                    selected={mode}
                    onSelect={selectMode}
                    width={MODE_DROPDOWN_WIDTH}
                    asset={precise ? MODE_PRECISE_ASSET : MODE_STANDARD_ASSET}
                />
            )}
        >
            <WiredSlider
                min={0}
                max={max}
                step={1}
                value={active}
                onChange={encode}
            />
        </WiredSection>
    );
};
