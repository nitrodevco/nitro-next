/**
 * `actiontypes/MoveAsGroup` (`wf_act_move_as_group`) - moves the selected furni together, keeping
 * their layout, to a target location given by a furni or a user plus an offset.
 *
 * Int params: `[ target is user, offset x, offset y ]` - the flag is the merged input source's
 * type (the "target location" section switches between furni and users), the offsets -64 to 64.
 * Its input sources are always shown and it never shows the furni picking instructions.
 */
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `OFFSET_MIN` / `§_-lp§`. */
export const MOVE_AS_GROUP_OFFSET_MIN = -64;
export const MOVE_AS_GROUP_OFFSET_MAX = 64;

export interface MoveAsGroupActionForm {
    /** `§_-xw§` - the target location is a user. */
    targetIsUser: boolean;
    offsetX: number;
    offsetY: number;
}

export const moveAsGroupAction: WiredElementDefinition<MoveAsGroupActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_AS_GROUP,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
    createForm: triggerable => ({
        targetIsUser: getWiredBoolean(triggerable, 0),
        offsetX: getWiredInt(triggerable, 1),
        offsetY: getWiredInt(triggerable, 2),
    }),
    readIntParams: form => [ form.targetIsUser ? 1 : 0, form.offsetX, form.offsetY ],
    mergedSelections: [ [ 1, 0 ] ],
    getMergedType: form => (form.targetIsUser ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI),
    setMergedType: (form, _id, sourceType) => ({ ...form, targetIsUser: sourceType === WIRED_SOURCE_USER }),
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.mv.0',
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.target_location',
};
