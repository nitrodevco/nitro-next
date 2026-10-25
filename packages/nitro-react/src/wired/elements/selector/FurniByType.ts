/**
 * `selectors/FurniByType` (FURNI_BY_TYPE) - selects the furni of the same type as those of its
 * source, optionally only those in the same state.
 *
 * Int params: `[ state match ]` (0/1).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { SelectorCodes } from './selectorCodes';

export interface FurniByTypeSelectorForm {
    stateMatch: boolean;
}

export const furniByTypeSelector: WiredElementDefinition<FurniByTypeSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.FURNI_BY_TYPE,
    createForm: triggerable => ({ stateMatch: getWiredBoolean(triggerable, 0) }),
    readIntParams: form => [ form.stateMatch ? 1 : 0 ],
};
