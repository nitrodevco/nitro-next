/**
 * `addons/§_-M29§.buildInputs` - the capture's name (`#` prefix), the context variable it writes
 * (no source type selector) and the input mode (a number, or a text the variable's text
 * connector knows).
 */
import { changeVariablePlaceholderVariable, getWiredRoomVariables, VariableCapturerAddonForm, variableCapturerFilter, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredPlaceholderNameSection } from '../../kit/WiredPlaceholderNameSection';
import { WiredVariablePlaceholderModeSection } from '../../kit/WiredVariablePlaceholderModeSection';

export const VariableCapturerView: WiredElementView<VariableCapturerAddonForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredPlaceholderNameSection
            title="${wiredfurni.params.texts.capturer_name}"
            prefix="#"
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredChooseVariableSection
            filter={variableCapturerFilter}
            state={form.picker}
            onChange={(picker, variable) => setForm(current => changeVariablePlaceholderVariable({ ...current, picker }, variable))}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
        <WiredVariablePlaceholderModeSection
            title="${wiredfurni.params.texts.variable_input_type}"
            textMode={form.textMode}
            onChange={textMode => setForm({ textMode })}
            textModeDisabled={form.textModeDisabled}
        />
    </>
);
