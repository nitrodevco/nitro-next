/**
 * `selectors/§_-l1M§` (USERS_WITH_HANDITEM) - selects the users carrying the chosen hand item.
 *
 * Int params: `[ hand item ]` - 0 when nothing is chosen. The dropdown lists
 * `USERS_WITH_HANDITEM_DEFAULT_CODES`, captioned `${handitem<id>}`; a box saved with another item,
 * or an item captured from the user's own hand ("capture"), is added to the list
 * (`ensureOptionExists`). Flash keeps the grown list on the element for the rest of the session:
 * it is the element's memory (`rememberOnEdit`, read back through `ctx.elementMemory`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { rememberedHandItems } from '../condition/ActorHasHandItem';
import { SelectorCodes } from './selectorCodes';

/** `DEFAULT_CODES`. */
export const USERS_WITH_HANDITEM_DEFAULT_CODES = [ 0, 2, 5, 7, 8, 9, 10, 27 ];

export interface UsersWithHanditemSelectorForm {
    /** `_handItemDropdown.selectedId`, -1 none. */
    handItem: number;
    /** The item ids the dropdown lists. */
    handItems: number[];
}

/** `setSelectedHandItemByCode` - `ensureOptionExists`, then select it. */
export const selectUsersWithHanditem = (form: UsersWithHanditemSelectorForm, handItem: number): UsersWithHanditemSelectorForm => ({
    handItem,
    handItems: ((handItem < 0) || form.handItems.includes(handItem)) ? form.handItems : [ ...form.handItems, handItem ],
});

export const usersWithHanditemSelector: WiredElementDefinition<UsersWithHanditemSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_WITH_HANDITEM,
    createForm: (triggerable, ctx) => selectUsersWithHanditem({
        handItem: -1,
        handItems: rememberedHandItems(ctx.elementMemory('selector', SelectorCodes.USERS_WITH_HANDITEM), USERS_WITH_HANDITEM_DEFAULT_CODES),
    }, getWiredInt(triggerable, 0)),
    readIntParams: form => [ (form.handItem === -1) ? 0 : form.handItem ],
    rememberOnEdit: form => ({ handItems: form.handItems }),
};
