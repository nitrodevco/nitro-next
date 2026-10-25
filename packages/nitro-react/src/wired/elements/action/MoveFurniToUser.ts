/**
 * `actiontypes/§_-Jx§` (MOVE_FURNI_TO_USER) - moves the selected furni to the selected user. No
 * params and no inputs (`INPUTS_TYPE_NONE`): the advanced input sources are always shown, the
 * furni one titled `...furni.title.mv.0` and the user one `...furni.title.mv_user`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const moveFurniToUserAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_FURNI_TO_USER,
    createForm: () => ({}),
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.mv.0',
    userSelectionTitle: () => 'wiredfurni.params.sources.furni.title.mv_user',
    advancedAlwaysVisible: true,
};
