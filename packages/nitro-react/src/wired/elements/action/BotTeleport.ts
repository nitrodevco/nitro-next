/**
 * `actiontypes/§_-mo§` (BOT_TELEPORT), a bot action (`§_-P1d§`) - teleports the bot named in the
 * box onto one of the picked furni.
 *
 * String param: the bot's name (at most 32 characters). No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

export interface BotTeleportActionForm {
    botName: string;
}

export const botTeleportAction: WiredElementDefinition<BotTeleportActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_TELEPORT,
    createForm: triggerable => ({ botName: triggerable.stringParam }),
    readStringParam: form => form.botName,
};
