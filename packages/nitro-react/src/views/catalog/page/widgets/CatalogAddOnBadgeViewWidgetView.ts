import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useBadgeImageUrl } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The badge an offer comes with - Flash's `AddOnBadgeViewCatalogWidget`, which attaches
 * `addOnBadgeViewWidget` and gives its `badge` window widget (`BadgeImageWidget`) the selected
 * offer's badge code. An offer without a badge leaves the last one showing, as Flash only ever sets
 * the badge id (`onSelectProduct`). The badge is `badge.asset.url`'s image.
 */
export const CatalogAddOnBadgeViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ badgeCode, setBadgeCode ] = useState('');
    const badgeUrl = useBadgeImageUrl();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        if (event.offer.badgeCode) setBadgeCode(event.offer.badgeCode);
    });

    useCatalogWidgetView({
        template: 'addOnBadgeViewWidget',
        bindings: {
            badge: (badgeCode.length > 0) ? { asset: badgeUrl(badgeCode) } : {},
        },
    });

    return null;
};
