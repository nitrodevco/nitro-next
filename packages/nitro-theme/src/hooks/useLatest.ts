import { RefObject, useLayoutEffect, useRef } from 'react';

/**
 * A ref that holds the value of the last committed render, for a listener registered once (a room
 * event, a ticker, a Pixi or window event) to call the latest handler or read the latest props
 * through. A caller may write a value ahead of the render that will commit it (a keystroke the next
 * key must already see); the commit then writes the same value again.
 *
 * Written in a layout effect, not a passive one: those run after the browser may already have
 * drawn a frame, so a ticker or room frame landing between a commit and its passive effects called
 * the previous render's handler - a bubble placed over the object it was showing before.
 */
export const useLatest = <T>(value: T): RefObject<T> => {
    const ref = useRef(value);

    useLayoutEffect(() => {
        ref.current = value;
    });

    return ref;
};
