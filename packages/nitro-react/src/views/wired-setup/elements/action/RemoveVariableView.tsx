/**
 * `actiontypes/§_-A2y§.buildInputs` (REMOVE_VARIABLE) - one section: the variable picker (limited
 * to variables the box may delete) with merged section 0's source type selector in the header.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getMergedSourceOptions, getWiredRoomVariables, giveVariableFilter, removeVariableAction, RemoveVariableActionForm, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';

export const RemoveVariableView: WiredElementView<RemoveVariableActionForm> = ({ form, setForm, triggerable, ctx }) => (
    <WiredChooseVariableSection
        title="${wiredfurni.params.variables.variable_selection}"
        sourceTypeOptions={getMergedSourceOptions(removeVariableAction, form, 0, ctx)}
        onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
        filter={giveVariableFilter}
        state={form.picker}
        onChange={picker => setForm({ picker })}
        variables={getWiredRoomVariables(triggerable)}
        roomId={ctx.roomId}
    />
);
