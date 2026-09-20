/**
 * `addons/§_-u1d§` (EXECUTE_IN_ORDER, `wf_xtra_exec_in_order`) - the stack runs its effects in
 * order. No inputs, no params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

export const executeInOrderAddon: WiredElementDefinition<Record<string, never>> = {
    holder: 'addon',
    code: AddonCodes.EXECUTE_IN_ORDER,
    createForm: () => ({}),
};
