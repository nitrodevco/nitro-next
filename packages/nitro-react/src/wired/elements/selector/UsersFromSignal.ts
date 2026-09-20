/**
 * `selectors/§_-1l§` (USERS_FROM_SIGNAL) - selects the users a received signal carried. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

export const usersFromSignalSelector: WiredElementDefinition<Record<string, never>> = {
    holder: 'selector',
    code: SelectorCodes.USERS_FROM_SIGNAL,
    createForm: () => ({}),
};
