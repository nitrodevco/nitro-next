/**
 * `actiontypes/BotTalk` (`wf_act_bot_talk`), a bot action (`§_-P1d§`) - makes the bot named in the
 * box say or shout a message.
 *
 * String param: `<bot name>\t<message>` (the message only when the param splits into exactly two
 * parts). Int params: `[ mode, bubble width ]` - 0 talks, 1 shouts; the width is -1 (the room's
 * default) to 2, as `Chat`'s.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

/** `STRING_PARAM_DELIMITER` of `BotTalk`, `BotTalkDirectToAvatar` and `BotChangeFigure`. */
export const BOT_STRING_PARAM_DELIMITER = '\t';
/** `TextAreaParam(40, -1, 8, -1, 200, ...)` - a bot message's maximum length. */
export const BOT_MESSAGE_MAX_LENGTH = 200;

/** `BotTalk.onEditStart` / `BotTalkDirectToAvatar.onEditStart` - the name and the message in the string param. */
export const splitBotMessageParam = (stringParam: string): { botName: string; message: string } => {
    const parts = stringParam.split(BOT_STRING_PARAM_DELIMITER);

    return {
        botName: (parts.length >= 1) ? parts[0] : '',
        message: (parts.length === 2) ? parts[1] : '',
    };
};

export interface BotTalkActionForm {
    botName: string;
    message: string;
    /** 0 talks, 1 shouts. */
    mode: number;
    bubbleWidth: number;
}

export const botTalkAction: WiredElementDefinition<BotTalkActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_TALK,
    createForm: triggerable => ({
        ...splitBotMessageParam(triggerable.stringParam),
        mode: getWiredInt(triggerable, 0),
        bubbleWidth: getWiredInt(triggerable, 1),
    }),
    readStringParam: form => form.botName + BOT_STRING_PARAM_DELIMITER + form.message,
    readIntParams: form => [ form.mode, form.bubbleWidth ],
};
