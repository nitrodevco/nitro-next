import { useIsWindowVisible, useWindowActions, WindowName } from '#base/context/system';

/** Whether a registered window is open, with `show` and `hide` already bound to its name. */
export const useWindowVisibility = (windowName: WindowName) => {
    const isWindowVisible = useIsWindowVisible(windowName);
    const { showWindow, hideWindow } = useWindowActions();

    const show = () => showWindow(windowName);
    const hide = () => hideWindow(windowName);

    return { isWindowVisible, show, hide };
};
