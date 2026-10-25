import { showPurchaseConfirmation } from '#base/commands';
import { useCatalogStoreApi } from '#base/context/catalog';
import { useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, findCatalogListPrototype } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { priceDisplayItem } from './catalogPrice';

/**
 * The Builders Club loyalty list - the `builderLoyaltyWidget` container of
 * `layout_builders_club_loyalty.xml`, Flash's `BuilderLoyaltyCatalogWidget`, which attaches no
 * view: it works on the layout's own children. `init` takes the first row out of `loyalty_list`
 * and adds a clone of it for every offer of the page: `item_header` the offer's name, its price in
 * `item_cost_box` (`HabboCatalogUtils.showPriceInContainer`), and `item_buy` opening the purchase
 * confirmation for the offer (`windowProcedure`). Unlike the add-ons, nothing here depends on the
 * membership.
 */
export const CatalogBuilderLoyaltyWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const productData = useSystemStore(x => x.productData);
    const config = useConfigData();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const prototype = findCatalogListPrototype(templates, page, 'loyalty_list');

    useCatalogWidgetView((templates && prototype) && {
        bindings: {
            loyalty_list: {
                items: page.offers.map(offer => ({
                    key: String(offer.offerId),
                    from: prototype,
                    bindings: {
                        item_header: { caption: productData[offer.localizationId]?.name ?? t(offer.localizationId) },
                        item_cost_box: { items: [ priceDisplayItem(templates, offer, { config }) ] },
                        item_buy: { onPointerTap: () => showPurchaseConfirmation(store, offer, page.pageId) },
                    },
                })),
            },
        },
    });

    return null;
};
