/**
 * `triggerconfs/§_-a2j§` (AVATAR_WALKS_ON_FURNI) - fires when a user walks onto one of the picked furni. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const walksOnFurniTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_WALKS_ON_FURNI,
    createForm: () => ({}),
};
