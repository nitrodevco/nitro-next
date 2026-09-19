import { useSystemStore } from '../useSystemStore';

/** The toolbar's left group and friend bar widths, as the toolbar last measured them. */
export const useToolbarAreaWidth = () => useSystemStore(x => x.toolbarAreaWidth);
export const useFriendBarWidth = () => useSystemStore(x => x.friendBarWidth);
