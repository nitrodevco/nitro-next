/**
 * `triggerconfs/AvatarEntersRoom` (AVATAR_ENTERS_ROOM) - fires when a user enters the room. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarEntersRoomTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_ENTERS_ROOM,
    createForm: () => ({}),
};
