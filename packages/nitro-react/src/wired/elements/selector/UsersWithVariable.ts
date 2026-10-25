/**
 * `selectors/§_-Tt§` (USERS_WITH_VARIABLE) - `§_-U1w§` (`WithVariable`) over user variables.
 */
import { WIRED_SOURCE_USER } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';
import { createWithVariableSelector } from './WithVariable';

export const usersWithVariableSelector = createWithVariableSelector(SelectorCodes.USERS_WITH_VARIABLE, WIRED_SOURCE_USER);
