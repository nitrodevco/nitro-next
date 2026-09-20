/**
 * `actiontypes/BotChangeFigure` (`wf_act_bot_clothes`), a bot action (`§_-P1d§`) - dresses the bot
 * named in the box in a figure captured from the editing user.
 *
 * String param: `<bot name>\t<figure>`. No int params. The figure is only ever set by the
 * "capture" button (`sessionDataManager.figure`), never typed.
 *
 * Flash keeps `_figureString` on the element and `onEditStart` only overwrites it when the param
 * has a figure part, so a box without one opens (and saves) with the figure of the box edited or
 * captured before it. That field is the element's memory (`rememberOnEdit`,
 * `ctx.elementMemory`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';
import { BOT_STRING_PARAM_DELIMITER } from './BotTalk';

export interface BotChangeFigureActionForm {
    botName: string;
    figure: string;
}

export const botChangeFigureAction: WiredElementDefinition<BotChangeFigureActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_CHANGE_FIGURE,
    createForm: (triggerable, ctx) => {
        const parts = triggerable.stringParam.split(BOT_STRING_PARAM_DELIMITER);
        const remembered = ctx.elementMemory('action', ActionTypeCodes.BOT_CHANGE_FIGURE).figure;

        return {
            botName: parts[0],
            figure: (parts.length > 1) ? parts[1] : ((typeof remembered === 'string') ? remembered : ''),
        };
    },
    readStringParam: form => form.botName + BOT_STRING_PARAM_DELIMITER + form.figure,
    rememberOnEdit: form => ({ figure: form.figure }),
};
