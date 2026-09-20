/**
 * `actiontypes/BotTalkDirectToAvatar` (`wf_act_bot_talk_to_avatar`), a bot action (`§_-P1d§`) -
 * makes the bot named in the box whisper or talk to the selected users.
 *
 * String param: `<bot name>\t<message>`, as `BotTalk`'s. Int params: `[ mode, bubble width ]` -
 * 1 whispers, 0 talks; the width is -1 (the room's default) to 2.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';
import { BOT_STRING_PARAM_DELIMITER, splitBotMessageParam } from './BotTalk';

export interface BotTalkDirectToAvatarActionForm {
    botName: string;
    message: string;
    /** 1 whispers, 0 talks. */
    mode: number;
    bubbleWidth: number;
}

export const botTalkDirectToAvatarAction: WiredElementDefinition<BotTalkDirectToAvatarActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_TALK_DIRECT_TO_AVTR,
    createForm: triggerable => ({
        ...splitBotMessageParam(triggerable.stringParam),
        mode: getWiredInt(triggerable, 0),
        bubbleWidth: getWiredInt(triggerable, 1),
    }),
    readStringParam: form => form.botName + BOT_STRING_PARAM_DELIMITER + form.message,
    readIntParams: form => [ form.mode, form.bubbleWidth ],
};
