import { useIsWindowVisible } from '#base/context';
import { LayoutBrowserView } from '#base/views/layout-browser/LayoutBrowserView';

export const LayoutBrowserComponent = () => {
    const isVisible = useIsWindowVisible('layout_browser');

    if (!isVisible) return null;

    return <LayoutBrowserView />;
};
