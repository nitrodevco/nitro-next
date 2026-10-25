import { WindowName } from '../store/WindowRegistry';
import { useSystemStore } from '../useSystemStore';

/** Whether a window the registry names is open. */
export const useIsWindowVisible = (name: WindowName) => useSystemStore(x => !!x.visibleWindows[name]);
