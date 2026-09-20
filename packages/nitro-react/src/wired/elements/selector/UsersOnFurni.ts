/**
 * `selectors/§_-92J§` (USERS_ON_FURNI) - selects the users standing on the furni of its source. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

export const usersOnFurniSelector: WiredElementDefinition<Record<string, never>> = {
    holder: 'selector',
    code: SelectorCodes.USERS_ON_FURNI,
    createForm: () => ({}),
};
