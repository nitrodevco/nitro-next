import {  PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react';

const HOLD_INITIAL_DELAY_MS = 400;
const HOLD_REPEAT_INTERVAL_MS = 60;

export const useHoldToRepeat = (callback: () => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
    const callbackRef = useRef(callback);

    const stop = () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    };

    useEffect(() => stop, [ stop ]);

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        callbackRef.current();
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => callbackRef.current(), HOLD_REPEAT_INTERVAL_MS);
        }, HOLD_INITIAL_DELAY_MS);
    };

    const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        stop();
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    };

    return { onPointerDown, onPointerUp };
};
