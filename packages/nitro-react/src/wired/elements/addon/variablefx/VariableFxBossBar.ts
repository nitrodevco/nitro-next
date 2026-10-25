/**
 * `addons/variablefx/§_-zZ§` (code `VARIABLE_FX_BOSS_BAR`) - the Variable FX addon of category 4,
 * boss bar (a wide health bar, optionally with a skull). Everything else is `§_-416§`'s
 * (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxBossBarAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_BOSS_BAR,
    categoryId: 4,
});
