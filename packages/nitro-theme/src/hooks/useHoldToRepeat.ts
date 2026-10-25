import { useEffect, useRef } from 'react';

import { useLatest } from './useLatest';

const HOLD_INITIAL_DELAY_MS = 400;
const HOLD_REPEAT_INTERVAL_MS = 60;

/**
 * Press-and-hold repeat for a scrollbar arrow: `callback` once on the press, then every
 * `HOLD_REPEAT_INTERVAL_MS` after `HOLD_INITIAL_DELAY_MS` until the release. Pixi's
 * `pointerupoutside` ends a hold whose pointer drifted off the arrow, so no window-level listener
 * is needed, unlike `useFrameDrag` / `useFrameResize`.
 */
export const useHoldToRepeat = (callback: () => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const callbackRef = useLatest(callback);

    const stop = () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    };

    useEffect(() => stop, []);

    const onPointerDown = () => {
        callbackRef.current();
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => callbackRef.current(), HOLD_REPEAT_INTERVAL_MS);
        }, HOLD_INITIAL_DELAY_MS);
    };

    return { onPointerDown, onPointerUp: stop, onPointerUpOutside: stop };
};
