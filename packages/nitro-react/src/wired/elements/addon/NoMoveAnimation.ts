/**
 * `addons/NoMoveAnimation` (`wf_xtra_mov_no_animation`) - the stack's movements jump instead of
 * sliding. No inputs, no params.
 */
import { noInputElement } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

export const noMoveAnimationAddon = noInputElement('addon', AddonCodes.NO_MOVE_ANIMATION);
