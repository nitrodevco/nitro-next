/**
 * Mounts the inventory window (`InventoryView`, Flash `InventoryMainView`) while it is open, and
 * the marketplace's selling window (`InventoryMarketplaceView`, Flash `MarketplaceView`), which is
 * a window of its own that stays up whether the inventory is open or not.
 */
import { useIsWindowVisible } from '#base/context/system';
import { InventoryView } from '#base/views/inventory/InventoryView';
import { InventoryMarketplaceView } from '#base/views/inventory/marketplace/InventoryMarketplaceView';

export const InventoryComponent = () => {
    const isVisible = useIsWindowVisible('inventory');

    return (
        <>
            {isVisible && <InventoryView />}
            <InventoryMarketplaceView />
        </>
    );
};
