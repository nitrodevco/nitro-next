/**
 * How a trade slot's hover drives `ItemPopupCtrl` - `TradingView.thumbEventProc`: `WME_OVER` on a
 * filled slot fills the popup and shows it straight away (`updateContent` + `show`), `WME_OUT`
 * starts `hideDelayed`'s short timer, so moving the pointer from one slot to the next swaps the
 * popup rather than closing and reopening it. The trade never uses `showDelayed`.
 *
 * The hook keeps whichever slot is showing and its rectangle in screen space - the popup's
 * `_parent`, which `show` places it beside.
 */
import { Container as PixiContainer } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getGlobalRect } from '#base/theme';

import { InventoryTradingItemPopupAnchor } from './InventoryTradingItemPopup';

/** `ItemPopupCtrl.CLOSE_DELAY_MS`. */
const CLOSE_DELAY_MS = 100;

/** Which slot the popup is showing for, and where that slot is. */
export interface InventoryTradingItemPopupTarget<T> {
    item: T;
    anchor: InventoryTradingItemPopupAnchor;
}

export const useInventoryTradingItemPopup = <T>() => {
    const [ target, setTarget ] = useState<InventoryTradingItemPopupTarget<T> | undefined>(undefined);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const clearTimer = useCallback(() => {
        if (hideTimer.current !== undefined) clearTimeout(hideTimer.current);

        hideTimer.current = undefined;
    }, []);

    /** `updateContent` + `show`: the hide timer reset, the popup beside `node` at once. */
    const show = useCallback((item: T, node: PixiContainer) => {
        clearTimer();
        setTarget({ item, anchor: getGlobalRect(node) });
    }, [ clearTimer ]);

    /** `hideDelayed`. */
    const hideDelayed = useCallback(() => {
        clearTimer();

        hideTimer.current = setTimeout(() => {
            hideTimer.current = undefined;
            setTarget(undefined);
        }, CLOSE_DELAY_MS);
    }, [ clearTimer ]);

    /** `hide`: straight away, with no timer left running. */
    const hide = useCallback(() => {
        clearTimer();
        setTarget(undefined);
    }, [ clearTimer ]);

    useEffect(() => clearTimer, [ clearTimer ]);

    return { target, show, hideDelayed, hide };
};
