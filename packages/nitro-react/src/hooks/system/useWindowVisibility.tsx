import { useIsWindowVisible, useSystemActions, WindowName } from '#base/context';

export const useWindowVisibility = (windowName: WindowName) => {
    const isWindowVisible = useIsWindowVisible(windowName);
    const { showWindow, hideWindow } = useSystemActions();

    const show = () => showWindow(windowName);
    const hide = () => hideWindow(windowName);

    return { isWindowVisible, show, hide };
};
