/**
 * `actiontypes/MoveUserToFurni` (`wf_act_user_move_to_furni`) - walks or teleports the selected
 * users to the selected furni.
 *
 * Int params: `[ walk mode ]` - 0 to 2 (`wiredfurni.params.user_move.walkmode.<n>`). Its input
 * sources are always shown (`advancedAlwaysVisible`), titled for the target furni and the users
 * to move.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The walk mode radio's ids. */
export const MOVE_USER_TO_FURNI_WALK_MODES = [ 0, 1, 2 ];

export interface MoveUserToFurniActionForm {
    walkMode: number;
}

export const moveUserToFurniAction: WiredElementDefinition<MoveUserToFurniActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_USER_TO_FURNI,
    advancedAlwaysVisible: true,
    createForm: triggerable => ({ walkMode: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.walkMode ],
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.mv.1',
    userSelectionTitle: () => 'wiredfurni.params.sources.furni.title.mv_user2',
};
