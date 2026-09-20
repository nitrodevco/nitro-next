/**
 * The layout `RadioButtonPreset` and `CheckboxOptionPreset` share, which the two Flash classes
 * each spell out: the control, an optional icon and the caption in a row, `extra1` continuing
 * that row, `extra2` underneath it at the style's `optionExtraUnderLeftMargin`.
 *
 * - The caption wraps across what the control leaves, unless there is an `extra1`: then it is
 *   one line as wide as its text and `extra1` takes the rest.
 * - The style's y offset (`radioButtonYOffset` / `checkboxYOffset`) lowers the icon and caption
 *   when positive and the control when negative.
 * - An `extra1` taller than the row centres the row on itself.
 * - Both extras are disabled while the option is not selected (`onUnSelect`), and with the
 *   option when that is disabled as a whole.
 * - Every option but the group's last is at least `minimumOptionHeight` high and keeps
 *   `minimumOptionSpacing` under it.
 *
 * Internal to the kit: views use `WiredRadioGroup` / `WiredCheckboxGroup`, or
 * `WiredRadioButton` / `WiredCheckboxOption` for a single option.
 */
import { ReactNode } from 'react';

import { Box, BoxLayout } from '#base/theme';
import { resolveWiredAssetName } from '#base/wired';

import { useWiredDisabled } from './useWiredDisabled';
import { WiredDisabled } from './WiredDisabled';
import { WiredFlow } from './WiredFlow';
import { WiredStaticBitmap } from './WiredStaticBitmap';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

export interface WiredOptionRowProps {
    /** The radio button or checkbox itself. */
    control: ReactNode;
    /** `radioButtonSpacing` / `checkboxSpacing`. */
    spacing: number;
    /** `radioButtonYOffset` / `checkboxYOffset`. */
    yOffset: number;
    /** `text` - a literal or `${key}`. */
    label?: string;
    /** `iconAssetName` - a wired asset's short name. */
    icon?: string;
    /** `extra1`. */
    extra?: ReactNode;
    /** `extra2`. */
    extraUnder?: ReactNode;
    selected: boolean;
    disabled?: boolean;
    /** The group's last option: no minimum height, no spacing under it. */
    last?: boolean;
    layout?: BoxLayout;
}

export const WiredOptionRow = ({ control, spacing, yOffset, label, icon, extra, extraUnder, selected, disabled = false, last = false, layout }: WiredOptionRowProps) => {
    const style = useWiredStyle();
    const isDisabled = useWiredDisabled(disabled);
    const contentOffset = Math.max(0, yOffset);
    const controlOffset = Math.max(0, -yOffset);
    const hasExtra = (extra !== undefined) && (extra !== null) && (extra !== false);
    const hasExtraUnder = (extraUnder !== undefined) && (extraUnder !== null) && (extraUnder !== false);

    return (
        <WiredDisabled disabled={isDisabled}>
            <Box layout={{
                flexDirection: 'column',
                gap: style.optionExtraUnderSpacing,
                flexShrink: 0,
                minHeight: last ? undefined : style.minimumOptionHeight,
                paddingBottom: last ? 0 : style.minimumOptionSpacing,
                ...layout,
            }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: spacing, alignSelf: 'stretch' }}>
                    <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing, flexGrow: hasExtra ? 0 : 1, flexShrink: hasExtra ? 0 : 1, flexBasis: hasExtra ? undefined : 0, minWidth: 0 }}>
                        <Box layout={{ marginTop: controlOffset, flexShrink: 0 }}>
                            {control}
                        </Box>
                        <WiredFlow direction="row">
                            {!!icon && (
                                <WiredStaticBitmap
                                    asset={`wired/${resolveWiredAssetName(style, icon)}`}
                                    layout={{ marginTop: contentOffset }}
                                />
                            )}
                            {!!label && (
                                <WiredText
                                    text={label}
                                    mode={hasExtra ? 'stretch' : 'multiline'}
                                    layout={{ marginTop: contentOffset }}
                                />
                            )}
                        </WiredFlow>
                    </Box>
                    {hasExtra && (
                        <WiredFlow direction="row">
                            <WiredDisabled disabled={!selected}>
                                {extra}
                            </WiredDisabled>
                        </WiredFlow>
                    )}
                </Box>
                {hasExtraUnder && (
                    <Box layout={{ flexDirection: 'column', alignSelf: 'stretch', paddingLeft: style.optionExtraUnderLeftMargin }}>
                        <WiredFlow direction="column">
                            <WiredDisabled disabled={!selected}>
                                {extraUnder}
                            </WiredDisabled>
                        </WiredFlow>
                    </Box>
                )}
            </Box>
        </WiredDisabled>
    );
};
