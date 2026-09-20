/**
 * `wired_setup.uibuilder.presets.RadioButtonPreset` with `params.RadioButtonParam` - one radio
 * option: the style's `radiobutton_view`, an optional icon, the caption and the two extras (see
 * `WiredOptionRow` for the layout rules). `WiredRadioGroup` renders these; use it on its own for
 * a radio button outside a group.
 *
 * Only the button itself is clicked, as in Flash, where the caption is a separate text window.
 */
import { ReactNode } from 'react';

import { Box, BoxLayout, RadioButton } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { WiredOptionRow } from './WiredOptionRow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredRadioButtonProps {
    /** `RadioButtonParam.text` - a literal or `${key}`. */
    label?: string;
    /** `RadioButtonParam.iconAssetName`. */
    icon?: string;
    /** `RadioButtonParam.extra1` - continues the option's row; disabled while the option is not selected. */
    extra?: ReactNode;
    /** `RadioButtonParam.extra2` - under the row; disabled while the option is not selected. */
    extraUnder?: ReactNode;
    selected: boolean;
    onSelect: () => void;
    disabled?: boolean;
    /** The constructor's `last` flag: no minimum height and no spacing under the option. */
    last?: boolean;
    layout?: BoxLayout;
}

export const WiredRadioButton = ({ label, icon, extra, extraUnder, selected, onSelect, disabled = false, last = false, layout }: WiredRadioButtonProps) => {
    const style = useWiredStyle();
    const isDisabled = useWiredDisabled(disabled);
    const template = style.templates.radioButton;

    return (
        <WiredOptionRow
            spacing={style.radioButtonSpacing}
            yOffset={style.radioButtonYOffset}
            label={label}
            icon={icon}
            extra={extra}
            extraUnder={extraUnder}
            selected={selected}
            disabled={disabled}
            last={last}
            layout={layout}
            control={(
                <Box
                    alpha={wiredDisabledAlpha(isDisabled)}
                    layout={{ flexShrink: 0 }}
                >
                    <RadioButton
                        variant={template.variant}
                        selected={selected}
                        disabled={isDisabled}
                        onPointerTap={() => {
                            if (!selected) onSelect();
                        }}
                        layout={{ width: template.width, height: template.height }}
                    />
                </Box>
            )}
        />
    );
};
