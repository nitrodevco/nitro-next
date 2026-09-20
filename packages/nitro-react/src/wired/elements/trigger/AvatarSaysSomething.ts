/**
 * `triggerconfs/§_-8z§` (AVATAR_SAYS_SOMETHING) - fires when a user says the given text.
 *
 * String param: the text. Int params: `[ owner only, match type, hide ]` - the match type is
 * `AVATAR_SAYS_MATCH_CONTAINS` / `_EXACT` / `_ALL` (the last matches every message, so the text
 * field is disabled for it), and the two flags are the options checkbox group.
 *
 * The group is built as `[ CheckboxOptionParam(chat.hide, 1), CheckboxOptionParam(chat.onlyowner, 0) ]`
 * and read back with `get(0)` / `get(1)`, which look options up by id: "hide" is shown first but
 * travels last. The reference server reads the first int as "hide" and the last as "owner only";
 * this port keeps Flash's order.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredString } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

/** The match type radio's ids: `chatcontains`, `exactmatch`, `allmatch`. */
export const AVATAR_SAYS_MATCH_CONTAINS = 0;
export const AVATAR_SAYS_MATCH_EXACT = 1;
export const AVATAR_SAYS_MATCH_ALL = 2;

export interface AvatarSaysSomethingTriggerForm {
    text: string;
    matchType: number;
    /** Checkbox id 1, `chat.hide`. */
    hideMessage: boolean;
    /** Checkbox id 0, `chat.onlyowner`. */
    ownerOnly: boolean;
}

export const avatarSaysSomethingTrigger: WiredElementDefinition<AvatarSaysSomethingTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.AVATAR_SAYS_SOMETHING,
    createForm: triggerable => ({
        text: getWiredString(triggerable),
        ownerOnly: getWiredInt(triggerable, 0) !== 0,
        matchType: getWiredInt(triggerable, 1),
        hideMessage: getWiredInt(triggerable, 2) !== 0,
    }),
    readIntParams: form => [ form.ownerOnly ? 1 : 0, form.matchType, form.hideMessage ? 1 : 0 ],
    readStringParam: form => form.text,
};
