import { lazy, Suspense } from 'react';

import { useIsWindowVisible } from '#base/context';

/**
 * Loaded lazily because the browser statically imports `layoutRegistry` - ~6,400 lines of
 * per-layout metadata plus the dynamic-import map for every generated layout. Bundled
 * eagerly, all of that sits in the boot-critical entry chunk for a dev tool that most
 * sessions never open; behind `lazy()` it costs nothing until the window is first shown.
 */
const LayoutBrowserView = lazy(() => import('#base/views/layout-browser/LayoutBrowserView').then(module => ({ default: module.LayoutBrowserView })));

export const LayoutBrowserComponent = () => {
    const isVisible = useIsWindowVisible('layout_browser');

    if (!isVisible) return null;

    return (
        <Suspense fallback={null}>
            <LayoutBrowserView />
        </Suspense>
    );
};
