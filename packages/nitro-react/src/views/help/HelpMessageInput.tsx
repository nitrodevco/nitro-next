/**
 * `help_message` - the window manager's `IlluminaInputWidget` as the help window's layout sets it:
 * `button_caption` empty, so no submit button (`buttonCaption` hides it) and the input runs the
 * widget's width (`refresh`: the root's width less the input's margin on both sides); `multiline`,
 * so it keeps the widget's height; the grey `empty_message` while it is empty. `maxChars` is the
 * controller's `FIELD_MAX_CHARS`.
 */
import { Border, TextInput, ThemeText } from '#base/theme';

/** `illumina_input`: the input 5 in, 5 down. */
const INPUT_X = 5;
const INPUT_Y = 5;
/** `empty_message`'s `0x888888`. */
const EMPTY_COLOR = '#888888';

export interface HelpMessageInputProps {
    value: string;
    onChange: (value: string) => void;
    maxChars: number;
    emptyMessage: string;
    width: number;
    height: number;
}

export const HelpMessageInput = ({ value, onChange, maxChars, emptyMessage, width, height }: HelpMessageInputProps) => (
    <Border
        variant="105"
        layout={{ position: 'absolute', left: 0, top: 0, width, height }}
    >
        {!value.length && (
            <ThemeText
                text={emptyMessage}
                textStyle="il_regular"
                textOptions={{ fill: EMPTY_COLOR }}
                layout={{ position: 'absolute', left: INPUT_X + 1, top: INPUT_Y }}
            />
        )}
        <TextInput
            value={value}
            onChange={text => onChange(text.slice(0, maxChars))}
            maxLength={maxChars}
            multiline
            textStyle="il_regular"
            backgroundColor={null}
            focusedBackgroundColor={null}
            flashPlacement
            layout={{ position: 'absolute', left: INPUT_X, top: INPUT_Y, width: width - (INPUT_X * 2), height: height - (INPUT_Y * 2) }}
        />
    </Border>
);
