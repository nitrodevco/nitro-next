/**
 * `variables/§_-EH§` (`wf_var_room`, code `GLOBAL_VARIABLE`) - creates a variable of the room
 * itself (target `WiredVariableTarget.Global`).
 *
 * String param: the variable name. Int params: `[ availability ]` - `RoomActive` (1),
 * `Persistent` (10) or `Shared` (11). The dialog also shows the variable's current value, which
 * the server sends in the box's context (`wiredContext.globalVariableInfo.value`); Flash registers
 * it as the `value` parameter of `wiredfurni.params.variables.inspection.current_value`.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { getWiredInt } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** The availability radio's ids. */
export const GLOBAL_VARIABLE_AVAILABILITIES = [ 1, 10, 11 ];

export interface GlobalVariableForm extends WiredVariableElementForm {
    availability: number;
    /** `wiredContext.globalVariableInfo.value`, as the inspection text shows it. */
    currentValue: string;
}

export const globalVariable: WiredVariableElementDefinition<GlobalVariableForm> = {
    holder: 'variable',
    code: VariableCodes.GLOBAL_VARIABLE,
    createForm: triggerable => ({
        ...createVariableElementForm(triggerable.stringParam),
        availability: getWiredInt(triggerable, 0),
        currentValue: '' + (triggerable.wiredContext.globalVariableInfo?.value ?? 0),
    }),
    readIntParams: form => [ form.availability ],
    readStringParam: readVariableName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.Global,
};
