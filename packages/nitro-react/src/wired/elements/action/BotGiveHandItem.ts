/**
 * `actiontypes/BotGiveHandItem` (`wf_act_bot_give_handitem`), a bot action (`§_-P1d§`) - makes a
 * bot hand an item to the selected user.
 *
 * String param: the bot's name, sent only while "use a bot" (`l("bot.usage")`) is ticked - an
 * empty param is a box without a named bot, and opens with the box unticked and the name hidden.
 * Int params: `[ hand item ]`, 0 when none is chosen.
 *
 * The hand item dropdown lists `BOT_GIVE_HAND_ITEM_DEFAULT_CODES` (`${handitem<code>}` each); a
 * code the box holds, or one captured from the editing user's hand, is added to the list
 * (`ensureOptionExists`) and stays in it while the box is edited.
 */
import { WIRED_DROPDOWN_NO_SELECTION } from '../../common/expandableDropdown';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { botActionType } from './BotActionType';

/** `BotGiveHandItem.DEFAULT_CODES`. */
export const BOT_GIVE_HAND_ITEM_DEFAULT_CODES = [ 0, 2, 5, 7, 8, 9, 10, 27, 1126, 1127, 1128 ];

export interface BotGiveHandItemActionForm {
    /** The `bot.usage` checkbox; the name field shows only while it is ticked. */
    useBot: boolean;
    botName: string;
    /** The dropdown's `selectedId`: a hand item code, or `WIRED_DROPDOWN_NO_SELECTION`. */
    handItem: number;
    /** The dropdown's options - the defaults plus every code `ensureOptionExists` added. */
    handItemCodes: number[];
}

/** `ensureOptionExists` - the list with `code` in it; a negative code is not added. */
export const ensureHandItemCode = (codes: number[], code: number): number[] =>
    (((code < 0) || codes.includes(code)) ? codes : [ ...codes, code ]);

/** `setSelectedHandItemByCode` - `code` listed and selected. */
export const selectHandItemCode = (form: BotGiveHandItemActionForm, code: number): BotGiveHandItemActionForm =>
    ({ ...form, handItem: code, handItemCodes: ensureHandItemCode(form.handItemCodes, code) });

export const botGiveHandItemAction: WiredElementDefinition<BotGiveHandItemActionForm> = {
    ...botActionType,
    holder: 'action',
    code: ActionTypeCodes.BOT_GIVE_HAND_ITEM,
    createForm: (triggerable) => {
        const handItem = getWiredInt(triggerable, 0);

        return {
            useBot: triggerable.stringParam !== '',
            botName: triggerable.stringParam,
            handItem,
            handItemCodes: ensureHandItemCode(BOT_GIVE_HAND_ITEM_DEFAULT_CODES, handItem),
        };
    },
    readStringParam: form => (form.useBot ? form.botName : ''),
    readIntParams: form => [ (form.handItem === WIRED_DROPDOWN_NO_SELECTION) ? 0 : form.handItem ],
};
