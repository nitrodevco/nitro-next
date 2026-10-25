/**
 * A drag that follows the pressed pointer anywhere on the page - Flash's `WME_UP_OUTSIDE` made the
 * window's mouse events keep coming once the pointer left the control - on window-level pointer
 * events: the frames' drag and resize, the scrollbars, a drag target, and the client's slider knobs,
 * floor plan bars, chat history pull and scaled overlays.
 *
 * Only the pointer that started the drag moves or ends it, `pointercancel` ends it as a release
 * does, starting another drag stops the one under way, and the listeners go with the component, so
 * one that unmounts mid-drag leaves nothing behind calling into it.
 */
import { useCallback, useEffect, useRef } from 'react';

export interface WindowPointerDragHandlers {
    /** Each move of the pressed pointer. */
    onMove: (event: PointerEvent) => void;
    /** The pointer was let go or cancelled - not when the drag is stopped (`stop`) or the component goes. */
    onEnd?: (event: PointerEvent) => void;
}

export const useWindowPointerDrag = () => {
    const removeRef = useRef<(() => void) | null>(null);

    /** Ends the drag under way, if any, without `onEnd`. */
    const stop = useCallback(() => {
        const remove = removeRef.current;

        removeRef.current = null;
        remove?.();
    }, []);

    useEffect(() => stop, [ stop ]);

    /** Follows `pointerId` (the press's `event.pointerId`) until it is let go. */
    const start = useCallback((pointerId: number, handlers: WindowPointerDragHandlers) => {
        stop();

        const move = (event: PointerEvent) => {
            if (event.pointerId === pointerId) handlers.onMove(event);
        };

        const end = (event: PointerEvent) => {
            if (event.pointerId !== pointerId) return;

            stop();
            handlers.onEnd?.(event);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);

        removeRef.current = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', end);
            window.removeEventListener('pointercancel', end);
        };
    }, [ stop ]);

    return { start, stop };
};
