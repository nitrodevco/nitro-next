/**
 * `addons/SelectorFilter` - the base of the two selector filter addons (`§_-515§`,
 * `FurniSelectorFilter`, and `§_-Fk§`, `UserSelectorFilter`), which differ only in their code:
 * the stack's selectors keep at most N of what they select, N a typed number (1 to 1000) or the
 * value of a variable (`ValueOrVariableSection`, merged input source 0).
 *
 * Int params: `[ value, option, variable target ]` - option 0 is the typed value, 1 the variable.
 * Variable ids: `[ the variable ]`. Flash opens a box saved with a typed value on no variable
 * (`WiredVariable.§_-i8§`) and one saved with a variable on the value 1.
 *
 * `SelectorFilter` is never pushed into `AddonTypes` itself; `createSelectorFilterAddon` makes the
 * definition each subclass is.
 */
import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';

/** `createValueOrVariableSection(0, mergedSourceOptions(0), l("setfilter"), 1, 1000)`'s range. */
export const SELECTOR_FILTER_MIN = 1;
export const SELECTOR_FILTER_MAX = 1000;

export interface SelectorFilterAddonForm {
    filter: WiredValueOrVariableState;
}

/** `SelectorFilter` for a subclass's `code`. */
export const createSelectorFilterAddon = (code: number): WiredElementDefinition<SelectorFilterAddonForm> => ({
    holder: 'addon',
    code,
    createForm: (triggerable, ctx) => {
        const option = getWiredInt(triggerable, 1);
        const variableId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[0] ?? '');
        const value = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 0) : 1;
        const target = resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 2));

        return { filter: createValueOrVariableState(getWiredRoomVariables(triggerable), variableId, target, option, value) };
    },
    readIntParams: form => [ form.filter.value, form.filter.option, form.filter.picker.target ],
    readVariableIds: form => [ form.filter.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && isValueOrVariableSourcePickingDisabled(form.filter),
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: form => form.filter.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, filter: { ...form.filter, picker: setPickerTarget(form.filter.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
});
