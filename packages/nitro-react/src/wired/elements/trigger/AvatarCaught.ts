/**
 * `triggerconfs/§_-D2§` (AVATAR_CAUGHT) - fires when a user collides with (is caught by) one of
 * the picked furni. No params and no inputs (`INPUTS_TYPE_NONE`).
 *
 * `TriggerConfs` also pushes `§_-H1T§`, a second, identical class that returns the same code.
 * `getByCode` answers with the first match, so `§_-H1T§` can never be reached; it has no entry here.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarCaughtTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_CAUGHT,
    createForm: () => ({}),
};
