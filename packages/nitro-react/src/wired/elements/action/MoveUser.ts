/**
 * `actiontypes/MoveUser` (`wf_act_move_user`) - moves and turns the selected users.
 *
 * Int params: `[ movement, rotation ]`. Movement -1 is none, 0 to 7 a direction (icon
 * `move_<n>`). Rotation -1 is none, 0 to 7 a direction to face, 9 clockwise and 10
 * counter-clockwise.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The "no movement" / "no rotation" radio id. */
export const MOVE_USER_NONE = -1;
/** The eight directions, each a radio with icon `move_<n>`. */
export const MOVE_USER_DIRECTIONS = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
/** The rotation radio's turn options after the directions: `[ id, icon ]`. */
export const MOVE_USER_TURNS: [ number, string ][] = [ [ 9, 'rotate_cw' ], [ 10, 'rotate_ccw' ] ];

export interface MoveUserActionForm {
    movement: number;
    rotation: number;
}

export const moveUserAction: WiredElementDefinition<MoveUserActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_USER,
    createForm: triggerable => ({ movement: getWiredInt(triggerable, 0), rotation: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.movement, form.rotation ],
};
