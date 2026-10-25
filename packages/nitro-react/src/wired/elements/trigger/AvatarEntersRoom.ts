/**
 * `triggerconfs/AvatarEntersRoom` (AVATAR_ENTERS_ROOM) - fires when a user enters the room. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const avatarEntersRoomTrigger = noInputElement('trigger', TriggerConfCodes.AVATAR_ENTERS_ROOM);
