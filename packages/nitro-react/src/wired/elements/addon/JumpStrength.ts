/**
 * `addons/§_-8M§` (JUMP_STRENGTH) - how strongly the stack's jumps throw, a typed number (-1000
 * to 1000) or the value of a variable (`ValueOrVariableSection`, merged input source 0).
 *
 * Int params: `[ option, value, variable target ]` - option 0 is the typed value, 1 the variable.
 * Variable ids: `[ the variable ]`. Flash opens a box saved with a typed value on no variable and
 * one saved with a variable on the value `JUMP_STRENGTH_VARIABLE_DEFAULT`.
 */
import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { AddonCodes } from './addonCodes';

/** `createValueOrVariableSection(0, mergedSourceOptions(0), "${wiredfurni.params.jump_strength}", -1000, 1000)`'s range. */
export const JUMP_STRENGTH_MIN = -1000;
export const JUMP_STRENGTH_MAX = 1000;
/** The typed value a box saved with a variable opens on. */
export const JUMP_STRENGTH_VARIABLE_DEFAULT = 80;

export interface JumpStrengthAddonForm {
    strength: WiredValueOrVariableState;
}

export const jumpStrengthAddon: WiredElementDefinition<JumpStrengthAddonForm> = {
    holder: 'addon',
    code: AddonCodes.JUMP_STRENGTH,
    createForm: (triggerable, ctx) => {
        const option = getWiredInt(triggerable, 0);
        const variableId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[0] ?? '');
        const value = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 1) : JUMP_STRENGTH_VARIABLE_DEFAULT;
        const target = resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 2));

        return { strength: createValueOrVariableState(getWiredRoomVariables(triggerable), variableId, target, option, value) };
    },
    readIntParams: form => [ form.strength.option, form.strength.value, form.strength.picker.target ],
    readVariableIds: form => [ form.strength.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && isValueOrVariableSourcePickingDisabled(form.strength),
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: form => form.strength.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, strength: { ...form.strength, picker: setPickerTarget(form.strength.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
