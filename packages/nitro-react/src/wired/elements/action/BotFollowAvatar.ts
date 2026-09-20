/**
 * `actiontypes/BotFollowAvatar` (`wf_act_bot_follow_avatar`), a bot action (`§_-P1d§`) - makes the
 * bot named in the box start or stop following the selected user.
 *
 * String param: the bot's name (at most 32 characters). Int params: `[ follow ]` - 1 starts
 * following, 0 stops.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

export interface BotFollowAvatarActionForm {
    botName: string;
    /** 1 starts following, 0 stops. */
    follow: number;
}

export const botFollowAvatarAction: WiredElementDefinition<BotFollowAvatarActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_FOLLOW_AVATAR,
    createForm: triggerable => ({ botName: triggerable.stringParam, follow: getWiredInt(triggerable, 0) }),
    readStringParam: form => form.botName,
    readIntParams: form => [ form.follow ],
};
