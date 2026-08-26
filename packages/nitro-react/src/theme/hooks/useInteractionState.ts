import { useMemo, useState } from 'react';

import { compose, hasAnyPointerHandler, PointerHandlerProps } from '../utils/interaction';

export type InteractionState = 'default' | 'hovering' | 'pressed' | 'disabled';

export interface InteractionHandlers extends PointerHandlerProps {
    eventMode?: 'static' | 'none';
}

export interface InteractionStates<T> {
    default: T;
    hovering?: T;
    pressed?: T;
    disabled?: T;
    selected?: T;
}

export interface UseInteractionStateOptions extends PointerHandlerProps {
    disabled?: boolean;
}

/**
 * The single place that turns a themed component's hover/press/disabled *state* into the
 * pointer handlers/eventMode its `<Box>` renders with - composing in whatever pointer handlers
 * the component's own caller already wanted (an `onPress` prop, a drag-start handler, ...) so
 * both fire, instead of every call site hand-merging its own handler with this hook's internal
 * one the way ScrollbarSliderButtonUp.tsx and its three siblings each used to, separately.
 * `onPointerTap` has no internal use here (tapping doesn't drive a hover/press transition) so
 * it passes straight through unchanged.
 *
 * Every field this returns is meant to be spread directly onto a `<Box>`/`ThemeImage`
 * (`{...handlers}`) - callers never need to also pass `eventMode="static"` themselves, since
 * this hook is always the one deciding it (`'static'` while interactive, `'none'` while
 * `disabled`, matching `Box`'s own auto-detection for everything that doesn't go through this
 * hook at all - see `utils/interaction.ts`). With neither a caller handler nor `disabled` set,
 * this returns `{}` rather than fabricating hover/press-tracking closures nothing would ever
 * see - a component with no real interactivity stays `passive`, exactly like a plain `<Box>`.
 */
export const useInteractionState = ({
    disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
}: UseInteractionStateOptions = {}): { state: InteractionState; handlers: InteractionHandlers } => {
    const [ state, setState ] = useState<InteractionState>('default');
    const isInteractive = hasAnyPointerHandler({ onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });

    const handlers = useMemo<InteractionHandlers>(() => {
        if (disabled) return { eventMode: 'none' };
        if (!isInteractive) return {};

        return {
            eventMode: 'static',
            onPointerOver: compose(() => setState('hovering'), onPointerOver),
            onPointerOut: compose(() => setState('default'), onPointerOut),
            onPointerDown: compose(() => setState('pressed'), onPointerDown),
            onPointerUp: compose(() => setState('hovering'), onPointerUp),
            onPointerUpOutside: compose(() => setState('default'), onPointerUpOutside),
            onPointerTap,
        };
    }, [ disabled, isInteractive, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap ]);

    return { state: disabled ? 'disabled' : state, handlers };
};

export const resolveByState = <T>(states: InteractionStates<T>, state: InteractionState, selected?: boolean): T => {
    if (state === 'disabled' && states.disabled !== undefined) return states.disabled;
    if ((selected || state === 'pressed') && states.selected !== undefined) return states.selected;
    if (state === 'pressed' && states.pressed !== undefined) return states.pressed;
    if (state === 'hovering' && states.hovering !== undefined) return states.hovering;

    return states.default;
};
