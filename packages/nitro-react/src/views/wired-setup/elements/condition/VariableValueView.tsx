/**
 * `conditions/§_-d1W§.buildInputs` (variable value) - the `variables.variable_selection` section
 * (picker of variables with a value, merged section 0's type selector in its header), the
 * `comparison_selection` section (the six operators in one row) and the
 * `variables.reference_value` section (a typed int or a variable, merged section 1).
 */
import { setWiredMergedSourceType } from '#base/commands';
import { CONDITION_OPERATORS, conditionMergedSourceOptions, getWiredRoomVariables, variableValueCondition, variableValueConditionFilter, VariableValueConditionForm, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

export const VariableValueView: WiredElementView<VariableValueConditionForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredChooseVariableSection
                sourceTypeOptions={conditionMergedSourceOptions(variableValueCondition, form, 0, ctx)}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                filter={variableValueConditionFilter}
                state={form.picker}
                onChange={picker => setForm({ picker })}
                variables={variables}
                roomId={ctx.roomId}
            />
            <WiredSection title="${wiredfurni.params.comparison_selection}">
                <WiredRadioGroup
                    options={[ ...CONDITION_OPERATORS ]}
                    selected={form.operator}
                    onSelect={operator => setForm({ operator })}
                    columns={CONDITION_OPERATORS.length}
                />
            </WiredSection>
            <WiredValueOrVariableSection
                title="${wiredfurni.params.variables.reference_value}"
                sourceTypeOptions={conditionMergedSourceOptions(variableValueCondition, form, 1, ctx)}
                min={WIRED_INT_MIN}
                max={WIRED_INT_MAX}
                state={form.reference}
                onChange={reference => setForm({ reference })}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(1, sourceType)}
                variables={variables}
                roomId={ctx.roomId}
            />
        </>
    );
};
