/**
 * `addons/§_-C2d§` (FURNI_VARIABLE_FILTER, `wf_xtra_filter_furni_by_var`) - `§_-L1H§`
 * (`VariableFilter`) sorting by a furni variable; see there for the params.
 */
import { WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { AddonCodes } from './addonCodes';
import { createVariableFilterAddon } from './VariableFilter';

export const furniVariableFilterAddon = createVariableFilterAddon(AddonCodes.FURNI_VARIABLE_FILTER, Number(WiredVariableTarget.Furni));
