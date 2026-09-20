/**
 * `wired_setup.uibuilder.presets.TextInputPreset` with `params.TextInputParam` - a one-line text
 * field in the style's `input_template`.
 *
 * - `width` is the field's own width; the frame adds what the template puts around the field.
 *   Without one (Flash's -1) the input fills - it has a static width only with one.
 * - `maxCharacters` (default 1000) caps the text when above 0, and near the cap illumina shows
 *   the "n/max" bubble over the input (`shouldShowWarn`, see `showsCharLimitWarning`).
 * - `placeholder` shows at half blend, cut with "...", while the text is empty.
 * - `restrict` is the Flash `TextField.restrict` string (`applyTextRestrict`).
 *
 * Controlled: `value` is the text, `onChange` is `addListener`'s callback with the new text.
 */
import { applyTextRestrict } from '#base/wired';

import { WiredInputField } from './WiredInputField';

export interface WiredTextInputProps {
    value: string;
    onChange: (value: string) => void;
    /** `TextInputParam.width`. Default -1: fills. */
    width?: number;
    /** `maxCharacters`. Default 1000. */
    maxCharacters?: number;
    /** `placeholder` - a literal or `${key}`. */
    placeholder?: string;
    /** `restrict`. Default `null`: any character. */
    restrict?: string | null;
    /** `editable`. Default `true`. */
    editable?: boolean;
    /** `tooltip` - a literal or `${key}`. */
    tooltip?: string;
    disabled?: boolean;
}

export const WiredTextInput = ({ value, onChange, width = -1, maxCharacters = 1000, placeholder, restrict = null, editable = true, tooltip, disabled = false }: WiredTextInputProps) => (
    <WiredInputField
        value={value}
        onChange={text => onChange(applyTextRestrict(text, restrict))}
        fieldWidth={width}
        maxCharacters={maxCharacters}
        placeholder={placeholder}
        placeholderMode="overflow"
        editable={editable}
        tooltip={tooltip}
        charLimitWarning
        disabled={disabled}
    />
);
