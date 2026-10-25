/** The friend bar's width, as the toolbar last measured it. */
import { useSystemStore } from '../useSystemStore';

export const useFriendBarWidth = () => useSystemStore(x => x.friendBarWidth);
