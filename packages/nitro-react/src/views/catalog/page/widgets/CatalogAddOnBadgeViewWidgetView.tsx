import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region, ThemeImage } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The badge an offer comes with, `addOnBadgeViewWidget.xml` - Flash's
 * `AddOnBadgeViewCatalogWidget`: the 40x40 `badge` window widget (`badge_image`), given the
 * selected offer's badge code. An offer without a badge leaves the last one showing, as Flash only
 * ever sets the badge id (`onSelectProduct`). The badge is `badge.asset.url`'s image.
 */
export const CatalogAddOnBadgeViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ badgeCode, setBadgeCode ] = useState('');
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        if (event.offer.badgeCode) setBadgeCode(event.offer.badgeCode);
    });

    return (
        <Region
            name="addOnBadgeViewWidget"
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
        >
            {(badgeCode.length > 0) && (
                <ThemeImage
                    name="badge"
                    src={badgeUrl.replace('%badgename%', badgeCode)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
            )}
        </Region>
    );
};
