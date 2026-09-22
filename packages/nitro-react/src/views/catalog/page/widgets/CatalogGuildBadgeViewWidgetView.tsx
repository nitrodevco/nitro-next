import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region, ThemeImage } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The picked group's badge, `guildBadgeViewWidget.xml` - Flash's `GuildBadgeViewCatalogWidget`:
 * the 40x40 `badge` window widget (`badge_image`, type `group`), which `GUILD_SELECTED` gives the
 * group's badge code and id. The badge is the hotel's group badge image (`badge.asset.group.url`),
 * centred as the badge widget draws it; with no group picked it is empty.
 */
export const CatalogGuildBadgeViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ badgeCode, setBadgeCode ] = useState('');
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.GUILD_SELECTED, event => setBadgeCode(event.badgeCode));

    return (
        <Region
            name="guildBadgeViewWidget"
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
        >
            {(badgeCode.length > 0) && (
                <ThemeImage
                    name="badge"
                    src={groupBadgeUrl.replace('%badgedata%', badgeCode)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
            )}
        </Region>
    );
};
