/**
 * Mounts the wired trade window while a trade runs - `WiredTradingModel.running`, set when a wired
 * box starts a trade (`WiredTradeInitiate`) and cleared when it completes, is cancelled or is
 * walked away from.
 */
import { useWiredTradingStore } from '#base/context/wired-trading';
import { WiredTradeView } from '#base/views/wired-trading/trade/WiredTradeView';

export const WiredTradeComponent = () => {
    const running = useWiredTradingStore(x => x.tradeRunning);

    if (!running) return null;

    return <WiredTradeView />;
};
