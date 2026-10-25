/**
 * The trade as a one-line strip - Flash `TradingView.createMinimizedWindow` over
 * `inventory_trading_minimized_xml`, whose `windowMininizedEventProc` handles its two buttons:
 * `button_continue` goes back to the furni page and the full dialog (`requestFurniViewOpen`), and
 * `button_cancel` cancels the trade. Everything else is the layout's.
 *
 * `TradingView.getWindowContainer` hands this back instead of the full dialog while
 * `setMinimized(true)`: the user is on a tab the trade is not shown on, or a web3 trade is waiting
 * on its confirmation and the inventory was closed under it.
 */
import { requestCancelTrading, restoreInventoryTrading } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { TemplateWindow } from '#base/theme';

export const InventoryTradingMinimizedView = () => {
    const { send } = useWebSocketContext();

    return (
        <TemplateWindow
            id="habbo-inventory-com/inventory_trading_minimized_xml"
            bindings={{
                button_continue: { onPointerTap: restoreInventoryTrading },
                button_cancel: { onPointerTap: () => requestCancelTrading(send) },
            }}
        />
    );
};
