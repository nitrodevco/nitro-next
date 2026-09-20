/**
 * `selectors/§_-U1w§` - the base of `§_-QE§` (FURNI_WITH_VARIABLE) and `§_-Tt§`
 * (USERS_WITH_VARIABLE): selects the furni or users that have the chosen variable, optionally only
 * those whose value compares as chosen to a reference - a typed number or another variable.
 *
 * Variable ids: `[ variable, reference variable ]` - the first of the subclass's target
 * (`variableSource`: furni or users), the second from the value-or-variable section.
 * Int params: `[ comparison, reference, value (as a long: high, low), reference target ]` -
 * `reference` is 0 while "select by value" is unchecked, otherwise the section's option + 1
 * (1 a typed value, 2 a variable); the comparison ids are those of the `WITH_VARIABLE_COMPARISONS`
 * radio. The reference target is merged source 0, whose type picker the section draws itself
 * (`hasCustomTypePicker`); it offers the global and context sources besides furni and users.
 *
 * `onEditStart` drops the reference when the box has none, when the variable is gone or has no
 * value: the value becomes 0 and the reference variable none. For a box without a reference Flash
 * sets the section's radio to -1 (no option); the radio here starts on the typed value, the option
 * a fresh radio group selects.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { resolveSourceTypeSelection } from '../../common/sourceTypeColors';
import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, getPickerSelectedVariable, setPickerTarget, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, WIRED_SOURCE_USER, WiredElementContext, WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';

/** The comparison radio (`createRadioGroup(..., null, 6)`), in its order. */
export const WITH_VARIABLE_COMPARISONS: readonly { id: number; label: string }[] = [
    { id: 2, label: '>' },
    { id: 5, label: '≥' },
    { id: 1, label: '=' },
    { id: 3, label: '≤' },
    { id: 0, label: '<' },
    { id: 4, label: '≠' },
];

/** `createValueOrVariableSection(0, ..., -2147483648, 2147483647)`. */
export const WITH_VARIABLE_VALUE_MIN = -2147483648;
export const WITH_VARIABLE_VALUE_MAX = 2147483647;

/** The merged selection the reference target belongs to. */
const REFERENCE_MERGED_ID = 0;

export interface WithVariableSelectorForm {
    /** `_picker`. */
    picker: WiredVariablePickerState;
    /** `_picker.selected.hasValue` as `onVariableSelected` last saw it - `_section2` is disabled without it. */
    variableHasValue: boolean;
    /** `§_-x1z§` - "select by value". */
    selectByValue: boolean;
    /** `§_-Pq§`. */
    comparison: number;
    /** `_section4`. */
    reference: WiredValueOrVariableState;
}

/** `getCustomSourcesForMergedType`. */
const CUSTOM_SOURCES = [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ];

/** `mergedSourceOptions(0)` for a box whose reference target is `target` - `getMergedSourceOptions` with this element's custom sources. */
export const withVariableReferenceSourceOptions = (target: number, ctx: WiredElementContext): number[] => [
    WIRED_SOURCE_FURNI,
    WIRED_SOURCE_USER,
    ...CUSTOM_SOURCES.filter(source => ctx.configBoolean('wired.variables.context_visible') || (source !== Number(VariableExtraSourceTypes.CONTEXT_SOURCE)) || (target === source)),
];

/** `setValueSelectionVisibility`'s argument: the comparison and the reference are enabled. */
export const isWithVariableValueSelectionEnabled = (form: WithVariableSelectorForm): boolean => form.variableHasValue && form.selectByValue;

/** A `§_-U1w§` subclass: the code and `variableSource` differ. */
export const createWithVariableSelector = (code: number, variableSource: number): WiredElementDefinition<WithVariableSelectorForm> => ({
    holder: 'selector',
    code,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', variableSource);
        const variable = getPickerSelectedVariable(variables, picker);

        let referenceId = triggerable.variableIds[1] ?? '';
        let reference = getWiredInt(triggerable, 1);
        let value = getWiredInt(triggerable, 3);
        let selectByValue = true;

        if ((reference === 0) || !variable || !variable.hasValue) {
            referenceId = WIRED_VARIABLE_ID_NONE;
            value = 0;
            reference = 0;
            selectByValue = false;
        } else if (reference === 1) {
            referenceId = WIRED_VARIABLE_ID_NONE;
        } else {
            value = 0;
        }

        const target = getWiredInt(triggerable, 4);
        const option = (reference > 0) ? (reference - 1) : VALUE_OR_VARIABLE_OPTION_VALUE;

        return {
            picker,
            variableHasValue: !!variable && variable.hasValue,
            selectByValue,
            comparison: getWiredInt(triggerable, 0),
            reference: createValueOrVariableState(variables, referenceId, resolveSourceTypeSelection(withVariableReferenceSourceOptions(target, ctx), target), option, value),
        };
    },
    readIntParams: form => [
        form.comparison,
        form.selectByValue ? (form.reference.option + 1) : 0,
        ...intAsLong(form.reference.value),
        form.reference.picker.target,
    ],
    readVariableIds: form => [ form.picker.variableId, form.reference.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) => {
        if ((sourceType !== WIRED_SOURCE_MERGED) || (id !== REFERENCE_MERGED_ID)) return false;

        return !form.variableHasValue || !form.selectByValue || isValueOrVariableSourcePickingDisabled(form.reference);
    },
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    getMergedType: form => form.reference.picker.target,
    setMergedType: (form, _, sourceType) => ({ ...form, reference: { ...form.reference, picker: setPickerTarget(form.reference.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
});
