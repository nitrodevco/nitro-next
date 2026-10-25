/**
 * `HabboUnseenItemsUpdatedEvent.inventoryCount`: the unseen ids of every inventory category, which
 * `HabboToolbar.onUnseenItemsUpdate` shows on the toolbar's inventory icon.
 */
import { getUnseenInventoryCount } from '../../store/InventoryUnseenSlice';
import { useInventoryStore } from '../../useInventoryStore';

export const useInventoryUnseenTotalCount = () => useInventoryStore(x => getUnseenInventoryCount(x.unseenItems));
