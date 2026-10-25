/**
 * `addons/variablefx/§_-F2n§` (code `VARIABLE_FX_PROGRESS_BAR`) - the Variable FX addon of
 * category 1, progress bar (classic, block, striped, arrow or mini bar). Everything else is
 * `§_-416§`'s (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxProgressBarAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_PROGRESS_BAR,
    categoryId: 1,
});
