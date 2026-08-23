import { useIsWindowVisible, useSystemActions } from '#base/context';

export const useCatalogVisibility = () => {
    const windowName = 'catalog';
    const isCatalogVisible = useIsWindowVisible(windowName);
    const { showWindow, hideWindow } = useSystemActions();

    const showCatalog = () => showWindow(windowName);

    const hideCatalog = () => hideWindow(windowName);

    return { isCatalogVisible, showCatalog, hideCatalog };
};
