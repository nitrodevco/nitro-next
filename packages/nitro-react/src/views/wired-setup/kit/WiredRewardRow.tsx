/**
 * `uibuilder/presets/combinations/RewardRowPreset` - one line of `WiredRewardList`: the style's
 * bare checkbox (`createCheckboxView` - is the code a badge), the product or badge code
 * (100 characters, filling the row) and the chance to get it (digits only, 3 characters, 50px),
 * `genericHorizontalSpacing` apart. The tooltips are Flash's literals.
 *
 * Controlled: `row` is one `WiredRewardRowData` of the form, `onChange` hands back the changed
 * row. `probabilityEnabled` is `setProbabilityVisible`: off, the chance field is disabled and
 * keeps its text.
 */
import { Box, CheckBox } from '#base/theme';
import { WiredRewardRowData } from '#base/wired';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';
import { WiredTextInput } from './WiredTextInput';

/** `TextInputParam("", 3, null, 50, "0-9", true, ...)` of the chance field. */
const PROBABILITY_WIDTH = 50;
const PROBABILITY_MAX_CHARACTERS = 3;
/** `TextInputParam("", 100, ...)` of the code field. */
const CODE_MAX_CHARACTERS = 100;

export interface WiredRewardRowProps {
    row: WiredRewardRowData;
    probabilityEnabled: boolean;
    onChange: (row: WiredRewardRowData) => void;
}

export const WiredRewardRow = ({ row, probabilityEnabled, onChange }: WiredRewardRowProps) => {
    const style = useWiredStyle();
    const disabled = useWiredDisabled();
    const checkbox = style.templates.checkbox;

    return (
        <WiredSimpleList
            vertical={false}
            spacing={style.genericHorizontalSpacing}
        >
            <Box
                alpha={wiredDisabledAlpha(disabled)}
                layout={{ flexShrink: 0 }}
            >
                <CheckBox
                    variant={checkbox.variant}
                    selected={row.isBadge}
                    disabled={disabled}
                    onPointerTap={() => onChange({ ...row, isBadge: !row.isBadge })}
                    layout={{ width: checkbox.width, height: checkbox.height, padding: 0 }}
                />
            </Box>
            <WiredTextInput
                value={row.code}
                onChange={code => onChange({ ...row, code })}
                maxCharacters={CODE_MAX_CHARACTERS}
                tooltip="Product code or badge code"
            />
            <WiredTextInput
                value={row.probabilityText}
                onChange={probabilityText => onChange({ ...row, probabilityText })}
                maxCharacters={PROBABILITY_MAX_CHARACTERS}
                width={PROBABILITY_WIDTH}
                restrict="0-9"
                tooltip="Chance to get this reward. Value should be a number between 1 and 100"
                disabled={!probabilityEnabled}
            />
        </WiredSimpleList>
    );
};
