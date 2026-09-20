/**
 * `addons/§_-S1S§` (RANDOM, `wf_xtra_random`) - the stack runs a random pick of its effects:
 * how many to pick (`pickamount`, 1 to 100) and how many to skip (`skipactions`, 0 to 100).
 *
 * Int params: `[ skip, pick ]` - the reverse of the order the sliders are shown in.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { clampWiredSliderValue } from './addonShared';

/** Both sliders' maximum: `createSliderSection(..., 0 or 1, 100, 1, false)`. */
export const RANDOM_EFFECT_MAX = 100;

export interface RandomEffectAddonForm {
    skip: number;
    pick: number;
}

export const randomEffectAddon: WiredElementDefinition<RandomEffectAddonForm> = {
    holder: 'addon',
    code: AddonCodes.RANDOM,
    createForm: triggerable => ({
        skip: clampWiredSliderValue(getWiredInt(triggerable, 0), 0, RANDOM_EFFECT_MAX),
        pick: clampWiredSliderValue(getWiredInt(triggerable, 1), 1, RANDOM_EFFECT_MAX),
    }),
    readIntParams: form => [ form.skip, form.pick ],
};
