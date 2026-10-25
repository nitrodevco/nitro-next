/**
 * `addons/§_-U2N§` (UNSEEN, `wf_xtra_unseen`) - the stack runs the effect it has not run for the
 * longest time. No inputs, no params.
 */
import { noInputElement } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

export const unseenEffectAddon = noInputElement('addon', AddonCodes.UNSEEN);
