import { CSSProperties, PointerEventHandler } from 'react';

import { InteractionHandlers } from '../utils/useInteractionState';

export interface DomInteractionHandlers {
    style: Pick<CSSProperties, 'pointerEvents' | 'cursor'>;
    onPointerEnter?: PointerEventHandler;
    onPointerLeave?: PointerEventHandler;
    onPointerDown?: PointerEventHandler;
    onPointerUp?: PointerEventHandler;
}

/**
 * Adapts `useInteractionState`'s Pixi-flavored `handlers` (`onPointerOver`/`onPointerOut`/
 * `onPointerDown`/`onPointerUp`/`onPointerUpOutside`, `eventMode`) to their DOM pointer-event
 * equivalents. `onPointerUpOutside` has no direct DOM counterpart (Pixi's own stricter
 * "released while still over the object" semantics) - `useInteractionState`'s state machine
 * only reads it to fall the visual state back to `'default'` on a release elsewhere, which a
 * plain `onPointerLeave`-while-pressed case doesn't need special handling for here: the DOM
 * target already stops receiving `pointerup` once the pointer leaves it (no capture is set),
 * so `onPointerUp` simply never fires for that case - the same end state (not stuck
 * `'pressed'`) without needing a dedicated handler.
 */
export const toDomHandlers = (handlers: InteractionHandlers, cursor?: string): DomInteractionHandlers => {
    if (handlers.eventMode === 'none') {
        return { style: { pointerEvents: 'none' } };
    }

    return {
        style: { pointerEvents: 'auto', cursor: cursor ?? 'pointer' },
        onPointerEnter: handlers.onPointerOver,
        onPointerLeave: handlers.onPointerOut,
        onPointerDown: handlers.onPointerDown,
        onPointerUp: handlers.onPointerUp,
    };
};
