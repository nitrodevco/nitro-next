/**
 * The trade as a one-line strip - Flash `TradingView.createMinimizedWindow` over
 * `inventory_trading_minimized_xml` (478x68): a style 102 panel tinted like the full dialog, the
 * panic icon at 11,6, the "a trade is running" line at 42,8, and the two buttons
 * (`windowMininizedEventProc`) - continue, which goes back to the furni page and the full dialog,
 * and cancel, which cancels the trade.
 *
 * `TradingView.getWindowContainer` hands this back instead of the full dialog while
 * `setMinimized(true)`: the user is on a tab the trade is not shown on, or a web3 trade is waiting
 * on its confirmation and the inventory was closed under it.
 */
import { requestCancelTrading, restoreInventoryTrading } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { INVENTORY_TRADING_MINIMIZED_HEIGHT, INVENTORY_TRADING_WIDTH } from './inventoryTradingLayout';

export const InventoryTradingMinimizedView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: INVENTORY_TRADING_WIDTH, height: INVENTORY_TRADING_MINIMIZED_HEIGHT }}>
            <Border
                variant="102"
                tintColor="#27556a"
                layout={{ position: 'absolute', left: 0, top: 0, width: INVENTORY_TRADING_WIDTH, height: INVENTORY_TRADING_MINIMIZED_HEIGHT }}
            />
            <ThemeImage
                src={LayoutImage('shared/icons_panic.png')}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 11, top: 6, width: 30, height: 30 }}
            />
            <ThemeText
                text={t('inventory.trading.minimized.trade_in_progress')}
                textStyle="u_headline_big"
                textOptions={{ wordWrap: true, wordWrapWidth: 417 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 42, top: 8, width: 421 }}
            />
            <Button
                variant="3"
                name="button_continue"
                textStyle="button_shiny_regular"
                onPointerTap={restoreInventoryTrading}
                layout={{ position: 'absolute', left: 7, top: 36, width: 70, height: 28 }}
            >
                {t('inventory.trading.minimized.continue_trade')}
            </Button>
            <Button
                variant="3"
                name="button_cancel"
                textStyle="button_shiny_regular"
                onPointerTap={() => requestCancelTrading(send)}
                layout={{ position: 'absolute', left: 412, top: 36, width: 56, height: 28 }}
            >
                {t('generic.cancel')}
            </Button>
        </Region>
    );
};
