/**
 * `conditions/§_-X1P§.buildInputs` (has variable) - the `variables.variable_selection` section:
 * the variable picker (variables that are not always available) with the merged source type
 * selector (furni, users, context) in its header; a pick there switches merged section 0.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { conditionMergedSourceOptions, getWiredRoomVariables, hasVariableCondition, hasVariableConditionFilter, HasVariableConditionForm, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';

export const HasVariableView: WiredElementView<HasVariableConditionForm> = ({ form, setForm, triggerable, ctx }) => (
    <WiredChooseVariableSection
        sourceTypeOptions={conditionMergedSourceOptions(hasVariableCondition, form, 0, ctx)}
        onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
        filter={hasVariableConditionFilter}
        state={form.picker}
        onChange={picker => setForm({ picker })}
        variables={getWiredRoomVariables(triggerable)}
        roomId={ctx.roomId}
    />
);
