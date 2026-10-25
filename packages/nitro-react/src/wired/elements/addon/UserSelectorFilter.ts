/**
 * `addons/§_-Fk§` (USER_SELECTOR_FILTER, `wf_xtra_filter_users`) - `SelectorFilter` for the users
 * the stack's selectors pick; see `SelectorFilter` for the params.
 */
import { AddonCodes } from './addonCodes';
import { createSelectorFilterAddon } from './SelectorFilter';

export const userSelectorFilterAddon = createSelectorFilterAddon(AddonCodes.USER_SELECTOR_FILTER);
