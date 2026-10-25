import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useGroupBadgeImageUrl } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The picked group's badge - Flash's `GuildBadgeViewCatalogWidget`, which attaches the
 * `guildBadgeViewWidget` view: its `badge` widget (`badge_image`, type `group`) takes the group's
 * badge code and id from `GUILD_SELECTED`. The badge is the hotel's group badge image
 * (`badge.asset.group.url`); with no group picked it is empty.
 */
export const CatalogGuildBadgeViewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ badgeCode, setBadgeCode ] = useState('');
    const groupBadgeUrl = useGroupBadgeImageUrl();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.GUILD_SELECTED, event => setBadgeCode(event.badgeCode));

    useCatalogWidgetView({
        template: 'guildBadgeViewWidget',
        bindings: {
            badge: { asset: (badgeCode.length > 0) ? groupBadgeUrl(badgeCode) : '' },
        },
    });

    return null;
};
