/**
 * `addons/§_-Iy§` (ACHIEVEMENT_ENABLER) - turns on achievements for the room's wired, the text
 * naming them (`achievement_enabler`).
 *
 * String param: the text. No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { AddonCodes } from './addonCodes';

/** `TextAreaParam(60, -1, -1, 100, 2000, ...)`: the field's height and length limit. */
export const ACHIEVEMENT_ENABLER_HEIGHT = 60;
export const ACHIEVEMENT_ENABLER_MAX_LENGTH = 2000;

export interface AchievementEnablerAddonForm {
    text: string;
}

export const achievementEnablerAddon: WiredElementDefinition<AchievementEnablerAddonForm> = {
    holder: 'addon',
    code: AddonCodes.ACHIEVEMENT_ENABLER,
    createForm: triggerable => ({ text: triggerable.stringParam }),
    readStringParam: form => form.text,
};
