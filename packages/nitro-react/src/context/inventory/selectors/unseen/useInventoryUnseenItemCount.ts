/**
 * `UnseenItemTracker.getCount(category)` - what `HabboInventory.updateUnseenItemCounts` puts on
 * each inventory tab's counter.
 */
import { getUnseenItemCount } from '../../store/InventoryUnseenSlice';
import { useInventoryStore } from '../../useInventoryStore';

export const useInventoryUnseenItemCount = (category: number) => useInventoryStore(x => getUnseenItemCount(x.unseenItems, category));
