import { WindowName, WindowRegistry } from '../store/WindowRegistry';
import { useSystemStore } from '../useSystemStore';

const EMPTY_PARAMS = {};

export const useWindowParams = <T extends WindowName>(name: T): WindowRegistry[T] => {
    const params = useSystemStore(x => x.visibleWindows[name]);

    return params ?? EMPTY_PARAMS;
};
