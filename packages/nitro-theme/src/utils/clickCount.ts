/**
 * Which click of a run a press is, the way Flash's `doubleClick` counts it: the window root has
 * `doubleClickEnabled` (`WindowContext`), so a double click is the OS's - the second press within
 * its double-click time and distance, counted when the presses happen, not when they are handled.
 * A mouse press's own `mousedown` `detail` is that count; a press with none (a finger) is timed by
 * its input stamps against `DOUBLE_CLICK_MS`.
 */
import type { FederatedPointerEvent } from 'pixi.js';

/** The longest gap between two clicks that makes them a double click (the Windows default Flash Player follows). */
export const DOUBLE_CLICK_MS = 500;

/** The latest press's count: timed by its stamp at `pointerdown`, the OS's own once its `mousedown` comes. */
let pressCount = 0;
let lastPressStamp = -Infinity;
/** Waiting for the latest mouse press's `mousedown`, which the browser sends right after its `pointerdown`. */
let pending: ((count: number) => void) | null = null;

if (typeof window !== 'undefined') {
    window.addEventListener('pointerdown', (event) => {
        pressCount = ((event.timeStamp - lastPressStamp) <= DOUBLE_CLICK_MS) ? (pressCount + 1) : 1;
        lastPressStamp = event.timeStamp;
        pending = null;
    }, true);
    window.addEventListener('mousedown', (event) => {
        if (event.detail > 0) pressCount = event.detail;

        const counted = pending;

        pending = null;
        counted?.(pressCount);
    }, true);
    // A `pointerdown` whose default was prevented gets no `mousedown`: its timed count stands.
    window.addEventListener('pointerdown', (event) => {
        if (!event.defaultPrevented) return;

        const counted = pending;

        pending = null;
        counted?.(pressCount);
    });
}

/** Whether the click being released (a tap) is the second of a pair in its run, Flash's `WME_DOUBLE_CLICK`. */
export const isDoubleClick = (): boolean => ((pressCount % 2) === 0);

/**
 * A press's count, handed to `counted` once it is known: a mouse press's `mousedown` follows its
 * `pointerdown`, so a `pointerdown` handler hears it just after it returns; any other press at once.
 */
export const whenPressCounted = (event: FederatedPointerEvent, counted: (count: number) => void): void => {
    if (event.pointerType === 'mouse') pending = counted;
    else counted(pressCount);
};
