/**
 * `triggerconfs/AvatarLeavesRoom` (AVATAR_LEAVES_ROOM) - fires when a user leaves the room. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarLeavesRoomTrigger = noInputElement('trigger', TriggerConfCodes.AVATAR_LEAVES_ROOM);
