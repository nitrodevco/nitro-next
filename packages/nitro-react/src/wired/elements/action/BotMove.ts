/**
 * `actiontypes/BotMove` (`wf_act_bot_move`), a bot action (`§_-P1d§`) - walks the bot named in
 * the box to one of the picked furni.
 *
 * String param: the bot's name (at most 32 characters). No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

export interface BotMoveActionForm {
    botName: string;
}

export const botMoveAction: WiredElementDefinition<BotMoveActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_MOVE,
    createForm: triggerable => ({ botName: triggerable.stringParam }),
    readStringParam: form => form.botName,
};
