/**
 * `addons/§_-e1n§` (USER_VARIABLE_FILTER, `wf_xtra_filter_users_by_var`) - `§_-L1H§`
 * (`VariableFilter`) sorting by a user variable; see there for the params.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { AddonCodes } from './addonCodes';
import { createVariableFilterAddon } from './VariableFilter';

export const userVariableFilterAddon = createVariableFilterAddon(AddonCodes.USER_VARIABLE_FILTER, Number(WiredVariableTarget.User));
