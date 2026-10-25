/**
 * `variables/PointerVariable.buildInputs` - the usage note, the variable name and the choose
 * variable section (no source type selector of its own: the pointer's kind is picked in the frame
 * header) over the context variables, titled `variables.pointer.accessor`.
 */
import { WiredChooseVariableSection } from '#base/views/wired-setup/kit/WiredChooseVariableSection';
import { WiredUsageInfoSection } from '#base/views/wired-setup/kit/WiredUsageInfoSection';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { getWiredRoomVariables, pointerAccessorVariableFilter, PointerVariableForm, WiredElementView } from '#base/wired';

export const PointerVariableView: WiredElementView<PointerVariableForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredUsageInfoSection text="${wiredfurni.params.variables.pointer.usage_info}" />
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredChooseVariableSection
            title="${wiredfurni.params.variables.pointer.accessor}"
            filter={pointerAccessorVariableFilter}
            state={form.picker}
            onChange={picker => setForm({ picker })}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
    </>
);
