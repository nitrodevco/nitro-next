/**
 * One `option_box` / `option_container` of the wired menu's layouts: a checkbox at (0, 1) and its
 * caption 20px to the right, siblings in a row. `disabled` is `Util.disableSection` on the
 * checkbox: half blend, no input; the caption is only greyed when the whole row is.
 *
 * The row clips what crosses it, as a Flash container clips its children at its rect: the
 * settings tab's 20x20 checkboxes sit at y 1 in a 20 high row and lose their last line, and
 * their 210 wide captions are cut at the 214 wide row.
 */
import { Box, CheckBox, ThemeText } from '#base/theme';

export interface WiredMenuCheckOptionProps {
    label: string;
    selected: boolean;
    onToggle: (selected: boolean) => void;
    /** The checkbox alone is disabled (an implied permission level). */
    disabled?: boolean;
    /** The whole row is disabled (its container went through `Util.disableSection`). */
    rowDisabled?: boolean;
    /** The checkbox's width and height in the layout. */
    checkSize?: readonly [ number, number ];
    /** The row's width and height. */
    width?: number;
    height?: number;
    /** The caption's box. A `clip` caption is `auto_size` none, cut at the box; otherwise it grows (`auto_size` left). */
    labelWidth?: number;
    labelHeight?: number;
    labelClip?: boolean;
}

export const WiredMenuCheckOption = ({
    label, selected, onToggle, disabled = false, rowDisabled = false, checkSize = [ 17, 17 ], width = 214, height = 20, labelWidth, labelHeight = 19, labelClip = false,
}: WiredMenuCheckOptionProps) => {
    const boxDisabled = disabled || rowDisabled;
    const [ checkWidth, checkHeight ] = checkSize;

    return (
        <Box layout={{ width, height, flexShrink: 0, overflow: 'hidden' }}>
            <Box
                alpha={boxDisabled ? 0.5 : 1}
                layout={{ position: 'absolute', left: 0, top: 1, width: checkWidth, height: checkHeight }}
            >
                <CheckBox
                    variant="3"
                    selected={selected}
                    disabled={boxDisabled}
                    onPointerTap={boxDisabled ? undefined : () => onToggle(!selected)}
                    layout={{ width: checkWidth, height: checkHeight }}
                />
            </Box>
            <ThemeText
                text={label}
                textStyle="u_regular"
                clip={labelClip}
                alpha={rowDisabled ? 0.5 : 1}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 20, top: 0, width: labelWidth, height: labelHeight }}
            />
        </Box>
    );
};
