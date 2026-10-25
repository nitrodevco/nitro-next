/**
 * `variables/PointerVariable` (`wf_var_pointer`, code 9 - `VariableCodes.§_-S2o§`, WIN63-202610201032) -
 * "another variable in disguise": a context variable holds the furni id of a variable box, and the
 * pointer reads and writes that box's variable (`variables.pointer.usage_info`).
 *
 * String param: the variable name. Int params: `[ target ]` - the variable kind the pointer stands
 * for, picked in the frame header (furni, user, global or context; `getHeaderSourceTypeSelectorParam`).
 * Variable ids: `[ context accessor variable ]`, picked among the created context variables that
 * have a value and need no execution context (`accessorVariableFilter`). The created variable's
 * target (`variableType()`) is the header's pick.
 */
import { IWiredVariable, VariableExtraSourceTypes, VariableType, WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, finalizePickerSelection, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** `getHeaderSourceTypeSelectorParam` - `[ FURNI, USER, §_-F2S§ (global), §_-t9§ (context) ]`. */
export const POINTER_VARIABLE_SOURCE_TYPES: readonly number[] = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE ];

/** `PointerVariable.accessorVariableFilter` - a created context variable with a value that needs no execution context. */
export const pointerAccessorVariableFilter = (variable: IWiredVariable): boolean =>
    (Number(variable.variableType) === Number(VariableType.UNKNOWN_0))
    && (Number(variable.variableTarget) === Number(WiredVariableTarget.Context))
    && variable.hasValue
    && !variable.requiresExecutionContext;

export interface PointerVariableForm extends WiredVariableElementForm {
    /** `§_-yh§` - the header's source type, the kind of variable the pointer stands for. */
    sourceType: number;
    /** `_accessorVariable`, always on context variables. */
    picker: WiredVariablePickerState;
}

export const pointerVariable: WiredVariableElementDefinition<PointerVariableForm> = {
    holder: 'variable',
    code: VariableCodes.POINTER_VARIABLE,
    createForm: triggerable => ({
        ...createVariableElementForm(triggerable.stringParam),
        sourceType: getWiredInt(triggerable, 0),
        picker: createVariablePickerState(getWiredRoomVariables(triggerable), triggerable.variableIds[0] ?? '', VariableExtraSourceTypes.CONTEXT_SOURCE),
    }),
    readIntParams: form => [ form.sourceType ],
    readStringParam: readVariableName,
    readVariableIds: (form, ctx) => [ finalizePickerSelection(ctx.roomVariables, form.picker) ],
    initialVariableName: form => form.initialVariableName,
    variableType: form => form.sourceType,
    headerSourceTypeSelector: {
        options: () => [ ...POINTER_VARIABLE_SOURCE_TYPES ],
        get: form => form.sourceType,
        set: (form, sourceType) => ({ ...form, sourceType }),
    },
};
