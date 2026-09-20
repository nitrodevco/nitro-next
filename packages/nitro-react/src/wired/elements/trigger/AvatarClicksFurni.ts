/**
 * `triggerconfs/§_-C2j§` (AVATAR_CLICKS_FURNI) - fires when a user clicks one of the picked furni. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarClicksFurniTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_CLICKS_FURNI,
    createForm: () => ({}),
};
