/**
 * `triggerconfs/VariableUpdate` (VARIABLE_UPDATE) - fires when the chosen variable is created,
 * changed or deleted.
 *
 * Variable ids: `[ variable ]` - any variable that `canInterceptChanges`, of the furni, user or
 * global target picked in the section header (`§_-c1v§`: the element is the selector's listener
 * and its `sourceType` setter retargets the picker).
 * Int params: `[ created, changed, deleted, change mask, origin mask ]` - the three option flags
 * (0/1), the "changed" option's sub-options as a bit mask (ids 0 to 2), and the change origins as
 * a bit mask (ids 0 to 3), sent as -1 when every origin that is not disabled is checked
 * (`CheckboxGroupPreset.isAllSelected`), and since WIN63-202610121624 the variable selection mode
 * (`variables.trigger_mode`: 0 the picked variable, 1 the variable boxes picked as furni, which
 * greys the variable section out; `forceFurniSelection` is always on). The origins and the mode
 * read as optional: -1 and 0 when a box saved before them stops short.
 *
 * `onChangeVariable` enables the options by what the selected variable allows; the disabled
 * state feeds `isAllSelected`, so the form keeps the selected variable
 * (`variableUpdateOriginDisabled`).
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { isWiredVariablePersisted, VariableType, WiredVariableAvailability, WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { resolveSourceTypeSelection } from '../../common/sourceTypeColors';
import { findVariableById } from '../../common/WiredUtil';
import { createVariablePickerState, finalizePickerSelection, getPickerSelectedVariable, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

/** `SourceTypeSelectorParam([ §_-Y2L§, USER_SOURCE, VariableExtraSourceTypes.GLOBAL_SOURCE ], this)`. */
export const VARIABLE_UPDATE_SOURCE_TYPES = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, WiredVariableTarget.Global ];

/** The option checkboxes' ids: `variables.trigger_options.0/1/2` (`CREATED_INDEX`, `§_-ZM§`, `DELETED_INDEX`). */
export const VARIABLE_UPDATE_OPTION_IDS = [ 0, 1, 2 ];
/** The "changed" option's sub-options, `variables.trigger_options.1.0/1/2`. */
export const VARIABLE_UPDATE_CHANGE_IDS = [ 0, 1, 2 ];
/** `CHANGE_ORIGIN_OPTIONS` - `variables.trigger_origin.0` to `.3`. */
export const VARIABLE_UPDATE_ORIGIN_IDS = [ 0, 1, 2, 3 ];
/** `CHANGE_ORIGIN_INFO_INDEXES` - the origins with an info text under them. */
export const VARIABLE_UPDATE_ORIGIN_INFO_IDS = [ 2, 3 ];

const ALL_ORIGINS = -1;

/** `variableSelectionFilter`. */
export const variableUpdateFilter = (variable: IWiredVariable): boolean => variable.canInterceptChanges && !variable.requiresExecutionContext;

/** `SINGLE_VARIABLE_MODE` / `PICKED_VARIABLE_BOXES_MODE`. */
export const VARIABLE_UPDATE_SINGLE_VARIABLE_MODE = 0;
export const VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE = 1;

export interface VariableUpdateTriggerForm {
    picker: WiredVariablePickerState;
    /** `_picker.selected` as `onChangeVariable` last saw it. */
    variable: IWiredVariable | null;
    /** `_optionGroup` - created, changed, deleted. */
    options: boolean[];
    /** `_subOptionGroup.mask`. */
    changeMask: number;
    /** `_changeOriginGroup.mask`. */
    originMask: number;
    /** `_variableSelectionMode.selected`. */
    mode: number;
}

/** `onChangeVariable` - which of the three options are disabled for the variable. */
export const variableUpdateOptionDisabled = (variable: IWiredVariable | null): boolean[] => {
    const canCreateAndDelete = !variable || variable.canCreateAndDelete;
    const isSubOrUnknown = !!variable && ((Number(variable.variableType) === Number(VariableType.UNKNOWN_2)) || (Number(variable.availabilityType) === Number(WiredVariableAvailability.Unknown21)));
    const isSmartOrInternal = !!variable && ((Number(variable.variableType) === Number(VariableType.UNKNOWN_3)) || (Number(variable.variableType) === Number(VariableType.INTERNAL)));
    const hasValue = !variable || variable.hasValue;

    return [
        !canCreateAndDelete && !isSubOrUnknown && !isSmartOrInternal,
        !hasValue && !isSmartOrInternal,
        !canCreateAndDelete && !isSubOrUnknown && !isSmartOrInternal,
    ];
};

/** `onChangeVariable` - which change origins are disabled for the variable (only 1 and 3 ever are). */
export const variableUpdateOriginDisabled = (variable: IWiredVariable | null): boolean[] => {
    const isGlobal = !!variable && (Number(variable.variableTarget) === Number(WiredVariableTarget.Global));
    const isShared = isGlobal && ((Number(variable.availabilityType) === Number(WiredVariableAvailability.Shared)) || (Number(variable.availabilityType) === Number(WiredVariableAvailability.Reference)));

    return [ false, !isShared, false, !variable || !isWiredVariablePersisted(variable.availabilityType) ];
};

export const variableUpdateTrigger: WiredElementDefinition<VariableUpdateTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.VARIABLE_UPDATE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const variableId = triggerable.variableIds[0] ?? '';
        const found = findVariableById(variables, variableId);
        // The target is not saved: it only picks the variables the picker lists, and a variable of a
        // target the selector does not offer leaves the selector - and so the picker - on its first option.
        const target = resolveSourceTypeSelection(VARIABLE_UPDATE_SOURCE_TYPES, found ? Number(found.variableTarget) : WIRED_SOURCE_USER);
        const picker = createVariablePickerState(variables, variableId, target);
        const originMask = (triggerable.intParams.length > 4) ? getWiredInt(triggerable, 4) : ALL_ORIGINS;

        return {
            picker,
            variable: getPickerSelectedVariable(variables, picker),
            options: VARIABLE_UPDATE_OPTION_IDS.map(id => getWiredBoolean(triggerable, id)),
            changeMask: getWiredInt(triggerable, 3) & 0b111,
            // `mask = -1` checks every box.
            originMask: originMask & 0b1111,
            mode: ((triggerable.intParams.length > 5) && (getWiredInt(triggerable, 5) !== 0)) ? VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE : VARIABLE_UPDATE_SINGLE_VARIABLE_MODE,
        };
    },
    readVariableIds: (form, ctx) => [ finalizePickerSelection(ctx.roomVariables, form.picker) ],
    readIntParams: (form) => {
        const disabled = variableUpdateOriginDisabled(form.variable);
        const allSelected = VARIABLE_UPDATE_ORIGIN_IDS.every(id => ((form.originMask & (1 << id)) !== 0) || disabled[id]);

        return [
            ...form.options.map(selected => (selected ? 1 : 0)),
            form.changeMask,
            allSelected ? ALL_ORIGINS : form.originMask,
            (form.mode === VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE) ? 1 : 0,
        ];
    },
    forceFurniSelection: () => true,
};
