/**
 * The two timers `ItemPopupCtrl` runs a hover through - `showDelayed` waits a moment before the
 * popup appears, `hideDelayed` waits a shorter moment before it goes - so dragging the pointer
 * across the nine trade slots does not flash a popup for each one it crosses.
 *
 * The hook keeps whichever slot is showing and its rectangle in screen space; the view turns that
 * into the popup's placement.
 */
import { Container as PixiContainer } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getGlobalRect } from '#base/theme';

import { InventoryTradingItemPopupAnchor } from './InventoryTradingItemPopup';

/** `ItemPopupCtrl`'s display and hide timers. */
const SHOW_DELAY_MS = 250;
const HIDE_DELAY_MS = 100;

/** Which slot the popup is showing for, and where that slot is. */
export interface InventoryTradingItemPopupTarget<T> {
    item: T;
    anchor: InventoryTradingItemPopupAnchor;
}

export const useInventoryTradingItemPopup = <T>() => {
    const [ target, setTarget ] = useState<InventoryTradingItemPopupTarget<T> | undefined>(undefined);
    const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const clearTimers = useCallback(() => {
        if (showTimer.current !== undefined) clearTimeout(showTimer.current);

        if (hideTimer.current !== undefined) clearTimeout(hideTimer.current);

        showTimer.current = undefined;
        hideTimer.current = undefined;
    }, []);

    /** `showDelayed`: the node is measured when the timer fires, so a scrolled slot reports where it now is. */
    const showDelayed = useCallback((item: T, node: PixiContainer | null) => {
        clearTimers();

        if (!node) return;

        showTimer.current = setTimeout(() => {
            showTimer.current = undefined;
            setTarget({ item, anchor: getGlobalRect(node) });
        }, SHOW_DELAY_MS);
    }, [ clearTimers ]);

    /** `hideDelayed`. */
    const hideDelayed = useCallback(() => {
        clearTimers();

        hideTimer.current = setTimeout(() => {
            hideTimer.current = undefined;
            setTarget(undefined);
        }, HIDE_DELAY_MS);
    }, [ clearTimers ]);

    /** `hide`: straight away, with no timer left running. */
    const hide = useCallback(() => {
        clearTimers();
        setTarget(undefined);
    }, [ clearTimers ]);

    useEffect(() => clearTimers, [ clearTimers ]);

    return { target, showDelayed, hideDelayed, hide };
};
