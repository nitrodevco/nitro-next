import { useSystemStore } from '../useSystemStore';

/** The user's home room (`HabboNavigator.homeRoomId`), 0 when none is set. */
export const useHomeRoomId = () => useSystemStore(x => x.homeRoomId);
