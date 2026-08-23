import { WindowName } from '../store/WindowRegistry';
import { useSystemContext } from '../useSystemContext';

export const useIsWindowVisible = (name: WindowName) => useSystemContext(x => !!x.visibleWindows[name]);
