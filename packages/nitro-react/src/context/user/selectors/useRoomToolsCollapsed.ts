import { useUserStore } from '../useUserStore';

/**
 * Whether the room tools are folded away to their strip (`RoomToolsToolbarCtrl.isCollapsed`). The
 * room tools widget sets where they start and its strip flips them; see `roomToolsCollapsed`.
 *
 * The chat bar reads this too, because it starts where the tools end.
 */
export const useRoomToolsCollapsed = () => useUserStore(x => x.roomToolsCollapsed);
