/**
 * The trade docked in `inventory_xml`'s `subContentArea` - what Flash's `InventoryMainView` does
 * with `TradingModel.getWindowContainer` while a trade is open, plus the two lifecycle rules the
 * model attaches to the window:
 *
 * - leaving the furni page minimises the trade rather than ending it (`TradingModel.categorySwitch`),
 *   which is why the dock watches the active tab rather than the view doing it;
 * - unmounting the window is `closingInventoryView`, which closes the trade unless a web3 trade is
 *   waiting on its confirmation.
 *
 * How tall it is, and how much `InventoryView` grows the frame by, is `inventoryTradingLayout`'s
 * - the same `getLowestPoint` the view lays itself out to, so the two can never disagree.
 */
import { useEffect } from 'react';

import { onInventoryClosedDuringTrade, onInventoryTabChangedDuringTrade } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryStore } from '#base/context/inventory';
import { Region } from '#base/theme';

import { getInventoryTradingHeight, INVENTORY_TRADING_MINIMIZED_HEIGHT, INVENTORY_TRADING_WIDTH, useInventoryTradingSections } from './inventoryTradingLayout';
import { InventoryTradingMinimizedView } from './InventoryTradingMinimizedView';
import { InventoryTradingView } from './InventoryTradingView';

interface InventoryTradingDockProps {
    /** The inventory's selected tab - a trade only survives on the furni page. */
    activeTab: string;
    /** Where `subContentArea` starts, so the dock sits exactly under `top_content`. */
    top: number;
}

export const InventoryTradingDock = ({ activeTab, top }: InventoryTradingDockProps) => {
    const { send } = useWebSocketContext();
    const tradingActive = useInventoryStore(x => x.tradingActive);
    const tradingMinimized = useInventoryStore(x => x.tradingMinimized);
    const { showSilver, showHighlight } = useInventoryTradingSections();

    // `TradingModel.categorySwitch`: the trade does not survive the user leaving the furni page.
    useEffect(() => {
        onInventoryTabChangedDuringTrade(activeTab);
    }, [ activeTab ]);

    // `closingInventoryView`, on the window going rather than on a packet.
    useEffect(() => () => onInventoryClosedDuringTrade(send), [ send ]);

    if (!tradingActive) return null;

    const height = tradingMinimized ? INVENTORY_TRADING_MINIMIZED_HEIGHT : getInventoryTradingHeight(showSilver, showHighlight);

    return (
        <Region layout={{ position: 'absolute', left: 0, top, width: INVENTORY_TRADING_WIDTH, height }}>
            {tradingMinimized ? <InventoryTradingMinimizedView /> : <InventoryTradingView />}
        </Region>
    );
};
