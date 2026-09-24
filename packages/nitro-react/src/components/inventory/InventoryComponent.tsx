/**
 * Mounts the inventory window (`InventoryView`, Flash `InventoryMainView`) while it is open, the
 * marketplace's selling window (`InventoryMarketplaceView`, Flash `MarketplaceView`), which is a
 * window of its own that stays up whether the inventory is open or not, and the trade's name-scam
 * warning (`TradingNameScamWarningController`), which is raised by the trade opening rather than by
 * the window and so is mounted beside it.
 *
 * The mount stays put while the window is hidden, which is what lets it hear the placement it hid
 * itself for finish (`onObjectPlaced`) and bring the window back.
 */
import { useIsWindowVisible } from '#base/context/system';
import { useRoomInventoryPlacementHandler } from '#base/hooks';
import { InventoryView } from '#base/views/inventory/InventoryView';
import { InventoryMarketplaceView } from '#base/views/inventory/marketplace/InventoryMarketplaceView';
import { InventoryTradingNameScamWarningView } from '#base/views/inventory/trading/InventoryTradingNameScamWarningView';

export const InventoryComponent = () => {
    const isVisible = useIsWindowVisible('inventory');

    useRoomInventoryPlacementHandler();

    return (
        <>
            {isVisible && <InventoryView />}
            <InventoryMarketplaceView />
            <InventoryTradingNameScamWarningView />
        </>
    );
};
