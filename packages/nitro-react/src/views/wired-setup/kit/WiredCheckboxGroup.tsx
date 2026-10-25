/**
 * `wired_setup.uibuilder.presets.CheckboxGroupPreset` - checkbox options (`CheckboxOptionParam`
 * each), stacked, or in `columns` columns of equal width.
 *
 * Controlled: each option carries its own `selected`, and `onToggle` is the constructor's
 * callback - it receives the option's id, which is its index unless the option names one, as in
 * Flash (`if (param.id == -1) param.id = index`). A group stored as a bit mask
 * (`CheckboxGroupPreset.mask`) reads and writes its form field with `isCheckboxMaskBitSet` and
 * `setCheckboxMaskBit` from `#base/wired`.
 */
import { ReactNode } from 'react';

import { WiredCheckboxOption } from './WiredCheckboxOption';
import { WiredOptionGrid } from './WiredOptionGrid';

/** `CheckboxOptionParam`. */
export interface WiredCheckboxGroupOption {
    /** `id`. Default: the option's index. */
    id?: number;
    /** `text` - a literal or `${key}`. */
    label: string;
    selected: boolean;
    /** `iconAssetName` - a wired asset's short name, shown between the box and the caption. */
    icon?: string;
    /** `extra1` - continues the option's row; disabled while the box is not ticked. */
    extra?: ReactNode;
    /** `extra2` - under the row, indented; disabled while the box is not ticked. */
    extraUnder?: ReactNode;
    disabled?: boolean;
}

export interface WiredCheckboxGroupProps {
    options: WiredCheckboxGroupOption[];
    /** Called with the option's id (its index unless it names one) and its new state. */
    onToggle: (id: number, selected: boolean) => void;
    /** The constructor's column count. Default 1. */
    columns?: number;
    /** `WiredUIPreset.disabled` for the whole group. */
    disabled?: boolean;
}

export const WiredCheckboxGroup = ({ options, onToggle, columns = 1, disabled = false }: WiredCheckboxGroupProps) => (
    <WiredOptionGrid
        columns={columns}
        cells={options.map((option, index) => {
            const id = option.id ?? index;

            return {
                key: id,
                render: layout => (
                    <WiredCheckboxOption
                        key={id}
                        label={option.label}
                        icon={option.icon}
                        extra={option.extra}
                        extraUnder={option.extraUnder}
                        selected={option.selected}
                        disabled={disabled || option.disabled}
                        last={index === (options.length - 1)}
                        onToggle={selected => onToggle(id, selected)}
                        layout={layout}
                    />
                ),
            };
        })}
    />
);
