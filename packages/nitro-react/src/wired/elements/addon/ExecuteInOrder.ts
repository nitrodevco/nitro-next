/**
 * `addons/§_-u1d§` (EXECUTE_IN_ORDER, `wf_xtra_exec_in_order`) - the stack runs its effects in
 * order. No inputs, no params.
 */
import { noInputElement } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

export const executeInOrderAddon = noInputElement('addon', AddonCodes.EXECUTE_IN_ORDER);
