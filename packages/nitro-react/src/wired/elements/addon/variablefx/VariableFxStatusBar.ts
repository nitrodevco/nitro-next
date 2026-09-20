/**
 * `addons/variablefx/§_-H2Q§` (code `VARIABLE_FX_STATUS_BAR`) - the Variable FX addon of category
 * 3, status bar (a bar with a status icon: energy, shield, mana, ...). Everything else is
 * `§_-416§`'s (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxStatusBarAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_STATUS_BAR,
    categoryId: 3,
});
