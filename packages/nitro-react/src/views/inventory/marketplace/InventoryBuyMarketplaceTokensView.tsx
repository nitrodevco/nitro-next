import { useState } from 'react';

import { buyMarketplaceTokens, releaseMarketplaceOfferItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryMarketplaceActions } from '#base/context/inventory';
import { TemplateWindow } from '#base/theme';

/**
 * Flash's `MarketplaceView.showBuyTokens` on `habbo-inventory-com/buy_marketplace_tokens_xml`,
 * built and centred (`center()`): `inventory.marketplace.buy_tokens.info` with the batch's price,
 * its size and how many of those are free (`count - 1`), and the buy button with its price
 * (`buy_tokens.buy`). Buying sends `BuyMarketplaceTokensMessageComposer` and keeps the offer
 * waiting (a not-enough-credits answer gives it up, `onNotEnoughCredits`); cancel and the close
 * button release it.
 *
 * Flash registers the info text's parameters before it builds the window, and the unnamed text
 * reads them through its `${key}` caption - the window's `parameters` here.
 */
interface InventoryBuyMarketplaceTokensViewProps {
    price: number;
    count: number;
}

export const InventoryBuyMarketplaceTokensView = ({ price, count }: InventoryBuyMarketplaceTokensViewProps) => {
    const { send } = useWebSocketContext();
    const { setMarketplaceView } = useInventoryMarketplaceActions();

    /** `cancel_buy_tokens_button` / `header_button_close`: `releaseItems`, then `disposeView`. */
    const cancel = () => {
        releaseMarketplaceOfferItems();
        setMarketplaceView(undefined);
    };

    const [ frame ] = useState(() => ({ id: 'inventory-buy-marketplace-tokens', centered: true, rememberPosition: false, onClose: cancel }));

    // `buy_tokens_button`: `buyMarketplaceTokens`, then `disposeView`.
    const buy = () => {
        buyMarketplaceTokens(send);
        setMarketplaceView(undefined);
    };

    return (
        <TemplateWindow
            id="habbo-inventory-com/buy_marketplace_tokens_xml"
            frame={frame}
            parameters={{
                'inventory.marketplace.buy_tokens.info': { price: String(price), count: String(count), free: String(count - 1) },
                'inventory.marketplace.buy_tokens.buy': { price: String(price) },
            }}
            bindings={{
                buy_tokens_button: { onPointerTap: buy },
                cancel_buy_tokens_button: { onPointerTap: cancel },
            }}
        />
    );
};
