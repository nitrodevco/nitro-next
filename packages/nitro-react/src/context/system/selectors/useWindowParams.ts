import { WindowName, WindowRegistry } from '../store/WindowRegistry';
import { useSystemStore } from '../useSystemStore';

/**
 * The params an open window was shown with, typed by its registry entry - empty when it was
 * given none or is closed.
 */
const EMPTY_PARAMS = {};

export const useWindowParams = <T extends WindowName>(name: T): WindowRegistry[T] => {
    const params = useSystemStore(x => x.visibleWindows[name]);

    return params ?? EMPTY_PARAMS;
};
