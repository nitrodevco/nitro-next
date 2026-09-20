/**
 * `actiontypes/§_-92n§.buildInputs` (GIVE_VARIABLE) - the variable section (the picker, limited
 * to variables the box may create, and the "override existing" checkbox, with merged section 0's
 * source type selector in the header) and the value settings section (the initial value, any
 * int), which `onVariableSelected` greys out while no variable with a value is picked.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getMergedSourceOptions, getPickerSelectedVariable, getWiredRoomVariables, giveVariableAction, GiveVariableActionForm, giveVariableFilter, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredCheckboxOption } from '../../kit/WiredCheckboxOption';
import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredVariablePicker } from '../../kit/WiredVariablePicker';

export const GiveVariableView: WiredElementView<GiveVariableActionForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);
    const selected = getPickerSelectedVariable(variables, form.picker);

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
                        onChange={picker => setForm({ picker })}
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
            <WiredSection
                title="${wiredfurni.params.variables.value_settings}"
                disabled={!selected?.hasValue}
            >
                <WiredNamedNumberInput
                    name="${wiredfurni.params.variables.value_settings.initial_value}"
                    value={form.initialValue}
                    onChange={initialValue => setForm({ initialValue })}
                    min={WIRED_INT_MIN}
                    max={WIRED_INT_MAX}
                />
            </WiredSection>
        </>
    );
};
