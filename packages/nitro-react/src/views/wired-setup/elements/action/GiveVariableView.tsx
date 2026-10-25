/**
 * `actiontypes/GiveVariable.buildInputs` (GIVE_VARIABLE) - the variable section (the picker,
 * limited to variables the box may create, and the "override existing" checkbox, with merged
 * section 0's source type selector in the header) and the initial value
 * (`createValueOrVariableSection(1, ..., "variables.value_settings.initial_value", any int, true)`:
 * a value or a variable, with "same holder"), which `onVariableSelected` greys out while no
 * variable with a value is picked.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getMergedSourceOptions, getPickerSelectedVariable, getWiredRoomVariables, giveVariableAction, GiveVariableActionForm, giveVariableFilter, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredCheckboxOption } from '../../kit/WiredCheckboxOption';
import { WiredDisabled } from '../../kit/WiredDisabled';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';
import { WiredVariablePicker } from '../../kit/WiredVariablePicker';

export const GiveVariableView: WiredElementView<GiveVariableActionForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredSection
                title="${wiredfurni.params.variables.variable_selection}"
                sourceTypeSelector={{
                    options: getMergedSourceOptions(giveVariableAction, form, 0, ctx),
                    selected: form.picker.target,
                    onSelect: sourceType => setWiredMergedSourceType(0, sourceType),
                }}
            >
                <WiredSimpleList>
                    <WiredVariablePicker
                        variables={variables}
                        state={form.picker}
                        onChange={picker => setForm({ picker, valueDisabled: !getPickerSelectedVariable(variables, picker)?.hasValue })}
                        filter={giveVariableFilter}
                        roomId={ctx.roomId}
                    />
                    <WiredCheckboxOption
                        label="${wiredfurni.params.variables.value_settings.override_existing}"
                        selected={form.overrideExisting}
                        onToggle={overrideExisting => setForm({ overrideExisting })}
                        last={false}
                    />
                </WiredSimpleList>
            </WiredSection>
            <WiredDisabled disabled={form.valueDisabled}>
                <WiredValueOrVariableSection
                    title="${wiredfurni.params.variables.value_settings.initial_value}"
                    mergedId={1}
                    sourceTypeOptions={getMergedSourceOptions(giveVariableAction, form, 1, ctx)}
                    min={WIRED_INT_MIN}
                    max={WIRED_INT_MAX}
                    state={form.initialValue}
                    onChange={initialValue => setForm({ initialValue })}
                    onSourceTypeSelect={sourceType => setWiredMergedSourceType(1, sourceType)}
                    variables={variables}
                    roomId={ctx.roomId}
                    sameHolderTarget={form.picker.target}
                />
            </WiredDisabled>
        </>
    );
};
