/**
 * `actiontypes/BotTalkDirectToAvatar` (`wf_act_bot_talk_to_avatar`), a bot action (`§_-P1d§`) -
 * makes the bot named in the box whisper or talk to the selected users.
 *
 * String param: `<bot name>\t<message>`, as `BotTalk`'s. Int params: `[ mode, bubble width ]` -
 * 1 whispers, 0 talks; the width is -1 (the room's default) to 2.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';
import { BotTalkActionForm, createBotTalkForm, readBotTalkIntParams, readBotTalkStringParam } from './BotTalk';

/** `BotTalkDirectToAvatar`'s body is `BotTalk`'s with another radio: the form and params are that action's. */
export const botTalkDirectToAvatarAction: WiredElementDefinition<BotTalkActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_TALK_DIRECT_TO_AVTR,
    createForm: createBotTalkForm,
    readStringParam: readBotTalkStringParam,
    readIntParams: readBotTalkIntParams,
};
