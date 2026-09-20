/**
 * `actiontypes/§_-e1q§` (MOVE_TO_DIRECTION) - the picked furni keep moving in a direction and
 * turn when they hit something.
 *
 * Int params: `[ start direction, turn rule, block on user collision ]` - the direction is one of
 * the eight `move_<n>` arrows (0 to 7), the turn rule one of `wiredfurni.params.turn.0` to `.6`,
 * and the last one 1 when a user in the way stops the furni.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The direction radio's eight arrows, `move_0` to `move_7`. */
export const MOVE_TO_DIRECTION_DIRECTIONS = 8;
/** The turn radio's last id, `wiredfurni.params.turn.6`. */
export const MOVE_TO_DIRECTION_LAST_TURN = 6;

export interface MoveToDirectionActionForm {
    startDirection: number;
    turn: number;
    blockOnCollide: boolean;
}

export const moveToDirectionAction: WiredElementDefinition<MoveToDirectionActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_TO_DIRECTION,
    createForm: triggerable => ({
        startDirection: getWiredInt(triggerable, 0),
        turn: getWiredInt(triggerable, 1),
        blockOnCollide: getWiredInt(triggerable, 2) !== 0,
    }),
    readIntParams: form => [ form.startDirection, form.turn, form.blockOnCollide ? 1 : 0 ],
};
