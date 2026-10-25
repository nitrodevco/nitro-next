/** The toolbar's left group's width, as the toolbar last measured it. */
import { useSystemStore } from '../useSystemStore';

export const useToolbarAreaWidth = () => useSystemStore(x => x.toolbarAreaWidth);
