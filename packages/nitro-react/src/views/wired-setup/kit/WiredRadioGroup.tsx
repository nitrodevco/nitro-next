/**
 * `wired_setup.uibuilder.presets.RadioGroupPreset` - radio options of which one is selected
 * (`RadioButtonParam` each), stacked, or in `columns` columns of equal width.
 *
 * Controlled: `selected` is the chosen option's id (Flash's `selected` getter returns the radio
 * button's window id) and `onSelect` is the constructor's callback. Flash selects id 0 on
 * construction, so a form's default for a radio param is 0 unless the box says otherwise.
 * `setOptionDisabled(index, true)` is `disabled` on the option.
 */
import { ReactNode } from 'react';

import { WiredOptionGrid } from './WiredOptionGrid';
import { WiredRadioButton } from './WiredRadioButton';

/** `RadioButtonParam`. */
export interface WiredRadioOption {
    id: number;
    /** `text` - a literal or `${key}`. */
    label: string;
    /** `iconAssetName` - a wired asset's short name, shown between the button and the caption. */
    icon?: string;
    /** `extra1` - continues the option's row; disabled while the option is not selected. */
    extra?: ReactNode;
    /** `extra2` - under the row, indented; disabled while the option is not selected. */
    extraUnder?: ReactNode;
    /** `newLine` (several columns): the option takes the rest of its row and the next one starts a new row. */
    newLine?: boolean;
    disabled?: boolean;
}

export interface WiredRadioGroupProps {
    options: WiredRadioOption[];
    selected: number;
    onSelect: (id: number) => void;
    /** The constructor's column count. Default 1. */
    columns?: number;
    /** `WiredUIPreset.disabled` for the whole group. */
    disabled?: boolean;
}

export const WiredRadioGroup = ({ options, selected, onSelect, columns = 1, disabled = false }: WiredRadioGroupProps) => (
    <WiredOptionGrid
        columns={columns}
        cells={options.map((option, index) => ({
            key: option.id,
            newLine: option.newLine,
            render: layout => (
                <WiredRadioButton
                    key={option.id}
                    label={option.label}
                    icon={option.icon}
                    extra={option.extra}
                    extraUnder={option.extraUnder}
                    selected={option.id === selected}
                    disabled={disabled || option.disabled}
                    last={index === (options.length - 1)}
                    onSelect={() => onSelect(option.id)}
                    layout={layout}
                />
            ),
        }))}
    />
);
