/**
 * `actiontypes/§_-41Q§` (MOVE_FURNI_TO_FURNI) - moves the furni of the first selection onto the
 * furni of the second. No params and no inputs (`INPUTS_TYPE_NONE`): everything is in the
 * advanced input sources, which are always shown, each titled
 * `wiredfurni.params.sources.furni.title.mv.<id>`; the "pick furni" instructions are hidden.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const moveFurniToFurniAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_FURNI_TO_FURNI,
    createForm: () => ({}),
    furniSelectionTitle: id => `wiredfurni.params.sources.furni.title.mv.${id}`,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
