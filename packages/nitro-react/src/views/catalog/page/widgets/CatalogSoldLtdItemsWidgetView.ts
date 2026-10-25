import { useState } from 'react';

import { getCatalogNodesByOfferId } from '#base/commands';
import { CatalogPage, CatalogWidgetEnum, CatalogWidgetEventEnum, useCatalogStore } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The "no longer available" bar of a sold-out limited edition, `soldLtdItemsWidget.xml` - Flash's
 * `SoldLtdItemsCatalogWidget`: the wide `unique_item_large_na_button_wide` bar with
 * `sold.ltd.items.not.available` on its right. The layout's
 * `check_markeplace_link` is hidden and nothing shows it.
 *
 * `onPreviewProduct` shows the bar and hides the purchase widget (`CWE_TOGGLE` for
 * `purchaseWidget`) for an offer that cannot be bought any more: in the search results one whose
 * catalogue page is a `limited_sold` page, on a `sold_ltd_items` page any offer, and elsewhere a
 * limited edition with none left. Any other offer hides the bar and shows the purchase widget.
 */
export const CatalogSoldLtdItemsWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ visible, setVisible ] = useState(false);
    const offersToNodes = useCatalogStore(x => x.offersToNodes);

    const toggle = (soldOut: boolean) => {
        setVisible(soldOut);
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.TOGGLE, widgetId: CatalogWidgetEnum.PURCHASE, enabled: !soldOut });
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        const product = getOfferProduct(event.offer);

        if (!product) return;

        if (page.mode === CatalogPage.MODE_SEARCH) {
            const nodes = getCatalogNodesByOfferId(offersToNodes, event.offer.offerId);

            if (nodes.some(node => (node.pageName.indexOf('limited_sold') > -1))) {
                toggle(true);

                return;
            }
        }

        if (page.layoutCode === 'sold_ltd_items') {
            toggle(true);

            return;
        }

        toggle(product.isUnique && (product.uniqueLeft === 0));
    });

    useCatalogWidgetView({ template: 'soldLtdItemsWidget', bindings: { '': { visible } } });

    return null;
};
