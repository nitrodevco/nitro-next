/**
 * How tall the docked trade is - Flash `TradingView.resizeWindow`, which stacks
 * `inventory_trading_xml`'s four parts 7px apart (`Util.moveAllChildrenToColumn`) and takes the
 * window's height from the lowest of them (`getLowestPoint`). A part that is hidden closes its gap
 * rather than leaving a hole; with everything showing the column is 233 + 7 + 59 + 7 + 28 + 7 + 32
 * = 373, two more than the layout's own 371.
 *
 * `InventoryTradingView`'s `arrange` runs that column over the template; this is the same sum over
 * the template's section heights, for the inventory window, which grows by it before the template is
 * laid out - so the two agree on how much room the trade takes.
 */
import { isTradingCreditFurniPresent, isWeb3Trading, useInventoryStore } from '#base/context/inventory';
import { useConfigBoolean } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';

/** `TradingView.TRADE_UI_SPACING`: `resizeWindow`'s `Util.moveAllChildrenToColumn(window, 7)`. */
export const INVENTORY_TRADING_SECTION_GAP = 7;

/** `trade_container`'s, `silver_container`'s, `info_border_highlighted`'s and `button_container`'s heights in the layout, which the column keeps. */
const INVENTORY_TRADING_CONTAINER_HEIGHT = 233;
const INVENTORY_TRADING_SILVER_HEIGHT = 59;
const INVENTORY_TRADING_HIGHLIGHT_HEIGHT = 28;
const INVENTORY_TRADING_BUTTONS_HEIGHT = 32;

/** `inventory_trading_xml`'s width - `subContentArea`'s. */
export const INVENTORY_TRADING_WIDTH = 478;

/** `inventory_trading_wired_xml`'s height: the wired trade's sub page, the same width. */
export const INVENTORY_WIRED_TRADING_HEIGHT = 274;

/** `getLowestPoint` over the column: a hidden section costs nothing, not even its gap. */
const getInventoryTradingHeight = (showSilver: boolean, showHighlight: boolean): number => {
    const sections = [
        INVENTORY_TRADING_CONTAINER_HEIGHT,
        showSilver ? INVENTORY_TRADING_SILVER_HEIGHT : 0,
        showHighlight ? INVENTORY_TRADING_HIGHLIGHT_HEIGHT : 0,
        INVENTORY_TRADING_BUTTONS_HEIGHT,
    ].filter(height => height > 0);

    return sections.reduce((total, height) => total + height, 0) + (INVENTORY_TRADING_SECTION_GAP * (sections.length - 1));
};

/** Which of the view's optional sections show - the two things its height depends on. */
export const useInventoryTradingSections = () => {
    const requiredSilverFee = useInventoryStore(x => x.tradingRequiredSilverFee);
    const ownUser = useInventoryStore(x => x.tradingOwnUser);
    const otherUser = useInventoryStore(x => x.tradingOtherUser);
    const warningsEnabled = useConfigBoolean('trading.warning.enabled');

    return { showSilver: isWeb3Trading(requiredSilverFee, ownUser, otherUser), showHighlight: warningsEnabled && isTradingCreditFurniPresent(ownUser, otherUser), warningsEnabled };
};

/** `inventory_trading_minimized_xml`'s own height - what the strip takes instead of the dialog. */
const INVENTORY_TRADING_MINIMIZED_HEIGHT = 68;

/**
 * How much taller the inventory window is while a trade is docked; 0 when none is. A minimised
 * trade is the one-line strip, which is what `getWindowContainer` hands back in its place. A
 * wired trade (`HabboInventory.activeTradingModel`, after the user trade) docks at its own height.
 */
export const useInventoryTradingDockHeight = (): number => {
    const tradingActive = useInventoryStore(x => x.tradingActive);
    const tradingMinimized = useInventoryStore(x => x.tradingMinimized);
    const wiredTradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const { showSilver, showHighlight } = useInventoryTradingSections();

    if (!tradingActive) return wiredTradeRunning ? INVENTORY_WIRED_TRADING_HEIGHT : 0;

    return tradingMinimized ? INVENTORY_TRADING_MINIMIZED_HEIGHT : getInventoryTradingHeight(showSilver, showHighlight);
};
