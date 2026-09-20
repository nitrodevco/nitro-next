/**
 * `selectors/§_-xp§` (USERS_IN_NEIGHBORHOOD) - `InNeighborhood` under the users code.
 */
import { createInNeighborhoodSelector } from './InNeighborhood';
import { SelectorCodes } from './selectorCodes';

export const usersInNeighborhoodSelector = createInNeighborhoodSelector(SelectorCodes.USERS_IN_NEIGHBORHOOD);
