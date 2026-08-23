import { useIsWindowVisible, useSystemActions } from '#base/context';

export const useNavigatorVisibility = () => {
    const windowName = 'navigator';
    const isNavigatorVisible = useIsWindowVisible(windowName);
    const { showWindow, hideWindow } = useSystemActions();

    const showNavigator = () => showWindow(windowName);

    const hideNavigator = () => hideWindow(windowName);

    return { isNavigatorVisible, showNavigator, hideNavigator };
};
