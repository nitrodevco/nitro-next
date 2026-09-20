/**
 * `variables/§_-g16§` (`wf_var_user`, code `USER_VARIABLE`) - creates a variable held by users.
 *
 * String param: the variable name. Int params: `[ availability, hasValue ]` - the availability is
 * `WiredVariableAvailability.UserActive` (0, while the user is in the room), `Persistent` (10) or
 * `Shared` (11), and `hasValue` 1 gives the variable a number value.
 *
 * Saving a box that was stored (10 or 11) as one that is not asks first
 * (`requireConfirmation`): the stored values are lost.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { getWiredInt } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, isWiredVariableStored, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** The availability radio's ids. */
export const USER_VARIABLE_AVAILABILITIES = [ 0, 10, 11 ];

export interface UserVariableForm extends WiredVariableElementForm {
    /** `§_-O28§` - the availability the box was opened with. */
    initialAvailability: number;
    availability: number;
    hasValue: boolean;
}

export const userVariable: WiredVariableElementDefinition<UserVariableForm> = {
    holder: 'variable',
    code: VariableCodes.USER_VARIABLE,
    createForm: triggerable => ({
        ...createVariableElementForm(triggerable.stringParam),
        initialAvailability: getWiredInt(triggerable, 0),
        availability: getWiredInt(triggerable, 0),
        hasValue: getWiredInt(triggerable, 1) !== 0,
    }),
    readIntParams: form => [ form.availability, form.hasValue ? 1 : 0 ],
    readStringParam: readVariableName,
    requireConfirmation: (form, ctx) => {
        if (!isWiredVariableStored(form.initialAvailability) || isWiredVariableStored(form.availability)) return null;

        return {
            title: ctx.localize('wiredfurni.variables.availability_change.title'),
            body: ctx.localize('wiredfurni.variables.availability_change.body'),
        };
    },
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.User,
};
