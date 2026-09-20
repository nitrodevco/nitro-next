/**
 * `actiontypes/§_-d2J§.buildInputs` (CHANGE_VARIABLE) - the variable section (picker limited to
 * writable variables, merged section 0's selector in the header), the operation section (the
 * operator dropdown with its advanced "show more" options) and the reference value
 * (`ValueOrVariableSection` of merged section 1), which `onChangeOperator` disables for an
 * operator without an operand.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { CHANGE_VARIABLE_OPERATORS, changeVariableAction, ChangeVariableActionForm, changeVariableFilter, changeVariableRequiresOperand, getMergedSourceOptions, getWiredRoomVariables, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDisabled } from '../../kit/WiredDisabled';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

export const ChangeVariableView: WiredElementView<ChangeVariableActionForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredChooseVariableSection
                title="${wiredfurni.params.variables.variable_selection}"
                sourceTypeOptions={getMergedSourceOptions(changeVariableAction, form, 0, ctx)}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                filter={changeVariableFilter}
                state={form.picker}
                onChange={picker => setForm({ picker })}
                variables={variables}
                roomId={ctx.roomId}
            />
            <WiredSection title="${wiredfurni.params.variables.operation}">
                <WiredDropdown
                    options={CHANGE_VARIABLE_OPERATORS}
                    selected={form.operator}
                    onSelect={operator => setForm({ operator })}
                    caption="${wiredfurni.params.variables.operation.tooltip}"
                    showMoreLabel="${wiredfurni.params.variables.operation.advanced}"
                />
            </WiredSection>
            <WiredDisabled disabled={!changeVariableRequiresOperand(form)}>
                <WiredValueOrVariableSection
                    title="${wiredfurni.params.variables.reference_value}"
                    sourceTypeOptions={getMergedSourceOptions(changeVariableAction, form, 1, ctx)}
                    min={WIRED_INT_MIN}
                    max={WIRED_INT_MAX}
                    state={form.reference}
                    onChange={reference => setForm({ reference })}
                    onSourceTypeSelect={sourceType => setWiredMergedSourceType(1, sourceType)}
                    variables={variables}
                    roomId={ctx.roomId}
                />
            </WiredDisabled>
        </>
    );
};
