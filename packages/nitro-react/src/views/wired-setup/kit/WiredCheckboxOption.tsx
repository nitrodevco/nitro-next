/**
 * `wired_setup.uibuilder.presets.CheckboxOptionPreset` with `params.CheckboxOptionParam` - one
 * checkbox option: the style's `checkbox_view`, an optional icon, the caption and the two extras
 * (see `WiredOptionRow` for the layout rules). `WiredCheckboxGroup` renders these; use it on its
 * own for a single checkbox (Flash: `createCheckboxOption(param, true)`).
 *
 * Only the box itself is clicked, as in Flash, where the caption is a separate text window.
 */
import { ReactNode } from 'react';

import { Box, BoxLayout, CheckBox } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { WiredOptionRow } from './WiredOptionRow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredCheckboxOptionProps {
    /** `CheckboxOptionParam.text` - a literal or `${key}`. */
    label?: string;
    /** `CheckboxOptionParam.iconAssetName`. */
    icon?: string;
    /** `CheckboxOptionParam.extra1` - continues the option's row; disabled while the box is not ticked. */
    extra?: ReactNode;
    /** `CheckboxOptionParam.extra2` - under the row; disabled while the box is not ticked. */
    extraUnder?: ReactNode;
    selected: boolean;
    onToggle: (selected: boolean) => void;
    disabled?: boolean;
    /** The constructor's `last` flag: no minimum height and no spacing under the option. Default `true`, as a lone checkbox wants it. */
    last?: boolean;
    layout?: BoxLayout;
}

export const WiredCheckboxOption = ({ label, icon, extra, extraUnder, selected, onToggle, disabled = false, last = true, layout }: WiredCheckboxOptionProps) => {
    const style = useWiredStyle();
    const isDisabled = useWiredDisabled(disabled);
    const template = style.templates.checkbox;

    return (
        <WiredOptionRow
            spacing={style.checkboxSpacing}
            yOffset={style.checkboxYOffset}
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
                    <CheckBox
                        variant={template.variant}
                        selected={selected}
                        disabled={isDisabled}
                        onPointerTap={() => onToggle(!selected)}
                        layout={{ width: template.width, height: template.height, padding: 0 }}
                    />
                </Box>
            )}
        />
    );
};
