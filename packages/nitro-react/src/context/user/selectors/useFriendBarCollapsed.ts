import { UiFlagEnum } from '../store/UserStore';
import { useUserStore } from '../useUserStore';

/**
 * Whether the friend bar is folded to its tools - `HabboFriendBarView.onSessionDataPreferences`:
 * collapsed while bit 1 of the account's `uiFlags` is clear (`setFriendBarState`).
 */
export const useFriendBarCollapsed = () => useUserStore(x => !(x.uiFlags & UiFlagEnum.FriendBarExpanded));
