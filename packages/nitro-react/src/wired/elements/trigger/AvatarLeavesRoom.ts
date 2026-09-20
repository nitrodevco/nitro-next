/**
 * `triggerconfs/AvatarLeavesRoom` (AVATAR_LEAVES_ROOM) - fires when a user leaves the room. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarLeavesRoomTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_LEAVES_ROOM,
    createForm: () => ({}),
};
