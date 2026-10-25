/**
 * `selectors/UsersInArea` (USERS_IN_AREA) - `InArea` for users.
 */
import { createInAreaSelector } from './InArea';
import { SelectorCodes } from './selectorCodes';

export const usersInAreaSelector = createInAreaSelector(SelectorCodes.USERS_IN_AREA);
