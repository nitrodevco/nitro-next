/**
 * `actiontypes/MuteUser` (`wf_act_mute_triggerer`) - mutes the selected users for some minutes,
 * with a message.
 *
 * String param: the message, at most `MUTE_USER_MESSAGE_MAX_LENGTH` characters (`validate`
 * refuses a longer one with `wiredfurni.chatmsgtoolong`). Int params: `[ minutes ]`, 0 to 10.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `TextInputParam("", 100)` and `validate`'s limit. */
export const MUTE_USER_MESSAGE_MAX_LENGTH = 100;
/** `createSliderSection("wiredfurni.params.length.minutes", "minutes", CONVERTER_ECHO, 0, 10, 1)`. */
export const MUTE_USER_MAX_MINUTES = 10;

export interface MuteUserActionForm {
    message: string;
    minutes: number;
}

export const muteUserAction: WiredElementDefinition<MuteUserActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MUTE_USER,
    createForm: triggerable => ({ message: triggerable.stringParam, minutes: getWiredInt(triggerable, 0) }),
    readStringParam: form => form.message,
    readIntParams: form => [ form.minutes ],
    validate: (form, ctx) => ((form.message.length > MUTE_USER_MESSAGE_MAX_LENGTH) ? ctx.localize('wiredfurni.chatmsgtoolong') : null),
};
