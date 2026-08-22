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

export interface InteractionStates<T> {
    default: T;
    hovering?: T;
    pressed?: T;
    disabled?: T;
    selected?: T;
}

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

export const resolveByState = <T,>(states: InteractionStates<T>, state: InteractionState, selected?: boolean): T => {
    if (state === 'disabled' && states.disabled !== undefined) return states.disabled;
    if ((selected || state === 'pressed') && states.selected !== undefined) return states.selected;
    if (state === 'pressed' && states.pressed !== undefined) return states.pressed;
    if (state === 'hovering' && states.hovering !== undefined) return states.hovering;

    return states.default;
};
