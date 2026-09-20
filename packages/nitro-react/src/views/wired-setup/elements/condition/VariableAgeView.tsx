/**
 * `conditions/§_-mb§.buildInputs` (variable age) - the `variables.variable_selection` section
 * (variables whose creation or update time can be read; merged section 0's type selector in its
 * header), the `variables.compare_value` section (creation / last update, the one the selected
 * variable cannot read greyed out - `updateAgeOptions`), the `comparison_selection` section
 * (`comparison.0` and `.2`) and the `variables.time_selection` section: the named
 * `variables.duration` input, 5px, and the unit dropdown (`variables.duration.0` to `.7`).
 */
import { setWiredMergedSourceType } from '#base/commands';
import { conditionMergedSourceOptions, getPickerSelectedVariable, getWiredRoomVariables, VARIABLE_AGE_TIME_UNITS, variableAgeCondition, variableAgeConditionFilter, VariableAgeConditionForm, variableAgeDisabledCompareValues, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSpacing } from '../../kit/WiredSpacing';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';

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
                />
            </WiredSection>
            <ConditionComparisonSection
                ids={COMPARISONS}
                selected={form.comparison}
                onSelect={comparison => setForm({ comparison })}
            />
            <WiredSection title="${wiredfurni.params.variables.time_selection}">
                <WiredSimpleList
                    vertical={false}
                    centerVertically
                >
                    <WiredNamedNumberInput
                        name="${wiredfurni.params.variables.duration}"
                        value={form.duration}
                        onChange={duration => setForm({ duration })}
                        min={WIRED_INT_MIN}
                        max={WIRED_INT_MAX}
                    />
                    <WiredSpacing
                        vertical={false}
                        size={5}
                    />
                    <WiredDropdown
                        options={TIME_UNIT_OPTIONS}
                        selected={form.timeUnit}
                        onSelect={timeUnit => setForm({ timeUnit })}
                        caption=""
                    />
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
