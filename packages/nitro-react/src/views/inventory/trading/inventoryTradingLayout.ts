/**
 * How tall the docked trade is - Flash `TradingView.resizeWindow`, which lays the view's four parts
 * out as a column 7px apart (`Util.moveAllChildrenToColumn`) and takes the window's height from the
 * lowest of them (`getLowestPoint`). A part that is hidden closes its gap rather than leaving a
 * hole, which is why the view is a column and not the layout's absolute offsets; with everything
 * showing the column reproduces `inventory_trading_xml` exactly (233 + 7 + 59 + 7 + 28 + 7 + 32).
 *
 * The view and the window both measure from here, so the two can never disagree about how much
 * room the trade takes.
 */
import { isTradingCreditFurniPresent, isWeb3Trading, useInventoryStore } from '#base/context/inventory';
import { useConfigValue } from '#base/context/system';

/** `resizeWindow`: `Util.moveAllChildrenToColumn(window, 7)`. */
export const INVENTORY_TRADING_SECTION_GAP = 7;

/** The layout's own section heights, which the column keeps. */
export const INVENTORY_TRADING_CONTAINER_HEIGHT = 233;
export const INVENTORY_TRADING_SILVER_HEIGHT = 59;
export const INVENTORY_TRADING_HIGHLIGHT_HEIGHT = 28;
export const INVENTORY_TRADING_BUTTONS_HEIGHT = 32;

/** `inventory_trading_xml`'s width - `subContentArea`'s. */
export const INVENTORY_TRADING_WIDTH = 478;

/** `getLowestPoint` over the column: a hidden section costs nothing, not even its gap. */
export const getInventoryTradingHeight = (showSilver: boolean, showHighlight: boolean): number => {
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
    const warningsEnabled = useConfigValue<boolean>('trading.warning.enabled') === true;

    return { showSilver: isWeb3Trading(requiredSilverFee, ownUser, otherUser), showHighlight: warningsEnabled && isTradingCreditFurniPresent(ownUser, otherUser), warningsEnabled };
};

/** `inventory_trading_minimized_xml`'s own height - what the strip takes instead of the dialog. */
export const INVENTORY_TRADING_MINIMIZED_HEIGHT = 68;

/**
 * How much taller the inventory window is while a trade is docked; 0 when none is. A minimised
 * trade is the one-line strip, which is what `getWindowContainer` hands back in its place.
 */
export const useInventoryTradingDockHeight = (): number => {
    const tradingActive = useInventoryStore(x => x.tradingActive);
    const tradingMinimized = useInventoryStore(x => x.tradingMinimized);
    const { showSilver, showHighlight } = useInventoryTradingSections();

    if (!tradingActive) return 0;

    return tradingMinimized ? INVENTORY_TRADING_MINIMIZED_HEIGHT : getInventoryTradingHeight(showSilver, showHighlight);
};
