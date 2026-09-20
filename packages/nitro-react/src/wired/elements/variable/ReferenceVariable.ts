/**
 * `variables/ReferenceVariable` (`wf_var_reference`, code `REFERENCE_VARIABLE`) - makes a variable
 * another room shares (availability `Shared`) usable here under a local name.
 *
 * String param: the variable name. Int params: `[ readOnly ]`. Variable ids: `[ referenced
 * variable ]`, `WiredVariable.§_-i8§` (`"n"`) when none is picked. The rooms and their shared
 * variables come in the box's context (`wiredContext.referenceVariablesList`); without that list
 * the whole box is disabled (`setEditable(false)`). The room dropdown lists the rooms sorted by
 * name, the variable dropdown the picked room's variables in the order the server sent them (its
 * ids are indexes into that list). Picking a variable fills the name while it is empty or still
 * the previously picked variable's name. An empty variable dropdown reads as index 0
 * (`DropdownPreset.selectedId`), so a room picked without a variable saves its first variable -
 * the one whose name `onRoomSelected` already put in the name field.
 */
import { ISharedVariableList, IWiredVariable } from '@nitrodevco/nitro-packets';

import { getWiredInt } from '../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { readWiredDropdownSelectedId } from '../addon/addonShared';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** One entry of `_rooms`. */
export interface ReferenceVariableRoom {
    id: number;
    name: string;
}

/** `initRooms`' tables: the rooms sorted by name, and each room's variables (`§_-35§`). */
export interface ReferenceVariableRooms {
    rooms: ReferenceVariableRoom[];
    variablesByRoom: Map<number, IWiredVariable[]>;
}

export interface ReferenceVariableForm extends WiredVariableElementForm {
    readOnly: boolean;
    /** `§_-ww§` - the picked room, -1 for none. */
    roomId: number;
    /** `_variableDropdown.selectedId` - an index into `roomVariableIds`, -1 for none. */
    variableIndex: number;
    /** `§_-51a§` - the ids of the picked room's variables, in dropdown order. */
    roomVariableIds: string[];
    /** `§_-X10§` - the variable picked last, whose name the name field may still hold. */
    lastVariable: IWiredVariable | null;
    /** `setEditable(referenceVariablesList != null)`. */
    editable: boolean;
}

/** `initRooms` - the shared variables grouped by room. */
export const getReferenceVariableRooms = (list: ISharedVariableList | undefined): ReferenceVariableRooms => {
    const rooms: ReferenceVariableRoom[] = [];
    const variablesByRoom = new Map<number, IWiredVariable[]>();

    if (!list) return { rooms, variablesByRoom };

    for (const shared of list.sharedVariables) {
        if (!rooms.some(room => room.id === shared.roomId)) rooms.push({ id: shared.roomId, name: shared.roomName });

        const variables = variablesByRoom.get(shared.roomId) ?? [];

        variables.push(shared.wiredVariable);
        variablesByRoom.set(shared.roomId, variables);
    }

    rooms.sort((a, b) => a.name.localeCompare(b.name));

    return { rooms, variablesByRoom };
};

/** `§_-w19§` - the variables the variable dropdown lists for `roomId`. */
export const getReferenceRoomVariables = (tables: ReferenceVariableRooms, roomId: number): IWiredVariable[] => tables.variablesByRoom.get(roomId) ?? [];

/** `onVariableSelected` - the variable at `index` of the room's list (Flash takes `null?.id` as 0). */
const selectVariable = (form: ReferenceVariableForm, variables: IWiredVariable[], index: number, variableIndex: number): ReferenceVariableForm => {
    const variable = ((index >= 0) && (index < variables.length)) ? variables[index] : null;
    const name = readVariableName(form);
    const followsVariable = (name.length === 0) || ((form.lastVariable !== null) && (form.lastVariable.variableName === name));

    return {
        ...form,
        variableIndex,
        name: followsVariable ? (variable?.variableName ?? '') : form.name,
        lastVariable: variable,
    };
};

/** `onVariableSelected(option)` - the variable dropdown changed. */
export const selectReferenceVariable = (form: ReferenceVariableForm, tables: ReferenceVariableRooms, variableIndex: number): ReferenceVariableForm =>
    selectVariable(form, getReferenceRoomVariables(tables, form.roomId), variableIndex, variableIndex);

/**
 * `onRoomSelected(option)` - lists the room's variables with nothing picked, then runs
 * `onVariableSelected(null)`, where AS3 turns `null?.id` into index 0: the name follows the room's
 * first variable although the dropdown shows no selection.
 */
export const selectReferenceRoom = (form: ReferenceVariableForm, tables: ReferenceVariableRooms, roomId: number): ReferenceVariableForm => {
    if (form.roomId === roomId) return form;

    const variables = getReferenceRoomVariables(tables, roomId);
    const variableIndex = variables.findIndex(variable => variable.variableId === WIRED_VARIABLE_ID_NONE);

    return selectVariable({ ...form, roomId, roomVariableIds: variables.map(variable => variable.variableId) }, variables, 0, variableIndex);
};

export const referenceVariable: WiredVariableElementDefinition<ReferenceVariableForm> = {
    holder: 'variable',
    code: VariableCodes.REFERENCE_VARIABLE,
    createForm: (triggerable) => {
        const variableId = triggerable.variableIds[0] ?? WIRED_VARIABLE_ID_NONE;
        const list = triggerable.wiredContext.referenceVariablesList;
        const tables = getReferenceVariableRooms(list);
        const room = list?.sharedVariables.filter(shared => shared.wiredVariable.variableId === variableId).pop();
        const roomId = room ? room.roomId : -1;
        const variables = getReferenceRoomVariables(tables, roomId);

        return {
            ...createVariableElementForm(triggerable.stringParam),
            readOnly: getWiredInt(triggerable, 0) !== 0,
            roomId,
            variableIndex: variables.findIndex(variable => variable.variableId === variableId),
            roomVariableIds: variables.map(variable => variable.variableId),
            lastVariable: [ ...tables.variablesByRoom.values() ].flat().find(variable => variable.variableId === variableId) ?? null,
            editable: !!list,
        };
    },
    readIntParams: form => [ form.readOnly ? 1 : 0 ],
    readStringParam: readVariableName,
    readVariableIds: (form) => {
        const index = readWiredDropdownSelectedId(form.variableIndex);

        return [ ((index >= 0) && (index < form.roomVariableIds.length)) ? form.roomVariableIds[index] : WIRED_VARIABLE_ID_NONE ];
    },
    initialVariableName: form => form.initialVariableName,
    /** `§_-D1J§.variableType()`'s default - `ReferenceVariable` does not override it. */
    variableType: () => 0,
};
