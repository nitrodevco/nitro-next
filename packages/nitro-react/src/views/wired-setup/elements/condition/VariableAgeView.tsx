/**
 * `conditions/VariableAge.buildInputs` (WIN63-202610121624) - the `variables.variable_selection`
 * section (variables whose creation or update time can be read; merged section 0's type selector
 * in its header), the `variables.compare_value` section (creation / last update, two columns, the
 * one the selected variable cannot read greyed out - `updateAgeOptions`), the
 * `comparison_selection` section (`comparison.0` and `.2`, two columns) and the
 * `variables.time_selection` section: the duration as a value or a variable (the bare
 * `ValueOrVariableSection` input, merged section 1: `createValueOrVariableSection(1, ..., null,
 * ..., false, 0)`) beside the 90px unit dropdown (`variables.duration.0` to `.7`).
 */
import { setWiredMergedSourceType } from '#base/commands';
import { conditionMergedSourceOptions, getPickerSelectedVariable, getWiredRoomVariables, VARIABLE_AGE_TIME_UNITS, variableAgeCondition, variableAgeConditionFilter, VariableAgeConditionForm, variableAgeDisabledCompareValues, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';
import { ComparisonSection } from '../shared/ComparisonSection';

const COMPARISONS = [ 0, 2 ];
const TIME_UNIT_OPTIONS = VARIABLE_AGE_TIME_UNITS.map(id => ({ id, label: `\${wiredfurni.params.variables.duration.${id}}` }));

export const VariableAgeView: WiredElementView<VariableAgeConditionForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);
    const [ creationDisabled, updateDisabled ] = variableAgeDisabledCompareValues(getPickerSelectedVariable(variables, form.picker));

    return (
        <>
            <WiredChooseVariableSection
                sourceTypeOptions={conditionMergedSourceOptions(variableAgeCondition, form, 0, ctx)}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                filter={variableAgeConditionFilter}
                state={form.picker}
                onChange={picker => setForm({ picker })}
                variables={variables}
                roomId={ctx.roomId}
            />
            <WiredSection title="${wiredfurni.params.variables.compare_value}">
                <WiredRadioGroup
                    options={[
                        { id: 0, label: '${wiredfurni.params.variables.compare_value.0}', disabled: creationDisabled },
                        { id: 1, label: '${wiredfurni.params.variables.compare_value.1}', disabled: updateDisabled },
                    ]}
                    selected={form.compareValue}
                    onSelect={compareValue => setForm({ compareValue })}
                    columns={2}
                />
            </WiredSection>
            <ComparisonSection
                ids={COMPARISONS}
                selected={form.comparison}
                onSelect={comparison => setForm({ comparison })}
                columns={2}
            />
            <WiredSection title="${wiredfurni.params.variables.time_selection}">
                <WiredSimpleList
                    vertical={false}
                    centerVertically
                >
                    <WiredValueOrVariableSection
                        title={null}
                        mergedId={1}
                        sourceTypeOptions={conditionMergedSourceOptions(variableAgeCondition, form, 1, ctx)}
                        min={WIRED_INT_MIN}
                        max={WIRED_INT_MAX}
                        state={form.duration}
                        onChange={duration => setForm({ duration })}
                        onSourceTypeSelect={sourceType => setWiredMergedSourceType(1, sourceType)}
                        variables={variables}
                        roomId={ctx.roomId}
                    />
                    <WiredDropdown
                        options={TIME_UNIT_OPTIONS}
                        selected={form.timeUnit}
                        onSelect={timeUnit => setForm({ timeUnit })}
                        caption=""
                        width={90}
                    />
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
