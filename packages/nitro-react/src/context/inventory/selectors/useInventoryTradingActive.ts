/**
 * `HabboInventory.tradingActive` (`activeTradingModel != null`): either trade is running - the
 * trade with another user or the wired trade.
 */
import { useWiredTradingStore } from '#base/context/wired-trading';

import { useInventoryStore } from '../useInventoryStore';

export const useInventoryTradingActive = () => {
    const userTradeActive = useInventoryStore(x => x.tradingActive);
    const wiredTradeRunning = useWiredTradingStore(x => x.tradeRunning);

    return userTradeActive || wiredTradeRunning;
};
