import { useState } from 'react';

import { hasBuilderSecondsLeft, showPurchaseConfirmation } from '#base/commands';
import { useCatalogStoreApi } from '#base/context/catalog';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, findCatalogListPrototype } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The Builders Club add-ons list - the `builderAddonsWidget` container of
 * `layout_builders_club_addons.xml`, Flash's `BuilderAddonsCatalogWidget`, which attaches no view:
 * it works on the layout's own children. `init` takes the first row out of `addons_list` and adds a
 * clone of it for every offer of the page: `item_header` the offer's name, `item_price` its
 * credits, and for an offer with an activity point price `diamonds_price` and `diamonds_icon`
 * shown; `item_buy` opens the purchase confirmation for the offer (`windowProcedure`).
 *
 * `init` reads the membership once: a trial user (no seconds left) sees `trial_warning` and every
 * `item_buy` disabled. Flash's widget does not listen for `CWE_BUILDER_SUBSCRIPTION_UPDATED`, so
 * neither does this; the page shows the state it was built in.
 */
export const CatalogBuilderAddonsWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const [ hasSecondsLeft ] = useState(() => hasBuilderSecondsLeft(store));
    const productData = useSystemStore(x => x.productData);
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const prototype = findCatalogListPrototype(templates, page, 'addons_list');

    useCatalogWidgetView(prototype && {
        bindings: {
            trial_warning: { visible: !hasSecondsLeft },
            addons_list: {
                items: page.offers.map(offer => ({
                    key: String(offer.offerId),
                    from: prototype,
                    bindings: {
                        item_header: { caption: productData[offer.localizationId]?.name ?? t(offer.localizationId) },
                        item_price: { caption: offer.priceInCredits.toString() },
                        ...((offer.priceInActivityPoints > 0)
                            ? {
                                    diamonds_icon: { visible: true },
                                    diamonds_price: { visible: true, caption: offer.priceInActivityPoints.toString() },
                                }
                            : {}),
                        item_buy: { disabled: !hasSecondsLeft, onPointerTap: () => showPurchaseConfirmation(store, offer, page.pageId) },
                    },
                })),
            },
        },
    });

    return null;
};
