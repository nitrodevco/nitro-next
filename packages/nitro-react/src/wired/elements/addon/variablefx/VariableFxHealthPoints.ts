/**
 * `addons/variablefx/§_-U2p§` (code `VARIABLE_FX_HEALTH_POINTS`) - the Variable FX addon of
 * category 0, health points (a health bar, one heart filling up, stacked hearts or a thermometer).
 * Everything else is `§_-416§`'s (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxHealthPointsAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_HEALTH_POINTS,
    categoryId: 0,
});
