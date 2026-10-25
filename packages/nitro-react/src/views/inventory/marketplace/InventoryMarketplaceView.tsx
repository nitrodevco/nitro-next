import { useInventoryStore } from '#base/context/inventory';

import { InventoryBuyMarketplaceTokensView } from './InventoryBuyMarketplaceTokensView';
import { InventoryMakeMarketplaceOfferView } from './InventoryMakeMarketplaceOfferView';

/**
 * Flash's `inventory/marketplace/MarketplaceView`: the one window it holds at a time - the offer
 * dialog or the token offer - whichever `MarketplaceModel` last opened. It is its own window, not
 * part of the inventory's, so it stays up when the inventory closes. Each is its layout's template
 * (`make_marketplace_offer_xml`, `buy_marketplace_tokens_xml`) built as a window of its own.
 *
 * `showNoCredits` (`marketplace_no_credits_xml`) is not ported: nothing in this revision calls it -
 * a token purchase the user cannot pay ends in `onNotEnoughCredits`, which only releases the items.
 */
export const InventoryMarketplaceView = () => {
    const view = useInventoryStore(x => x.marketplaceView);

    if (!view) return null;

    if (view.kind === 'make_offer') {
        return (
            <InventoryMakeMarketplaceOfferView
                key={view.item.id}
                item={view.item}
                maxAmount={view.maxAmount}
            />
        );
    }

    return (
        <InventoryBuyMarketplaceTokensView
            price={view.price}
            count={view.count}
        />
    );
};
