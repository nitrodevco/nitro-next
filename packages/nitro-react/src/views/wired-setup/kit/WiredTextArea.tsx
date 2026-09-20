/**
 * `wired_setup.uibuilder.presets.TextAreaPreset` with `params.TextAreaParam` - a multi-line text
 * field: the style's `input_template` made `height` high, the field multiline.
 *
 * - `width` is the field's own width (the frame adds the template's margins); without one the
 *   area fills.
 * - `maxCharacters` (default 1000) caps the text when above 0 and brings up illumina's "n/max"
 *   bubble near the cap; `placeholder` shows wrapped at half blend while the text is empty.
 * - `maxLines` (when 0 or more) refuses an edit that makes more than that many `\n` separated
 *   lines. The theme's multiline field always word-wraps, so `wordWrap = false` has no
 *   counterpart and wrapped lines are not counted; `maxCharactersPerLine` is carried by the
 *   Flash param but not read by the Flash preset, so it has none either.
 *
 * Controlled: `value` is the text with `\n` line breaks (`TextAreaPreset.text` turns the
 * field's `\r` into `\n`, `normalizeTextAreaText`); `onChange` gets every edit. Flash reads the
 * text when the box is saved; the form simply holds it.
 */
import { applyTextRestrict, normalizeTextAreaText } from '#base/wired';

import { WiredInputField } from './WiredInputField';

export interface WiredTextAreaProps {
    value: string;
    onChange: (value: string) => void;
    /** `TextAreaParam.height` - the whole field's height. */
    height: number;
    /** `width`. Default -1: fills. */
    width?: number;
    /** `maxCharacters`. Default 1000. */
    maxCharacters?: number;
    /** `maxLines`. Default -1: no limit. */
    maxLines?: number;
    /** `placeholder` - a literal or `${key}`. */
    placeholder?: string;
    /** `restrict`. Default `null`. */
    restrict?: string | null;
    /** `editable`. Default `true`. */
    editable?: boolean;
    /** `tooltip` - a literal or `${key}`. */
    tooltip?: string;
    disabled?: boolean;
}

export const WiredTextArea = ({ value, onChange, height, width = -1, maxCharacters = 1000, maxLines = -1, placeholder, restrict = null, editable = true, tooltip, disabled = false }: WiredTextAreaProps) => (
    <WiredInputField
        value={value}
        onChange={(text) => {
            const next = normalizeTextAreaText(applyTextRestrict(text, restrict));

            if ((maxLines >= 0) && (next.split('\n').length > Math.max(1, maxLines))) return;

            onChange(next);
        }}
        fieldWidth={width}
        height={height}
        multiline
        maxCharacters={maxCharacters}
        placeholder={placeholder}
        placeholderMode="multiline"
        editable={editable}
        tooltip={tooltip}
        charLimitWarning
        disabled={disabled}
    />
);
