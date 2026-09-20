/**
 * `variables/§_-b2m§.buildInputs` - the variable name and the choose variable section (not merged:
 * `createChooseVariableSection(-1, ...)`, so its own source type selector retargets the picker)
 * over furni, user, global and context variables.
 */
import { WiredChooseVariableSection } from '#base/views/wired-setup/kit/WiredChooseVariableSection';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { ECHO_VARIABLE_SOURCE_TYPES, echoVariableFilter, EchoVariableForm, getWiredRoomVariables, selectEchoVariableSource, WiredElementView } from '#base/wired';

export const EchoVariableView: WiredElementView<EchoVariableForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredChooseVariableSection
            sourceTypeOptions={ECHO_VARIABLE_SOURCE_TYPES}
            filter={echoVariableFilter}
            state={form.picker}
            onChange={(picker, variable) => setForm(current => selectEchoVariableSource(current, picker, variable))}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
    </>
);
