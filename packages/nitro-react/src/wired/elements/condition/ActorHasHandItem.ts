/**
 * `conditions/ActorHasHandItem` (`wf_cnd_has_handitem`) - the user carries a hand item; inverted
 * (`NOT_HAS_HANDITEM`, `wf_cnd_not_has_handitem`), does not.
 *
 * Int params: `[ hand item ]`. The dropdown offers `DEFAULT_CODES`, each captioned
 * `${handitem<code>}`; a box holding another code (or a code taken from the user's own hand with
 * the "capture" button) gets that code appended to the list (`ensureOptionExists`). Nothing
 * selected saves 0.
 *
 * Flash keeps the grown list on the element (`§_-ss§`) for the rest of the session, so a code
 * added while editing one box is offered when the next one opens: the list is the element's
 * memory (`rememberOnEdit`, read back through `ctx.elementMemory`).
 */
import { WIRED_DROPDOWN_NO_SELECTION } from '../../common/expandableDropdown';
import type { WiredElementDefinition, WiredElementMemory } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

/** `ActorHasHandItem.DEFAULT_CODES`. */
export const ACTOR_HAS_HAND_ITEM_DEFAULT_CODES = [ 0, 2, 5, 7, 8, 9, 10, 27 ];

export interface ActorHasHandItemConditionForm {
    /** `§_-ss§` - the dropdown's codes. */
    handItems: number[];
    /** The dropdown's `selectedId`. */
    handItem: number;
}

/**
 * `setSelectedHandItemByCode` - `ensureOptionExists` (a negative code is never listed) and then
 * `selectedId = code`, which selects nothing for a code the list does not have.
 */
export const selectActorHasHandItem = (form: ActorHasHandItemConditionForm, code: number): ActorHasHandItemConditionForm => {
    const handItems = ((code < 0) || form.handItems.includes(code)) ? form.handItems : [ ...form.handItems, code ];

    return { handItems, handItem: handItems.includes(code) ? code : WIRED_DROPDOWN_NO_SELECTION };
};

/** The element's `§_-ss§` as it was left - `DEFAULT_CODES` until a code was added. */
export const rememberedHandItems = (memory: WiredElementMemory, defaults: readonly number[]): number[] => {
    const handItems = memory.handItems;

    return Array.isArray(handItems) ? handItems.filter((code): code is number => typeof code === 'number') : [ ...defaults ];
};

export const actorHasHandItemCondition: WiredElementDefinition<ActorHasHandItemConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.ACTOR_HAS_HANDITEM,
    negativeCode: ConditionCodes.NOT_HAS_HANDITEM,
    createForm: (triggerable, ctx) => selectActorHasHandItem({
        handItems: rememberedHandItems(ctx.elementMemory('condition', ConditionCodes.ACTOR_HAS_HANDITEM), ACTOR_HAS_HAND_ITEM_DEFAULT_CODES),
        handItem: WIRED_DROPDOWN_NO_SELECTION,
    }, getWiredInt(triggerable, 0)),
    readIntParams: form => [ (form.handItem === WIRED_DROPDOWN_NO_SELECTION) ? 0 : form.handItem ],
    rememberOnEdit: form => ({ handItems: form.handItems }),
};
