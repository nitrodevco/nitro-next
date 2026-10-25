import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useConfigData } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { priceBoxItem } from './catalogPrice';

/**
 * The selected offer's price with nothing else, the `simplePriceWidget` container - Flash's
 * `SimplePriceCatalogWidget`, which attaches no view and calls
 * `HabboCatalogUtils.showPriceOnProduct(offer, window, previous, window.findChildByName("fake_productimage"), 0, true, 0)`
 * on every `SELECT_PRODUCT`: the `priceDisplayWidget` box added to the container.
 *
 * With no `room_canvas_container` in the container the box is placed by `fake_productimage`
 * (`layout_single_bundle`): its right edge on the image's right edge, its top on the image's top. A
 * layout without that element (`layout_guild_forum`) leaves the box where `priceDisplayWidget`
 * puts it. The builders club shows no price.
 */
export const CatalogSimplePriceWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => setOffer(event.offer));

    const box = (templates && offer)
        ? priceBoxItem(templates, offer, { config, builder: page.isBuilderPage, placement: { reference: 'fake_productimage', dx: 0, top: true, dy: 0 } })
        : undefined;

    useCatalogWidgetView({ bindings: { '': { added: box ? [ box ] : [] } } });

    return null;
};
