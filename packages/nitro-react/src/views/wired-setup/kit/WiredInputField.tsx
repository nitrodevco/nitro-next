/**
 * The editable field `TextInputPreset`, `NumberInputPreset` and `TextAreaPreset` share: the
 * style's `input_template` (`WiredInputFrame`) with its `field` inside, the placeholder text
 * Flash lays over the field (half blend, at the field's own position, shown while the field is
 * empty - focused or not), and illumina's `char_limit_warn` bubble. Internal to the kit.
 *
 * The bubble is the template's: a 17px high `border` of style 2 tinted `#222222` at blend 0.7,
 * right-aligned with the input and 20px above it, holding `il_regular_white` text 5px in. Its
 * width follows the text (the template's 49 fits "95/100").
 *
 * `warning` is `NumberInputPreset.updateInvalidState`, for a template with `warning_display`
 * (illumina's since the 2026 revision): the template tinted `invalidInputBackgroundColor` and,
 * centred above it, `error_text` (`il_regular`, 7px in) in a 23px border of style 0 with a
 * rhombus tip under it, 4px over the input. Its width follows the text, as the template's
 * auto-sized border does.
 *
 * A field that is not `editable` shows its text the way the Flash field does with
 * `editable = false`: the same text, no caret.
 */
import { Border, Box, Shape, TextInput, ThemeText } from '#base/theme';
import { showsCharLimitWarning } from '#base/wired';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredTextFormat } from './useWiredTextFormat';
import { WiredFlashLabel } from './WiredFlashLabel';
import { WiredInputFrame } from './WiredInputFrame';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

/** `char_limit_warn` in `input_template`: its border's offset from the template's top. */
const WARN_TOP = -20;
const WARN_HEIGHT = 17;
const WARN_PADDING = 5;

/** `warning_display` in illumina's `input_template`, measured from the template's top. */
const ERROR_TOP = -32;
const ERROR_HEIGHT = 23;
const ERROR_PADDING_LEFT = 7;
const ERROR_PADDING_RIGHT = 8;
const ERROR_TEXT_TOP = 4;
/** The tip: a 21x20 rhombus seen through a 7x6 window 1px over the border's bottom edge. */
const ERROR_TIP_TOP = -10;
const ERROR_TIP_WIDTH = 7;
const ERROR_TIP_HEIGHT = 6;
/** `Shape` draws into a 100 unit box stretched to its size; this keeps its stroke at 1px. */
const ERROR_TIP_STROKE = 100 / 21;

export interface WiredInputFieldProps {
    value: string;
    onChange: (value: string) => void;
    /** The params' `width` - the field's own width; negative or absent: the frame fills. */
    fieldWidth?: number;
    /** `TextAreaParam.height` - the whole template's height. */
    height?: number;
    multiline?: boolean;
    /** `maxChars` (only applied when above 0, as Flash does). */
    maxCharacters?: number;
    /** A literal or `${key}`. */
    placeholder?: string;
    /** `TextParam(MODE_OVERFLOW)` for a one-line input, `MODE_MULTILINE` for a text area. */
    placeholderMode?: 'overflow' | 'multiline';
    /** Default `true`. */
    editable?: boolean;
    /** A literal or `${key}`. */
    tooltip?: string;
    /** `updateWarn` - text inputs and text areas show the bubble (when the template has one), number inputs never do. */
    charLimitWarning?: boolean;
    /** `updateInvalidState` - the invalid number message; shown when the template has `warning_display`. */
    warning?: string | null;
    disabled?: boolean;
}

export const WiredInputField = ({ value, onChange, fieldWidth, height, multiline = false, maxCharacters = 0, placeholder, placeholderMode = 'overflow', editable = true, tooltip, charLimitWarning = false, warning = null, disabled = false }: WiredInputFieldProps) => {
    const style = useWiredStyle();
    const template = style.templates.input;
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const fieldFormat = useWiredTextFormat({ textStyle: template.textStyle, bold: false, color: template.textColor, height: template.height });
    const showsWarn = charLimitWarning && template.hasCharLimitWarn && showsCharLimitWarning(value.length, maxCharacters);

    const showsError = template.hasWarningDisplay && !!warning;
    const fieldBackground = (showsError ? style.invalidInputBackgroundColor : template.backgroundColor) ?? '';

    const errorOverlay = showsError
        ? (
                <Box
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, right: 0, top: ERROR_TOP, height: ERROR_HEIGHT - ERROR_TOP, flexDirection: 'column', alignItems: 'center' }}
                >
                    <Border
                        variant="0"
                        layout={{ flexDirection: 'row', height: ERROR_HEIGHT, paddingLeft: ERROR_PADDING_LEFT, paddingRight: ERROR_PADDING_RIGHT, paddingTop: ERROR_TEXT_TOP }}
                    >
                        <ThemeText
                            text={warning}
                            textStyle="text-style-il-regular"
                        />
                    </Border>
                    <Box layout={{ position: 'absolute', top: ERROR_TIP_TOP - ERROR_TOP, width: ERROR_TIP_WIDTH, height: ERROR_TIP_HEIGHT, overflow: 'hidden' }}>
                        <Shape
                            shape="rhombus"
                            strokeColor="#5a5a5a"
                            strokeThickness={ERROR_TIP_STROKE}
                            layout={{ position: 'absolute', left: -7, top: -15, width: 21, height: 20 }}
                        />
                    </Box>
                </Box>
            )
        : undefined;

    const overlay = showsWarn
        ? (
                <Box layout={{ position: 'absolute', right: 0, top: WARN_TOP, height: WARN_HEIGHT, flexDirection: 'row' }}>
                    <Border
                        variant="2"
                        tintColor="#222222"
                        blend={0.7}
                        layout={{ flexDirection: 'row', height: WARN_HEIGHT, paddingLeft: WARN_PADDING, paddingRight: WARN_PADDING, paddingTop: 1 }}
                    >
                        <ThemeText
                            text={`${value.length}/${maxCharacters}`}
                            textStyle="text-style-il-regular-white"
                        />
                    </Border>
                </Box>
            )
        : undefined;

    return (
        <WiredInputFrame
            fieldWidth={fieldWidth}
            height={height}
            alpha={wiredDisabledAlpha(isDisabled)}
            tooltip={tooltip ? caption(tooltip) : undefined}
            invalid={showsError}
            overlay={overlay ?? errorOverlay}
        >
            {editable
                ? (
                        <Box
                            eventMode={isDisabled ? 'none' : 'auto'}
                            layout={{ flexGrow: 1, flexShrink: 1, minWidth: 0, height: '100%' }}
                        >
                            <TextInput
                                value={value}
                                onChange={onChange}
                                multiline={multiline}
                                maxLength={(maxCharacters > 0) ? maxCharacters : undefined}
                                textStyle={template.textStyle}
                                textColor={template.textColor}
                                // An empty colour draws no fill: the dark volter's field is see-through. The
                                // invalid tint multiplies the template's white, which leaves the tint itself.
                                backgroundColor={fieldBackground}
                                focusedBackgroundColor={fieldBackground}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Box>
                    )
                : (
                        <Box layout={{ flexGrow: 1, flexShrink: 1, minWidth: 0, height: '100%', overflow: 'hidden' }}>
                            <WiredFlashLabel
                                text={value}
                                format={fieldFormat}
                            />
                        </Box>
                    )}
            {!value.length && !!placeholder && (
                <Box
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, right: 0, flexDirection: 'column' }}
                >
                    <WiredText
                        text={placeholder}
                        mode={placeholderMode}
                        halfBlend
                    />
                </Box>
            )}
        </WiredInputFrame>
    );
};
