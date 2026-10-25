/**
 * `UnseenItemTracker.getIds(category)`, for a grid that marks its thumbs with `isUnseen` - the
 * pets', bots' and badges' `THUMB_COLOR_UNSEEN` background. An empty list when none are unseen.
 */
import { useInventoryStore } from '../../useInventoryStore';

const NONE: readonly number[] = [];

export const useInventoryUnseenIds = (category: number) => useInventoryStore(x => x.unseenItems[category] ?? NONE);
