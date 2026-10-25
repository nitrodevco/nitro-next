/**
 * `addons/variablefx/§_-t1W§` (code `VARIABLE_FX_LEVELLING_PROGRESS`) - the Variable FX addon of
 * category 2, levelling progress (a level badge with the progress to the next level). It has no
 * value range (the state is fixed to 0 to 100) and adds an int param at 21, the renderer that
 * draws the level's bar (`subRendererId`); its dialog starts with a usage info section
 * (`createTopInfoPreset`: `wiredfurni.params.variablefx.levelling_progress.info`, see
 * `VariableFxLevellingProgressView`). Everything else is `§_-416§`'s (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxLevellingProgressAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_LEVELLING_PROGRESS,
    categoryId: 2,
    extraIntParam: 'subRendererId',
});
