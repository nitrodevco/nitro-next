import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * Flash's `FirstProductSelectorCatalogWidget` (`firstProductAutoSelectorWidget`): once every widget
 * is up (`WIDGETS_INITIALIZED`) it selects the page's first offer, for a page with no item grid to
 * pick from. It draws nothing.
 */
export const CatalogFirstProductAutoSelectorWidgetView = ({ page }: CatalogWidgetProps) => {
    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (!page.offers.length) return;

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: page.offers[0] });
    });

    return null;
};
