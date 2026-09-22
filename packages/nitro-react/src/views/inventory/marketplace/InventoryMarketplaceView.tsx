import { useInventoryStore } from '#base/context/inventory';

import { InventoryBuyMarketplaceTokensView } from './InventoryBuyMarketplaceTokensView';
import { InventoryMakeMarketplaceOfferView } from './InventoryMakeMarketplaceOfferView';

/**
 * Flash's `inventory/marketplace/MarketplaceView`: the one window it holds at a time - the offer
 * dialog or the token offer - whichever `MarketplaceModel` last opened. It is its own window, not
 * part of the inventory's, so it stays up when the inventory closes.
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
