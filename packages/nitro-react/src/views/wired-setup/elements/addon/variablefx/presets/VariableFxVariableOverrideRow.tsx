/**
 * `addons/variablefx/presets/VariableFxVariableOverrideRowPreset` - one row of the advanced range
 * section: the checkbox "override min" / "override max", with under it (disabled while unticked) a
 * row, centred on its height, of a variable picker (variables with a value) and a source type
 * selector offering the box's source type or global (`sourceOptionsForType`). The selector
 * retargets the picker (`set sourceType` -> `variableTarget`); every change is the row's
 * `onRowChange`.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { setPickerTarget, variableFxOverrideFilter, VariableFxOverrideRow, variableFxOverrideSourceTypes } from '#base/wired';

import { WiredCheckboxGroup } from '../../../../kit/WiredCheckboxGroup';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { WiredSourceTypeSelector } from '../../../../kit/WiredSourceTypeSelector';
import { WiredVariablePicker } from '../../../../kit/WiredVariablePicker';

export interface VariableFxVariableOverrideRowProps {
    /** `labelForKind` - a `${key}` caption. */
    label: string;
    row: VariableFxOverrideRow;
    /** The box's source type, which decides the selector's options. */
    sourceType: number;
    variables: readonly IWiredVariable[] | undefined;
    roomId: number;
    onChange: (row: VariableFxOverrideRow) => void;
}

export const VariableFxVariableOverrideRow = ({ label, row, sourceType, variables, roomId, onChange }: VariableFxVariableOverrideRowProps) => (
    <WiredCheckboxGroup
        options={[ {
            label,
            selected: row.enabled,
            extraUnder: (
                <WiredSimpleList
                    vertical={false}
                    centerVertically
                >
                    <WiredVariablePicker
                        variables={variables}
                        state={row.picker}
                        onChange={picker => onChange({ ...row, picker })}
                        filter={variableFxOverrideFilter}
                        roomId={roomId}
                    />
                    <WiredSourceTypeSelector
                        options={variableFxOverrideSourceTypes(sourceType)}
                        selected={row.picker.target}
                        onSelect={target => onChange({ ...row, picker: setPickerTarget(row.picker, target) })}
                    />
                </WiredSimpleList>
            ),
        } ]}
        onToggle={(id, enabled) => onChange({ ...row, enabled })}
    />
);
