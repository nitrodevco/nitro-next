/**
 * `selectors/UsersByType` (USERS_BY_TYPE) - selects the room's users of one kind.
 *
 * Int params: `[ user type ]` - 1 habbo, 2 pet, 4 bot (`usertype.1`, `.2`, `.4`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { SelectorCodes } from './selectorCodes';

export interface UsersByTypeSelectorForm {
    userType: number;
}

export const usersByTypeSelector: WiredElementDefinition<UsersByTypeSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_BY_TYPE,
    createForm: triggerable => ({ userType: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.userType ],
};
