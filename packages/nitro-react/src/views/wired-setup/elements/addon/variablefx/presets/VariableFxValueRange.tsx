/**
 * `addons/variablefx/presets/VariableFxValueRangePreset` - the "value range" section: the soft info
 * text over one row, centred on its height, of `Min:` (26px), the minimum input, `-` (8px), `Max:`
 * (30px) and the maximum input (both inputs fill, any int). Hidden for the categories without a
 * range (levelling progress, number display).
 *
 * The inputs hold their own values (`rangeMin` / `rangeMax`); each change applies them to the
 * state and sanitises it (`onNumberChange`), which may move the state's maximum above the
 * minimum without rewriting the input, as Flash leaves it.
 */
import { WIRED_INT_MAX, WIRED_INT_MIN } from '#base/wired';

import { WiredNumberInput } from '../../../../kit/WiredNumberInput';
import { WiredSection } from '../../../../kit/WiredSection';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { useWiredStyle } from '../../../../kit/WiredStyleContext';
import { WiredText } from '../../../../kit/WiredText';

/** `_loc9_.window.width = 26` and so on. */
const MIN_LABEL_WIDTH = 26;
const DASH_WIDTH = 8;
const MAX_LABEL_WIDTH = 30;

export interface VariableFxValueRangeProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

export const VariableFxValueRange = ({ min, max, onChange }: VariableFxValueRangeProps) => {
    const style = useWiredStyle();

    return (
        <WiredSection title="${wiredfurni.params.variablefx.value_range}">
            <WiredSimpleList>
                <WiredText
                    text="${wiredfurni.params.variablefx.value_range.info}"
                    color={style.softTextColor}
                />
                <WiredSimpleList
                    vertical={false}
                    centerVertically
                >
                    <WiredText
                        text="Min:"
                        mode="stretch"
                        width={MIN_LABEL_WIDTH}
                    />
                    <WiredNumberInput
                        value={min}
                        onChange={value => onChange(value, max)}
                        min={WIRED_INT_MIN}
                        max={WIRED_INT_MAX}
                        width={-1}
                    />
                    <WiredText
                        text="-"
                        mode="stretch"
                        width={DASH_WIDTH}
                    />
                    <WiredText
                        text="Max:"
                        mode="stretch"
                        width={MAX_LABEL_WIDTH}
                    />
                    <WiredNumberInput
                        value={max}
                        onChange={value => onChange(min, value)}
                        min={WIRED_INT_MIN}
                        max={WIRED_INT_MAX}
                        width={-1}
                    />
                </WiredSimpleList>
            </WiredSimpleList>
        </WiredSection>
    );
};
