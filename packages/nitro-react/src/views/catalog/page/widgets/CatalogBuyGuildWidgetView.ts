import { startGuildPurchase } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The group front page's buy button - Flash's `BuyGuildWidget`, which attaches no view and binds its
 * container's own `start_guild_purchase` button (`layout_guild_frontpage`). A click asks for the
 * group creation info and closes the catalogue (`startGuildPurchase`); the group creator
 * `GuildCreationInfoMessage` opens belongs to the groups manager, which this client does not have,
 * so the answer is not acted on yet.
 */
export const CatalogBuyGuildWidgetView = (_props: CatalogWidgetProps) => {
    const { send } = useWebSocketContext();

    useCatalogWidgetView({
        bindings: {
            start_guild_purchase: { onPointerTap: () => startGuildPurchase(send) },
        },
    });

    return null;
};
