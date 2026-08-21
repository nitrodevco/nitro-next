import { useMemo, useState } from 'react';

export type InteractionState = 'default' | 'hovering' | 'pressed' | 'disabled';

export interface InteractionHandlers {
    eventMode: 'static' | 'none';
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerUpOutside?: () => void;
}

/**
 * Generic default/hovering/pressed/disabled state machine driven by Pixi pointer events,
 * replacing the hover:/active:/aria-disabled: Tailwind pseudo-class art-swapping the DOM
 * theme components rely on (Pixi has no CSS pseudo-classes).
 */
export const useInteractionState = (disabled?: boolean): { state: InteractionState, handlers: InteractionHandlers } => {
    const [state, setState] = useState<InteractionState>('default');

    const handlers = useMemo<InteractionHandlers>(() => {
        if (disabled) return { eventMode: 'none' };

        return {
            eventMode: 'static',
            onPointerOver: () => setState('hovering'),
            onPointerOut: () => setState('default'),
            onPointerDown: () => setState('pressed'),
            onPointerUp: () => setState('hovering'),
            onPointerUpOutside: () => setState('default'),
        };
    }, [disabled]);

    return { state: disabled ? 'disabled' : state, handlers };
};
