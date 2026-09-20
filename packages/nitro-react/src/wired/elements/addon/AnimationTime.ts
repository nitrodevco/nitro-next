/**
 * `addons/AnimationTime` (`wf_xtra_anim_time`) - how long the stack's movement animations take,
 * 50 to 2000 milliseconds in steps of 50.
 *
 * Int params: `[ milliseconds ]`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { clampWiredSliderValue } from './addonShared';

/** `createSliderSection("wiredfurni.params.setanimationtime2", "", CONVERTER_ECHO, 50, 2000, 50)`. */
export const ANIMATION_TIME_MIN = 50;
export const ANIMATION_TIME_MAX = 2000;
export const ANIMATION_TIME_STEP = 50;

export interface AnimationTimeAddonForm {
    time: number;
}

export const animationTimeAddon: WiredElementDefinition<AnimationTimeAddonForm> = {
    holder: 'addon',
    code: AddonCodes.ANIMATION_TIME,
    createForm: triggerable => ({ time: clampWiredSliderValue(getWiredInt(triggerable, 0), ANIMATION_TIME_MIN, ANIMATION_TIME_MAX) }),
    readIntParams: form => [ form.time ],
};
