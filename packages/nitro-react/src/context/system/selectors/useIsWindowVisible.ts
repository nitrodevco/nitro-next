import { WindowName } from '../store/WindowRegistry';
import { useSystemStore } from '../useSystemStore';

export const useIsWindowVisible = (name: WindowName) => useSystemStore(x => !!x.visibleWindows[name]);
