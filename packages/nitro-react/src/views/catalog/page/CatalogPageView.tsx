import { ComponentType, useEffect } from 'react';

import { CatalogPage, CatalogWidgetEventEnum, resolveCatalogLayout, useCatalogStore } from '#base/context/catalog';

import { CATALOG_LAYOUT_VIEWS, CatalogLayoutProps } from './CatalogPageRegistry';

interface CatalogPageLayoutProps {
    page: CatalogPage;
    view: ComponentType<CatalogLayoutProps>;
}

/**
 * One built page: the layout view with its widgets, then - once every widget has mounted and
 * subscribed - `CatalogPage.initializeWidgets`' closing `WIDGETS_INITIALIZED` and the viewer's
 * `selectOffer`. The offer is the one the page was opened for, or on reopening the catalogue the
 * one last selected (`CatalogPage.selectedOfferId`), since the port rebuilds the widgets a closed
 * window dropped.
 */
const CatalogPageLayout = ({ page, view: LayoutView }: CatalogPageLayoutProps) => {
    useEffect(() => {
        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.WIDGETS_INITIALIZED });
        page.selectOffer((page.selectedOfferId > -1) ? page.selectedOfferId : page.initialOfferId);
    }, [ page ]);

    return <LayoutView page={page} />;
};

/**
 * The page in `layoutContainer` - Flash's `CatalogViewer` showing its `CatalogPage`: the layout
 * `createWindow` would build for the page's layout code, drawn by the view the registry has for it
 * (`CatalogPageRegistry`). A code with no layout, or a layout with no view yet, draws nothing, as
 * Flash does for a layout asset it cannot find. A new page (a new `pageSerial`) mounts a new
 * layout and new widgets, as Flash disposes the old page and builds the next.
 */
export const CatalogPageView = () => {
    const page = useCatalogStore(x => x.activePage);
    const pageSerial = useCatalogStore(x => x.pageSerial);

    if (!page) return null;

    const layout = resolveCatalogLayout(page.layoutCode);
    const view = layout ? CATALOG_LAYOUT_VIEWS[layout] : undefined;

    if (!view) return null;

    return (
        <CatalogPageLayout
            key={pageSerial}
            page={page}
            view={view}
        />
    );
};
