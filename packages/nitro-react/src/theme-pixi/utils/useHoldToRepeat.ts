import { useEffect, useRef } from 'react';

const HOLD_INITIAL_DELAY_MS = 400;
const HOLD_REPEAT_INTERVAL_MS = 60;

/**
 * Pixi port of hooks/ui/useHoldToRepeat.ts. DOM's version uses `setPointerCapture` purely so
 * `pointerup` still fires if the pointer drifts off the button while held - Pixi's
 * FederatedPointerEvent has no such capture API (confirmed absent from pixi.js's event types),
 * but Pixi's `pointerupoutside` event (already used by useInteractionState.ts elsewhere in
 * this package) covers the exact same case natively, so no window-level listeners are needed
 * here at all, unlike useFrameDrag.ts/useFrameResize.ts's drag gestures.
 */
export const useHoldToRepeat = (callback: () => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

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
