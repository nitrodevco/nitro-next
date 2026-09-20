/**
 * One `option_box` / `option_container` of the wired menu's layouts: a checkbox at (0, 1) and its
 * caption 20px to the right, siblings in a row. `disabled` is `Util.disableSection` on the
 * checkbox: half blend, no input; the caption is only greyed when the whole row is.
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
    /** The checkbox's size in the layout. */
    size?: number;
    width?: number;
}

export const WiredMenuCheckOption = ({ label, selected, onToggle, disabled = false, rowDisabled = false, size = 17, width = 214 }: WiredMenuCheckOptionProps) => {
    const boxDisabled = disabled || rowDisabled;

    return (
        <Box layout={{ width, height: 20, flexShrink: 0 }}>
            <Box
                alpha={boxDisabled ? 0.5 : 1}
                layout={{ position: 'absolute', left: 0, top: 1, width: size, height: size }}
            >
                <CheckBox
                    variant="3"
                    selected={selected}
                    disabled={boxDisabled}
                    onPointerTap={boxDisabled ? undefined : () => onToggle(!selected)}
                    layout={{ width: size, height: size }}
                />
            </Box>
            <ThemeText
                text={label}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#000000' }}
                alpha={rowDisabled ? 0.5 : 1}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 20, top: 0, height: 19 }}
            />
        </Box>
    );
};
