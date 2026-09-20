/**
 * `wired_setup.uibuilder.presets.NumberInputPreset` with `params.NumberInputParam` - an int typed
 * as text in the style's `input_template`, with the preset's rules from `#base/wired`
 * (`numberInput.ts`): the `restrict` filter, the `precision` shift of the decimal point, the
 * `endsWithFive` scaling and the `[min, max]` range.
 *
 * - `width` is the field's width (default 45, the param's); the frame adds the template's
 *   margins. -1 makes the input fill; otherwise it has a static width.
 * - The value only reaches `onChange` while the text is a valid, in-range number; any other text
 *   stays in the field as typed and nothing is reported (`onTextChange`). The field is then
 *   tinted `invalidInputBackgroundColor` under `invalidNumberMessage` / `rangeValidationMessage`
 *   (`updateInvalidState`) - in a template with `warning_display`, which of the wired styles only
 *   illumina's has (2026 revision); the others show nothing, as in the client.
 *
 * Controlled: a `value` from outside (the slider moving, a reset) rewrites the text
 * (`setValue`); a value that the field itself reported keeps what was typed.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { numberInputErrorMessage, numberInputText, readNumberInputText, restrictNumberInputText, WiredNumberInputRules } from '#base/wired';

import { WiredInputField } from './WiredInputField';

export interface WiredNumberInputProps {
    value: number;
    /** `onValueChange` - the new int, only for valid text. */
    onChange: (value: number) => void;
    /** `NumberInputParam.min`. */
    min: number;
    /** `max`. */
    max: number;
    /** `width`. Default 45; -1 fills. */
    width?: number;
    /** `precision`. Default 0. */
    precision?: number;
    /** `endsWithFive`. Default `false`. */
    endsWithFive?: boolean;
    /** `nonDecimalNotations` - `0b` / `0x` input. Default `false`. */
    nonDecimalNotations?: boolean;
    /** `tooltip` - a literal or `${key}`. */
    tooltip?: string;
    disabled?: boolean;
}

interface FieldText {
    text: string;
    /** The value `text` stands for - when `value` differs, the text is rewritten from it. */
    value: number;
    /** Why `text` is not a value, while it is not one (`updateInvalidState`). */
    error: 'invalid' | 'range' | null;
}

export const WiredNumberInput = ({ value, onChange, min, max, width = 45, precision = 0, endsWithFive = false, nonDecimalNotations = false, tooltip, disabled = false }: WiredNumberInputProps) => {
    const t = useTranslation();
    const rules: WiredNumberInputRules = { min, max, precision, endsWithFive, nonDecimalNotations };
    const [ field, setField ] = useState<FieldText>(() => ({ text: numberInputText(value, rules), value, error: null }));

    let shown = field;

    // `setValue` - a value from outside rewrites the text and clears the invalid state.
    if (field.value !== value) {
        shown = { text: numberInputText(value, rules), value, error: null };
        setField(shown);
    }

    const change = (typed: string) => {
        const text = restrictNumberInputText(typed, rules);
        const result = readNumberInputText(text, rules);

        if (!result.valid) {
            setField({ text, value: shown.value, error: result.reason });

            return;
        }

        setField({ text, value: result.value, error: null });

        if (result.value !== value) onChange(result.value);
    };

    return (
        <WiredInputField
            value={shown.text}
            onChange={change}
            fieldWidth={width}
            tooltip={tooltip}
            warning={shown.error && numberInputErrorMessage(shown.error, rules, t)}
            disabled={disabled}
        />
    );
};
