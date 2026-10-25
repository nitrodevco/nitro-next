/**
 * `addons/§_-515§` (FURNI_SELECTOR_FILTER, `wf_xtra_filter_furni`) - `SelectorFilter` for the
 * furni the stack's selectors pick; see `SelectorFilter` for the params.
 */
import { AddonCodes } from './addonCodes';
import { createSelectorFilterAddon } from './SelectorFilter';

export const furniSelectorFilterAddon = createSelectorFilterAddon(AddonCodes.FURNI_SELECTOR_FILTER);
