import { useState } from 'react';

import { getCatalogNodesByOfferId } from '#base/commands';
import { CatalogPage, CatalogWidgetEnum, CatalogWidgetEventEnum, useCatalogStore } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The "no longer available" bar of a sold-out limited edition, `soldLtdItemsWidget.xml` - Flash's
 * `SoldLtdItemsCatalogWidget`: the wide `unique_item_large_na_button_wide` bar with
 * `sold.ltd.items.not.available` centred on its right in etched `u_bold` at 0.7. The layout's
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
    const t = useTranslation();

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

    if (!visible) return null;

    return (
        <Region
            name="widgetContainer"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}
        >
            <ThemeImage
                src={LayoutImage('catalog/unique_item_large_na_button_wide.png')}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'top right' }}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}
            />
            <Region
                name="not_available_text"
                alpha={0.7}
                layout={{ position: 'absolute', left: 204, width: 137, top: 8, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('sold.ltd.items.not.available')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#101027', align: 'center' }}
                    flashFormat={{ etchingColor: 0xFFFFFFFF }}
                    verticalAlign="top"
                />
            </Region>
        </Region>
    );
};
