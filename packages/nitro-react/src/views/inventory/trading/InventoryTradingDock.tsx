/**
 * The trade docked in `inventory_xml`'s `subContentArea` - what Flash's `InventoryMainView` does
 * with `TradingModel.getWindowContainer` while a trade is open: the full `inventory_trading_xml`
 * dialog, or the `inventory_trading_minimized_xml` strip while it is minimised, at 0,0 of the area.
 * The model also attaches two lifecycle rules to the window:
 *
 * - leaving the furni page minimises the trade rather than ending it (`TradingModel.categorySwitch`),
 *   which is why the dock watches the active tab rather than the view doing it;
 * - unmounting the window is `closingInventoryView`, which closes the trade unless a web3 trade is
 *   waiting on its confirmation.
 *
 * How tall it is - and so how much the inventory window grows by - is `inventoryTradingLayout`'s,
 * the same `getLowestPoint` the dialog's `arrange` takes its height from.
 *
 * Without a user trade, a running wired trade docks here instead (`WiredTradingModel.getWindowContainer`,
 * `inventory_trading_wired_xml`): the inventory going cancels it (`WiredTradingModel.closingInventoryView`
 * -> `close(true, true)`). Leaving the furni page does nothing to it (`categorySwitch` is empty);
 * the other tabs are disabled while it runs anyway.
 */
import { useEffect } from 'react';

import { closeWiredTrade, onInventoryClosedDuringTrade, onInventoryTabChangedDuringTrade } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryStore } from '#base/context/inventory';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { Box } from '#base/theme';
import { WiredTradeView } from '#base/views/wired-trading/trade/WiredTradeView';

import { INVENTORY_TRADING_WIDTH, useInventoryTradingDockHeight } from './inventoryTradingLayout';
import { InventoryTradingMinimizedView } from './InventoryTradingMinimizedView';
import { InventoryTradingView } from './InventoryTradingView';

interface InventoryTradingDockProps {
    /** The inventory's selected tab - a trade only survives on the furni page. */
    activeTab: string;
}

export const InventoryTradingDock = ({ activeTab }: InventoryTradingDockProps) => {
    const { send } = useWebSocketContext();
    const tradingActive = useInventoryStore(x => x.tradingActive);
    const tradingMinimized = useInventoryStore(x => x.tradingMinimized);
    const wiredTradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const height = useInventoryTradingDockHeight();

    // `TradingModel.categorySwitch`: the trade does not survive the user leaving the furni page.
    useEffect(() => {
        onInventoryTabChangedDuringTrade(activeTab);
    }, [ activeTab ]);

    // `closingInventoryView`, on the window going rather than on a packet.
    useEffect(() => () => {
        onInventoryClosedDuringTrade(send);
        closeWiredTrade(send, true);
    }, [ send ]);

    if (!tradingActive) {
        if (!wiredTradeRunning) return null;

        return (
            <Box layout={{ position: 'absolute', left: 0, top: 0, width: INVENTORY_TRADING_WIDTH, height }}>
                <WiredTradeView />
            </Box>
        );
    }

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: INVENTORY_TRADING_WIDTH, height }}>
            {tradingMinimized ? <InventoryTradingMinimizedView /> : <InventoryTradingView />}
        </Box>
    );
};
