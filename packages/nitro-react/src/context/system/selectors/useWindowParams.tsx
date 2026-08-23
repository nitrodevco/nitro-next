import { WindowName, WindowRegistry } from '../store/WindowRegistry';
import { useSystemContext } from '../useSystemContext';

const EMPTY_PARAMS = {};

export const useWindowParams = <T extends WindowName>(name: T): WindowRegistry[T] => {
    const params = useSystemContext(x => x.visibleWindows[name]);

    return params ?? EMPTY_PARAMS;
};
