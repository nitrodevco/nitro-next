/**
 * `selectors/§_-U1w§.buildInputs` (`§_-QE§`, `§_-Tt§`) - four sections: the variable (any
 * variable of the box's target), "select by value" (disabled for a variable without a value -
 * `onVariableSelected`), the comparison radio (six in a row) and the reference value or variable,
 * both disabled unless the variable has a value and "select by value" is checked
 * (`setValueSelectionVisibility`). The reference section draws merged source 0's type picker;
 * picking a type there goes through `setMergedSourceType`, as Flash's `ValueOrVariableSection` does.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredRoomVariables, isWithVariableValueSelectionEnabled, WiredElementView, WITH_VARIABLE_COMPARISONS, WITH_VARIABLE_VALUE_MAX, WITH_VARIABLE_VALUE_MIN, withVariableReferenceSourceOptions, WithVariableSelectorForm } from '#base/wired';

import { WiredCheckboxOption } from '../../kit/WiredCheckboxOption';
import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDisabled } from '../../kit/WiredDisabled';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

/** The merged selection the reference belongs to. */
const REFERENCE_MERGED_ID = 0;

export const WithVariableView: WiredElementView<WithVariableSelectorForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);
    const sourceTypeOptions = withVariableReferenceSourceOptions(form.reference.picker.target, ctx);
    const valueSelectionEnabled = isWithVariableValueSelectionEnabled(form);

    return (
        <>
            <WiredChooseVariableSection
                state={form.picker}
                onChange={(picker, variable) => setForm({ picker, variableHasValue: !!variable && variable.hasValue })}
                variables={variables}
                roomId={ctx.roomId}
            />
            <WiredSection
                title="${wiredfurni.params.choose_type}"
                disabled={!form.variableHasValue}
            >
                <WiredCheckboxOption
                    label="${wiredfurni.params.variables.value_settings.select_by_value}"
                    selected={form.selectByValue}
                    onToggle={selectByValue => setForm({ selectByValue })}
                    disabled={!form.variableHasValue}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.comparison_selection}"
                disabled={!valueSelectionEnabled}
            >
                <WiredRadioGroup
                    options={[ ...WITH_VARIABLE_COMPARISONS ]}
                    columns={WITH_VARIABLE_COMPARISONS.length}
                    selected={form.comparison}
                    onSelect={comparison => setForm({ comparison })}
                    disabled={!valueSelectionEnabled}
                />
            </WiredSection>
            <WiredDisabled disabled={!valueSelectionEnabled}>
                <WiredValueOrVariableSection
                    title="${wiredfurni.params.variables.reference_value}"
                    sourceTypeOptions={sourceTypeOptions}
                    min={WITH_VARIABLE_VALUE_MIN}
                    max={WITH_VARIABLE_VALUE_MAX}
                    state={form.reference}
                    onChange={reference => setForm({ reference })}
                    onSourceTypeSelect={sourceType => setWiredMergedSourceType(REFERENCE_MERGED_ID, sourceType)}
                    variables={variables}
                    roomId={ctx.roomId}
                />
            </WiredDisabled>
        </>
    );
};
