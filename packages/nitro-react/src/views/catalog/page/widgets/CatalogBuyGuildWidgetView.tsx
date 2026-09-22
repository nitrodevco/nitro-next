import { startGuildPurchase } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Button } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The group front page's buy button - Flash's `BuyGuildWidget`, whose view is its container's own
 * `start_guild_purchase` button (`layout_guild_frontpage.xml`). A click asks for the group
 * creation info and closes the catalogue (`startGuildPurchase`); the group creator
 * `GuildCreationInfoMessage` opens belongs to the groups manager, which this client does not have,
 * so the answer is not acted on yet.
 */
export const CatalogBuyGuildWidgetView = (_props: CatalogWidgetProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="start_guild_purchase"
            onPointerTap={() => startGuildPurchase(send)}
            layout={{ position: 'absolute', left: 19, width: 213, top: 2, height: 28, minWidth: 190, minHeight: 28, maxHeight: 50 }}
        >
            {t('catalog.start.guild.purchase.button')}
        </Button>
    );
};
