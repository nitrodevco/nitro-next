/**
 * `addons/§_-Gb§` (PROJECTILE, `wf_xtra_mov_curve`) - turns the stack's furni movement into a
 * projectile shot by a user: an optional new direction (a directional system, which may also
 * turn the shooter, with a bunny hop), the animation's trajectory (straight or curved by a
 * height, and a distance from the target position, typed or a variable - merged input source 1),
 * an optional custom animation time (per tile, typed or a variable - merged input source 0 -
 * counted along x, y and z, with a speed increase), a rotation offset and the internal
 * variables it creates on the projectile.
 *
 * Int params, in order: `[ new direction, directional system, custom animation time,
 * time option, time value, time target, distance x, distance y, distance z, speed increase,
 * rotation offset, internal variables mask, change shooter direction, bunny hop, distance mode,
 * distance option, distance value, distance target, trajectory height ]` - the height is 0 for a
 * straight trajectory. Variable ids: `[ time variable, distance variable ]`.
 *
 * The furni source is the projectile, the user source the shooter; the shooter only matters
 * while the new direction turns them, and each merged source only while its section uses a
 * variable (`isInputSourceDisabled`).
 */
import type { WiredSubVariableParam } from '../../common/SubVariableParam';
import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, WIRED_SOURCE_USER, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES } from '../action/ActionVariableReference';
import { AddonCodes } from './addonCodes';
import { readWiredDropdownSelectedId, reinitWiredDropdownSelection } from './addonShared';

/** The directional system drop-down's ids, `projectile.directional_system.<id>`. */
export const PROJECTILE_DIRECTIONAL_SYSTEMS = [ 0, 1, 2, 3 ];
/** `NumberInputParam(0, -1000, 1000)` - the curved trajectory's height. */
export const PROJECTILE_TRAJECTORY_MIN = -1000;
export const PROJECTILE_TRAJECTORY_MAX = 1000;
/** `createValueOrVariableSection(1, ..., -64, 64)` - the distance from the target. */
export const PROJECTILE_DISTANCE_MIN = -64;
export const PROJECTILE_DISTANCE_MAX = 64;
/** `createValueOrVariableSection(0, ..., 1, 100000)` - the time per tile. */
export const PROJECTILE_TIME_MIN = 1;
export const PROJECTILE_TIME_MAX = 100000;
/** `NumberInputParam(0, 0, 100000)` - the speed increase. */
export const PROJECTILE_SPEED_INCREASE_MAX = 100000;
/** `createSliderSection("wiredfurni.params.projectile.rotation_offset", "offset", CONVERTER_ECHO, 0, 7, 1, false, COLLAPSED)`. */
export const PROJECTILE_ROTATION_OFFSET_MAX = 7;

/** `createSubVariableCreator("wiredfurni.params.projectile.variable.", ...)`'s variables. */
export const PROJECTILE_SUB_VARIABLES: WiredSubVariableParam[] = [
    { id: 0, name: 'animation.tiles_travelled', hasExtraText: true },
    { id: 1, name: 'animation.user_collisions', hasExtraText: true },
    { id: 2, name: 'animation.furni_collisions', hasExtraText: true },
    { id: 3, name: 'animation.position.x' },
    { id: 4, name: 'animation.position.y' },
    { id: 5, name: 'animation.position.altitude' },
    { id: 6, name: 'animation.is_travelling', hasExtraText: true },
];

/** `onDirectionalIdSet` - the bitmap under the drop-down, `wired_misc_directional_system_<id>`. */
export const projectileDirectionalSystemAsset = (id: number): string => `wired_misc_directional_system_${id}`;

export interface ProjectileAddonForm {
    /** `§_-L1X§` - the new direction checkbox. */
    newDirection: boolean;
    /** The directional system drop-down's selection. */
    directionalSystem: number;
    changeShooterDirection: boolean;
    bunnyHop: boolean;
    /** `§_-fr§` - 0 straight, 1 curved. */
    trajectory: number;
    /** `§_-b23§` - the curved trajectory's height. */
    trajectoryHeight: number;
    /** `§_-E2o§` - the distance radio, 0 to 2; 0 has no distance. */
    distanceMode: number;
    /** `§_-uU§`. */
    distance: WiredValueOrVariableState;
    customAnimationTime: boolean;
    animationTime: WiredValueOrVariableState;
    /** `§_-71z§` - distance x, y, z. */
    distanceAxes: boolean[];
    speedIncrease: number;
    rotationOffset: number;
    internalVariables: number;
}

export const projectileAddon: WiredElementDefinition<ProjectileAddonForm> = {
    holder: 'addon',
    code: AddonCodes.PROJECTILE,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const trajectoryHeight = getWiredInt(triggerable, 18);

        return {
            newDirection: getWiredBoolean(triggerable, 0),
            directionalSystem: reinitWiredDropdownSelection(PROJECTILE_DIRECTIONAL_SYSTEMS, getWiredInt(triggerable, 1)),
            customAnimationTime: getWiredBoolean(triggerable, 2),
            animationTime: createValueOrVariableState(variables, triggerable.variableIds[0] ?? '', resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 5)), getWiredInt(triggerable, 3), getWiredInt(triggerable, 4)),
            distanceAxes: [ getWiredBoolean(triggerable, 6), getWiredBoolean(triggerable, 7), getWiredBoolean(triggerable, 8) ],
            speedIncrease: getWiredInt(triggerable, 9),
            rotationOffset: Math.min(PROJECTILE_ROTATION_OFFSET_MAX, Math.max(0, getWiredInt(triggerable, 10))),
            internalVariables: getWiredInt(triggerable, 11),
            changeShooterDirection: getWiredBoolean(triggerable, 12),
            bunnyHop: getWiredBoolean(triggerable, 13),
            distanceMode: getWiredInt(triggerable, 14),
            distance: createValueOrVariableState(variables, triggerable.variableIds[1] ?? '', resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 17)), getWiredInt(triggerable, 15), getWiredInt(triggerable, 16)),
            trajectory: (trajectoryHeight === 0) ? 0 : 1,
            trajectoryHeight,
        };
    },
    readIntParams: form => [
        form.newDirection ? 1 : 0,
        readWiredDropdownSelectedId(form.directionalSystem),
        form.customAnimationTime ? 1 : 0,
        form.animationTime.option,
        form.animationTime.value,
        form.animationTime.picker.target,
        ...form.distanceAxes.map(selected => (selected ? 1 : 0)),
        form.speedIncrease,
        form.rotationOffset,
        form.internalVariables,
        form.changeShooterDirection ? 1 : 0,
        form.bunnyHop ? 1 : 0,
        form.distanceMode,
        form.distance.option,
        form.distance.value,
        form.distance.picker.target,
        (form.trajectory === 1) ? form.trajectoryHeight : 0,
    ],
    readVariableIds: form => [ form.animationTime.picker.variableId, form.distance.picker.variableId ],
    widthModifier: 1.3,
    allowScrolling: false,
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.projectile',
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.shooter',
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variable_time_per_tile' : 'wiredfurni.params.sources.merged.title.variable_animation_distance'),
    isInputSourceDisabled: (form, id, sourceType) => {
        if (sourceType === WIRED_SOURCE_MERGED) {
            if (id === 0) return !form.customAnimationTime || isValueOrVariableSourcePickingDisabled(form.animationTime);

            return (form.distanceMode === 0) || isValueOrVariableSourcePickingDisabled(form.distance);
        }

        if (sourceType === WIRED_SOURCE_USER) return !form.changeShooterDirection || !form.newDirection;

        return false;
    },
    mergedSelections: [ [ 1, 0 ], [ 2, 2 ] ],
    getMergedType: (form, id) => ((id === 0) ? form.animationTime.picker.target : form.distance.picker.target),
    setMergedType: (form, id, sourceType) => ((id === 0)
        ? { ...form, animationTime: { ...form.animationTime, picker: setPickerTarget(form.animationTime.picker, sourceType) } }
        : { ...form, distance: { ...form.distance, picker: setPickerTarget(form.distance.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
    forceHidePickFurniInstructions: true,
};
