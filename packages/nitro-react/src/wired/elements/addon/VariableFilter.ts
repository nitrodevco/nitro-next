/**
 * `addons/§_-L1H§` - the base of the two variable filter addons (`§_-C2d§`,
 * `FurniVariableFilter`, and `§_-e1n§`, `UserVariableFilter`), which differ in their code and in
 * the target of the variable they sort by: the stack's selectors keep at most N of what they
 * select, sorted by a furni or user variable - by its value, its creation time or its last update
 * time, each ascending or descending - N a typed number (1 to 1000) or the value of a variable
 * (`ValueOrVariableSection`, merged input source 0).
 *
 * Int params: `[ value, sort, option, reference target ]` - option 0 is the typed value, 1 the
 * reference variable. Variable ids: `[ the sorting variable, the reference variable ]`.
 *
 * The sort drop-down offers only what the chosen variable can be sorted by (all six without a
 * variable) and is rebuilt whenever the variable changes, keeping its selection where it can
 * (`initSortingDropdown`); see `addonShared` for what an empty selection sends.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, getPickerSelectedVariable, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { readWiredDropdownSelectedId, reinitWiredDropdownSelection } from './addonShared';

/** `createValueOrVariableSection(0, mergedSourceOptions(0), l("setfilter"), 1, 1000)`'s range. */
export const VARIABLE_FILTER_MIN = 1;
export const VARIABLE_FILTER_MAX = 1000;

/** `§_-L1H§.variableSelectionFilter` - a variable that can be sorted by something. */
export const variableFilterVariableFilter = (variable: IWiredVariable): boolean =>
    variable.hasValue || variable.canReadCreationTime || variable.canReadLastUpdateTime;

/** `initSortingDropdown` - the sort ids (`variables.sort_by.<id>`) a variable offers: value 0/1, creation time 2/3, last update 4/5. */
export const variableFilterSortOptions = (variable: IWiredVariable | null): number[] => {
    const ids: number[] = [];

    if (!variable || variable.hasValue) ids.push(0, 1);
    if (!variable || variable.canReadCreationTime) ids.push(2, 3);
    if (!variable || variable.canReadLastUpdateTime) ids.push(4, 5);

    return ids;
};

export interface VariableFilterAddonForm {
    /** `§_-H1E§` - the sorting variable; its target is the subclass's `variableType`. */
    picker: WiredVariablePickerState;
    /** The sort drop-down's selection (`WIRED_DROPDOWN_NO_SELECTION` for none). */
    sort: number;
    /** The sort drop-down's options, `variableFilterSortOptions` of the chosen variable. */
    sortOptions: number[];
    reference: WiredValueOrVariableState;
}

/** The picker's selection callback (`initSortingDropdown(variable)`): the drop-down is rebuilt for the new variable. */
export const selectVariableFilterVariable = (form: VariableFilterAddonForm, picker: WiredVariablePickerState, variable: IWiredVariable | null): VariableFilterAddonForm => {
    const sortOptions = variableFilterSortOptions(variable);

    return { ...form, picker, sortOptions, sort: reinitWiredDropdownSelection(sortOptions, readWiredDropdownSelectedId(form.sort)) };
};

/** `§_-L1H§` for a subclass's `code` and `variableType` (`§_-32X§.FURNI` 0 / `USER` 1). */
export const createVariableFilterAddon = (code: number, variableType: number): WiredElementDefinition<VariableFilterAddonForm> => ({
    holder: 'addon',
    code,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', variableType);
        const option = getWiredInt(triggerable, 2);
        const referenceId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[1] ?? '');
        const value = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 0) : 1;
        const target = resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 3));
        const sortOptions = variableFilterSortOptions(getPickerSelectedVariable(variables, picker));

        return {
            picker,
            sort: reinitWiredDropdownSelection(sortOptions, getWiredInt(triggerable, 1)),
            sortOptions,
            reference: createValueOrVariableState(variables, referenceId, target, option, value),
        };
    },
    readIntParams: form => [ form.reference.value, readWiredDropdownSelectedId(form.sort), form.reference.option, form.reference.picker.target ],
    readVariableIds: form => [ form.picker.variableId, form.reference.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && isValueOrVariableSourcePickingDisabled(form.reference),
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: form => form.reference.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, reference: { ...form.reference, picker: setPickerTarget(form.reference.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
});
