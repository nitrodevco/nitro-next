/**
 * `selectors/§_-01b§` (REMOTE_SELECTOR) - selects through other selectors: the kind of selection
 * (`remote_selection.type.0/1`) and, optionally, a number to filter by
 * (`remote_selection.filter.1`, with its number input).
 *
 * Int params: `[ type, filter ]` - `filter` is the number while the filter option is chosen, 0
 * otherwise; a box saved with a positive number opens with the filter option chosen.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { SelectorCodes } from './selectorCodes';

/** `NumberInputParam(0, 0, 2147483647, 40, 0, false)`. */
export const REMOTE_SELECTOR_FILTER_MAX = 2147483647;
export const REMOTE_SELECTOR_FILTER_WIDTH = 40;

export interface RemoteSelectorForm {
    type: number;
    /** The filter radio: 0 none, 1 by the number. */
    filterMode: number;
    filterValue: number;
}

export const remoteSelector: WiredElementDefinition<RemoteSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.REMOTE_SELECTOR,
    createForm: (triggerable) => {
        const filter = getWiredInt(triggerable, 1);

        return { type: getWiredInt(triggerable, 0), filterMode: (filter > 0) ? 1 : 0, filterValue: filter };
    },
    readIntParams: form => [ form.type, (form.filterMode === 1) ? form.filterValue : 0 ],
};
