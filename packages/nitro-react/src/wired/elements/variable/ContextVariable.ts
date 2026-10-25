/**
 * `variables/§_-H1e§` (`wf_var_context`, code `CONTEXT_VARIABLE`) - creates a variable that lives
 * only while one wired execution runs (target `WiredVariableTarget.Context`).
 *
 * String param: the variable name. Int params: `[ hasValue ]`.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { getWiredInt } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

export interface ContextVariableForm extends WiredVariableElementForm {
    hasValue: boolean;
}

export const contextVariable: WiredVariableElementDefinition<ContextVariableForm> = {
    holder: 'variable',
    code: VariableCodes.CONTEXT_VARIABLE,
    createForm: triggerable => ({
        ...createVariableElementForm(triggerable.stringParam),
        hasValue: getWiredInt(triggerable, 0) !== 0,
    }),
    readIntParams: form => [ form.hasValue ? 1 : 0 ],
    readStringParam: readVariableName,
    initialVariableName: form => form.initialVariableName,
    variableType: () => WiredVariableTarget.Context,
};
