/**
 * `addons/variablefx/§_-N1s§` (code `VARIABLE_FX_NUMBER_DISPLAY`) - the Variable FX addon of
 * category 5, number display (the value as digits). It has no value range, adds an int param at
 * 21 - the icon alignment (`VariableFxIconAlignment`) - and keeps the icon's id in the string
 * param. Everything else is `§_-416§`'s (`VariableFxAddon`).
 */
import { AddonCodes } from '../addonCodes';
import { createVariableFxAddon } from './VariableFxAddon';

export const variableFxNumberDisplayAddon = createVariableFxAddon({
    code: AddonCodes.VARIABLE_FX_NUMBER_DISPLAY,
    categoryId: 5,
    extraIntParam: 'iconAlignment',
    iconStringParam: true,
});
