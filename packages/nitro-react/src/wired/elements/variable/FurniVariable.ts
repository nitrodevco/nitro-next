/**
 * `variables/§_-51K§` (`wf_var_furni`, code `FURNI_VARIABLE`) - creates a variable held by furni.
 *
 * String param: the variable name. Int params: `[ hasValue, availability ]` - `hasValue` 1 gives
 * the variable a number value, and the availability is `WiredVariableAvailability.RoomActive` (1,
 * while the room is loaded) or `Persistent` (10).
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { getWiredInt } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** The availability radio's ids (`RadioButtonParam(1, ...)`, `RadioButtonParam(10, ...)`). */
export const FURNI_VARIABLE_AVAILABILITIES = [ 1, 10 ];

export interface FurniVariableForm extends WiredVariableElementForm {
    hasValue: boolean;
    availability: number;
}

export const furniVariable: WiredVariableElementDefinition<FurniVariableForm> = {
    holder: 'variable',
    code: VariableCodes.FURNI_VARIABLE,
    createForm: triggerable => ({
        ...createVariableElementForm(triggerable.stringParam),
        hasValue: getWiredInt(triggerable, 0) !== 0,
        availability: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.hasValue ? 1 : 0, form.availability ],
    readStringParam: readVariableName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.Furni,
};
