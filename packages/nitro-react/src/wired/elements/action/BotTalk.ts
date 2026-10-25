/**
 * `actiontypes/BotTalk` (`wf_act_bot_talk`), a bot action (`§_-P1d§`) - makes the bot named in the
 * box say or shout a message.
 *
 * String param: `<bot name>\t<message>` (the message only when the param splits into exactly two
 * parts). Int params: `[ mode, bubble width, hide bot name ]` - 0 talks, 1 shouts; the width is
 * -1 (the room's default) to 2, as `Chat`'s; the third (WIN63-202610121624, `actiontypes/_-J1x`,
 * `wiredfurni.params.bot_talk.hide_bot_name`) is 1 when the bubble shows no bot name.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, WiredTriggerable } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

/** `STRING_PARAM_DELIMITER` of `BotTalk`, `BotTalkDirectToAvatar` and `BotChangeFigure`. */
export const BOT_STRING_PARAM_DELIMITER = '\t';
/** `TextAreaParam(40, -1, 8, -1, 400, ...)` - a bot message's maximum length (200 before WIN63-202610121624). */
export const BOT_MESSAGE_MAX_LENGTH = 400;

/** `BotTalk.previewStyle` / `BotTalkDirectToAvatar.previewStyle`: the bot bubble the editor previews. */
export const BOT_TALK_PREVIEW_STYLE = 31;

/** `BotTalk.onEditStart` / `BotTalkDirectToAvatar.onEditStart` - the name and the message in the string param. */
export const splitBotMessageParam = (stringParam: string): { botName: string; message: string } => {
    const parts = stringParam.split(BOT_STRING_PARAM_DELIMITER);

    return {
        botName: (parts.length >= 1) ? parts[0] : '',
        message: (parts.length === 2) ? parts[1] : '',
    };
};

/** The form of both bot talk actions, `BotTalk` and `BotTalkDirectToAvatar`. */
export interface BotTalkActionForm {
    botName: string;
    message: string;
    /** The message radio: 0 talks, 1 shouts (`BotTalk`) or whispers (`BotTalkDirectToAvatar`). */
    mode: number;
    bubbleWidth: number;
    /** `_hideBotNameOption` - int param 2. */
    hideBotName: boolean;
    /** `setTextReferences(wiredContext.textPlaceholders)`. */
    placeholderNames: string[];
}

/** `onEditStart` of both bot talk actions. */
export const createBotTalkForm = (triggerable: WiredTriggerable): BotTalkActionForm => ({
    ...splitBotMessageParam(triggerable.stringParam),
    mode: getWiredInt(triggerable, 0),
    bubbleWidth: getWiredInt(triggerable, 1),
    hideBotName: getWiredBoolean(triggerable, 2),
    placeholderNames: triggerable.wiredContext.textPlaceholders?.placeholderNames ?? [],
});

/** `readStringParamFromForm` of both bot talk actions. */
export const readBotTalkStringParam = (form: BotTalkActionForm): string => form.botName + BOT_STRING_PARAM_DELIMITER + form.message;

/** `readIntParamsFromForm` of both bot talk actions. */
export const readBotTalkIntParams = (form: BotTalkActionForm): number[] => [ form.mode, form.bubbleWidth, form.hideBotName ? 1 : 0 ];

export const botTalkAction: WiredElementDefinition<BotTalkActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_TALK,
    createForm: createBotTalkForm,
    readStringParam: readBotTalkStringParam,
    readIntParams: readBotTalkIntParams,
};
