/**
 * `actiontypes/chests/§_-qN§` (INITIATE_TRANSACTION) - offers the selected users a contract
 * between the picked chests and contract furni.
 *
 * Int params: `[ mode, multiplier value, multiplier option, multiplier variable target,
 * timeout enabled, timeout seconds ]` - the mode is one of `wiredfurni.params.contract.mode.0`
 * to `.2` (Flash's `§_-GD§` rules: 0 takes no multiplier, 2 retitles it), the multiplier a
 * `ValueOrVariableSection` (1 to 500, or a variable of merged section 0), and the timeout 30 to
 * 3600 seconds under its checkbox. Variable ids: `[ the multiplier variable ]`.
 *
 * Selections: furni selection 0 is the chests, 1 the contracts; merged section 0 pairs furni
 * selection 2 with user selection 1.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { setPickerTarget } from '../../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables } from '../../../WiredTriggerable';
import { ActionTypeCodes } from '../actionCodes';
import { WIRED_VARIABLE_ID_NONE } from '../ActionVariableReference';

/** `§_-GD§.§_-h1F§` - the contract mode without a multiplier. */
export const CONTRACT_MODE_NO_MULTIPLIER = 0;
/** `§_-GD§.§_-Jq§` - the mode whose multiplier is titled `contract.multiplier_selection2`. */
export const CONTRACT_MODE_MULTIPLIER_2 = 2;
/** `ValueOrVariableSection(..., 1, 500)`. */
export const CONTRACT_MULTIPLIER_MAX = 500;
/** `NumberInputParam(300, 30, 3600)`. */
export const CONTRACT_TIMEOUT_MIN = 30;
export const CONTRACT_TIMEOUT_MAX = 3600;

export interface InitiateTransactionActionForm {
    mode: number;
    /** The multiplier `ValueOrVariableSection`; its picker's target is merged section 0's type. */
    multiplier: WiredValueOrVariableState;
    timeoutEnabled: boolean;
    timeout: number;
}

export const initiateTransactionAction: WiredElementDefinition<InitiateTransactionActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.INITIATE_TRANSACTION,
    createForm: (triggerable) => {
        const option = getWiredInt(triggerable, 2);
        // Flash: a multiplier given as a value has no variable (`WiredVariable.§_-i8§`), one given as a variable the value 1.
        const variableId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[0] ?? '');
        const value = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 1) : 1;

        return {
            mode: getWiredInt(triggerable, 0),
            multiplier: createValueOrVariableState(getWiredRoomVariables(triggerable), variableId, getWiredInt(triggerable, 3), option, value),
            timeoutEnabled: getWiredBoolean(triggerable, 4),
            timeout: getWiredInt(triggerable, 5),
        };
    },
    readIntParams: form => [
        form.mode,
        form.multiplier.value,
        form.multiplier.option,
        form.multiplier.picker.target,
        form.timeoutEnabled ? 1 : 0,
        form.timeout,
    ],
    readVariableIds: form => [ form.multiplier.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_MERGED) && (id === 0) && isValueOrVariableSourcePickingDisabled(form.multiplier),
    mergedSelections: [ [ 2, 1 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.chests' : 'wiredfurni.params.sources.furni.title.contracts'),
    getMergedType: form => form.multiplier.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, multiplier: { ...form.multiplier, picker: setPickerTarget(form.multiplier.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
