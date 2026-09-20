/**
 * `actiontypes/MoveFurni` (`wf_act_move_rotate`) - moves and turns the selected furni.
 *
 * Int params: `[ movement, rotation ]`. Movement ids are the server's, not the icons' order:
 * 0 none, 1 random, 2 diagonal random, 3 vertical/horizontal random, 4 to 11 the eight directions
 * (`MOVE_FURNI_MOVEMENTS` pairs each id with its icon). Rotation: 0 none, 1 clockwise,
 * 2 counter-clockwise, 3 random.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The movement radio's icon options after "no movement", in `buildInputs`' order: `[ id, icon ]`. */
export const MOVE_FURNI_MOVEMENTS: [ number, string ][] = [
    [ 4, 'move_0' ], [ 8, 'move_1' ], [ 5, 'move_2' ], [ 9, 'move_3' ],
    [ 6, 'move_4' ], [ 10, 'move_5' ], [ 7, 'move_6' ], [ 11, 'move_7' ],
    [ 2, 'move_diag' ], [ 3, 'move_vrt' ], [ 1, 'move_rnd' ],
];

export interface MoveFurniActionForm {
    movement: number;
    rotation: number;
}

export const moveFurniAction: WiredElementDefinition<MoveFurniActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_FURNI,
    createForm: triggerable => ({ movement: getWiredInt(triggerable, 0), rotation: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.movement, form.rotation ],
};
