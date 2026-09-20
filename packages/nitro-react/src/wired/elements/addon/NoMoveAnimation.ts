/**
 * `addons/NoMoveAnimation` (`wf_xtra_mov_no_animation`) - the stack's movements jump instead of
 * sliding. No inputs, no params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

export const noMoveAnimationAddon: WiredElementDefinition<Record<string, never>> = {
    holder: 'addon',
    code: AddonCodes.NO_MOVE_ANIMATION,
    createForm: () => ({}),
};
