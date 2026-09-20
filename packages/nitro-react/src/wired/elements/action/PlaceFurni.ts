/**
 * `actiontypes/PlaceFurni` (`PLACE_FURNI`) - places copies of the snapshotted furni in the room:
 * where they were or at a custom reference (a furni or a user), on top of what is there, at their
 * own altitude or the reference's, shifted by optional offsets, and optionally spawned holding a
 * furni variable with a value.
 *
 * Int params: `[ custom target is user, target location, target altitude, offset x, offset y,
 * offset altitude, spawn with variable, value option, value, value target ]`:
 * - the first is merged section 0's type (the custom reference, furni or users); that section is
 *   only in use while the location is custom (1) or the altitude is the custom reference's (2);
 * - the offsets are 0 when their box is not ticked (x and y -64 to 64, altitude -8000 to 8000);
 * - option and value are 0 unless the spawned variable is in use (ticked, and a variable with a
 *   value picked); the value target is merged section 1's type.
 *
 * Variable ids: `[ spawned variable, value variable ]`, each `WiredVariable.§_-i8§` when not in
 * use. The box has a state snapshot and is 1.2 times as wide as the others.
 */
import { IWiredVariable, VariableType, WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, getPickerSelectedVariable, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VARIABLE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, WIRED_SOURCE_USER, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from './ActionVariableReference';

/** `TARGET_LOCATION_*`. */
export const PLACE_FURNI_TARGET_LOCATION_SOURCE = 0;
export const PLACE_FURNI_TARGET_LOCATION_CUSTOM = 1;
/** `TARGET_ALTITUDE_*`. */
export const PLACE_FURNI_TARGET_ALTITUDE_ON_TOP = 0;
export const PLACE_FURNI_TARGET_ALTITUDE_SOURCE = 1;
export const PLACE_FURNI_TARGET_ALTITUDE_CUSTOM = 2;
/** `OFFSET_MIN` / `§_-lp§` - the x and y offset inputs. */
export const PLACE_FURNI_OFFSET_MIN = -64;
export const PLACE_FURNI_OFFSET_MAX = 64;
/** `NumberInputParam(0, -8000, 8000)` - the altitude offset input. */
export const PLACE_FURNI_ALTITUDE_OFFSET_MIN = -8000;
export const PLACE_FURNI_ALTITUDE_OFFSET_MAX = 8000;
/** `createValueOrVariableSection(1, ..., -2147483648, 2147483647)`. */
export const PLACE_FURNI_SPAWN_VALUE_MIN = -2147483648;
export const PLACE_FURNI_SPAWN_VALUE_MAX = 2147483647;
/** The merged section of the custom reference and of the spawned value's variable. */
export const PLACE_FURNI_MERGED_CUSTOM_TARGET = 0;
export const PLACE_FURNI_MERGED_VALUE = 1;

/** `filterSpawnVariable` - a furni variable that can be created and deleted, made by a variable furni. */
export const placeFurniSpawnVariableFilter = (variable: IWiredVariable): boolean =>
    (Number(variable.variableTarget) === Number(WiredVariableTarget.Furni))
    && variable.canCreateAndDelete
    && (Number(variable.variableType) === Number(VariableType.UNKNOWN_0));

export interface PlaceFurniActionForm {
    /** `§_-J2g§` - the custom reference is a user. */
    customTargetIsUser: boolean;
    targetLocation: number;
    targetAltitude: number;
    /** The x, y and altitude offset checkboxes. */
    offsetEnabled: boolean[];
    /** The x, y and altitude offset inputs. */
    offsets: number[];
    spawnWithVariable: boolean;
    /** The `ChooseVariableSection` picker, furni variables only. */
    spawnVariable: WiredVariablePickerState;
    /** Whether the picked spawn variable has a value - `updateSpawnValueState`'s test, kept by the view's picker callback. */
    spawnVariableHasValue: boolean;
    spawnValue: WiredValueOrVariableState;
}

/** `§_-eI§.disabled`, as `updateSpawnValueState` sets it. */
export const isPlaceFurniSpawnValueDisabled = (form: PlaceFurniActionForm): boolean => !form.spawnWithVariable || !form.spawnVariableHasValue;

/** `requiresCustomReferenceSource`. */
export const placeFurniRequiresCustomReference = (form: PlaceFurniActionForm): boolean =>
    (form.targetLocation === PLACE_FURNI_TARGET_LOCATION_CUSTOM) || (form.targetAltitude === PLACE_FURNI_TARGET_ALTITUDE_CUSTOM);

/** `readIntParamsFromForm`'s test: the spawned value is sent. */
const usesSpawnValue = (form: PlaceFurniActionForm): boolean => form.spawnWithVariable && !isPlaceFurniSpawnValueDisabled(form);

export const placeFurniAction: WiredElementDefinition<PlaceFurniActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.PLACE_FURNI,
    hasStateSnapshot: true,
    forceHidePickFurniInstructions: true,
    widthModifier: 1.2,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const offsets = [ getWiredInt(triggerable, 3), getWiredInt(triggerable, 4), getWiredInt(triggerable, 5) ];
        // Flash passes `WiredVariable.§_-i8§` for a missing id.
        const spawnVariable = createVariablePickerState(variables, triggerable.variableIds[0] ?? WIRED_VARIABLE_ID_NONE, Number(WiredVariableTarget.Furni));

        return {
            customTargetIsUser: getWiredBoolean(triggerable, 0),
            targetLocation: getWiredInt(triggerable, 1),
            targetAltitude: getWiredInt(triggerable, 2),
            offsetEnabled: offsets.map(offset => offset !== 0),
            offsets,
            spawnWithVariable: getWiredBoolean(triggerable, 6),
            spawnVariable,
            spawnVariableHasValue: getPickerSelectedVariable(variables, spawnVariable)?.hasValue ?? false,
            spawnValue: createValueOrVariableState(
                variables,
                triggerable.variableIds[1] ?? WIRED_VARIABLE_ID_NONE,
                resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 9)),
                getWiredInt(triggerable, 7),
                getWiredInt(triggerable, 8),
            ),
        };
    },
    readIntParams: (form) => {
        const usesValue = usesSpawnValue(form);

        return [
            form.customTargetIsUser ? 1 : 0,
            form.targetLocation,
            form.targetAltitude,
            ...form.offsets.map((offset, index) => (form.offsetEnabled[index] ? offset : 0)),
            form.spawnWithVariable ? 1 : 0,
            usesValue ? form.spawnValue.option : 0,
            usesValue ? form.spawnValue.value : 0,
            form.spawnValue.picker.target,
        ];
    },
    readVariableIds: form => [
        form.spawnWithVariable ? form.spawnVariable.variableId : WIRED_VARIABLE_ID_NONE,
        (usesSpawnValue(form) && (form.spawnValue.option === VALUE_OR_VARIABLE_OPTION_VARIABLE)) ? form.spawnValue.picker.variableId : WIRED_VARIABLE_ID_NONE,
    ],
    mergedSelections: [ [ 1, 0 ], [ 2, 1 ] ],
    getMergedType: (form, id) => {
        if (id === PLACE_FURNI_MERGED_CUSTOM_TARGET) return form.customTargetIsUser ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI;

        return form.spawnValue.picker.target;
    },
    setMergedType: (form, id, sourceType) => {
        if (id === PLACE_FURNI_MERGED_CUSTOM_TARGET) return { ...form, customTargetIsUser: sourceType === WIRED_SOURCE_USER };
        if (id === PLACE_FURNI_MERGED_VALUE) return { ...form, spawnValue: { ...form.spawnValue, picker: setPickerTarget(form.spawnValue.picker, sourceType) } };

        return form;
    },
    isInputSourceDisabled: (form, id, sourceType) => {
        if (sourceType !== WIRED_SOURCE_MERGED) return false;
        if (id === PLACE_FURNI_MERGED_CUSTOM_TARGET) return !placeFurniRequiresCustomReference(form);

        return isValueOrVariableSourcePickingDisabled(form.spawnValue) || !form.spawnWithVariable || isPlaceFurniSpawnValueDisabled(form);
    },
    hasCustomTypePicker: id => (id === PLACE_FURNI_MERGED_VALUE),
    getCustomSourcesForMergedType: id => ((id === PLACE_FURNI_MERGED_VALUE) ? VARIABLE_REFERENCE_CUSTOM_SOURCES : []),
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.place_furni',
    mergedSelectionTitle: id => ((id === PLACE_FURNI_MERGED_CUSTOM_TARGET) ? 'wiredfurni.params.sources.merged.title.custom_target' : 'wiredfurni.params.sources.merged.title.variables_reference'),
};
