/**
 * `actiontypes/KickFromRoom` (`wf_act_kick_user`) - kicks the selected users out of the room,
 * with a message.
 *
 * String param: the message, at most `KICK_FROM_ROOM_MESSAGE_MAX_LENGTH` characters (`validate`
 * refuses a longer one with `wiredfurni.chatmsgtoolong`). No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

/** `TextInputParam("", 100)` and `validate`'s limit. */
export const KICK_FROM_ROOM_MESSAGE_MAX_LENGTH = 100;

export interface KickFromRoomActionForm {
    message: string;
}

export const kickFromRoomAction: WiredElementDefinition<KickFromRoomActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.KICK_FROM_ROOM,
    createForm: triggerable => ({ message: triggerable.stringParam }),
    readStringParam: form => form.message,
    validate: (form, ctx) => ((form.message.length > KICK_FROM_ROOM_MESSAGE_MAX_LENGTH) ? ctx.localize('wiredfurni.chatmsgtoolong') : null),
};
