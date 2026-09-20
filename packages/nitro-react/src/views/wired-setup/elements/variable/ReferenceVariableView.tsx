/**
 * `variables/ReferenceVariable.buildInputs` - the variable name, the room dropdown, the variable
 * dropdown (the picked room's shared variables) and the read-only setting. Everything is disabled
 * while the box's context has no reference variables list (`setEditable`).
 */
import { WiredDisabled } from '#base/views/wired-setup/kit/WiredDisabled';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { getReferenceRoomVariables, getReferenceVariableRooms, ReferenceVariableForm, selectReferenceRoom, selectReferenceVariable, WiredElementView } from '#base/wired';

import { VariableSettingsSection } from './shared/VariableSettingsSection';

export const ReferenceVariableView: WiredElementView<ReferenceVariableForm> = ({ form, setForm, triggerable }) => {
    const tables = getReferenceVariableRooms(triggerable.wiredContext.referenceVariablesList);
    const roomOptions = tables.rooms.map(room => ({ id: room.id, label: room.name }));
    const variableOptions = getReferenceRoomVariables(tables, form.roomId).map((variable, index) => ({ id: index, label: variable.variableName }));

    return (
        <WiredDisabled disabled={!form.editable}>
            <WiredVariableNameSection
                value={form.name}
                onChange={name => setForm({ name })}
            />
            <WiredSection title="${wiredfurni.params.variables.room_selection}">
                <WiredDropdown
                    options={roomOptions}
                    selected={form.roomId}
                    onSelect={roomId => setForm(current => selectReferenceRoom(current, tables, roomId))}
                    caption="${wiredfurni.params.variables.room_selection.tooltip}"
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.variables.variable_ref_selection}">
                <WiredDropdown
                    options={variableOptions}
                    selected={form.variableIndex}
                    onSelect={variableIndex => setForm(current => selectReferenceVariable(current, tables, variableIndex))}
                    caption="${wiredfurni.params.variables.variable_selection.tooltip}"
                />
            </WiredSection>
            <VariableSettingsSection
                label="${wiredfurni.params.variables.settings.read_only}"
                selected={form.readOnly}
                onToggle={readOnly => setForm({ readOnly })}
            />
        </WiredDisabled>
    );
};
