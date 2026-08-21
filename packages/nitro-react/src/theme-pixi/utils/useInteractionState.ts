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

/** A per-state art table, as wide or narrow as a given component's variant actually needs -
 *  every field but `default` is optional, since most components don't define art for every
 *  possible state (e.g. Tab components have no `disabled` art, Button has no `selected`). */
export interface InteractionStates<T> {
    default: T;
    hovering?: T;
    pressed?: T;
    disabled?: T;
    /** Not a real `InteractionState` value - a caller-controlled flag (DOM's `aria-selected`)
     *  layered on top of pointer state, used by toggle-like chrome (Tab*, ButtonGroup*). */
    selected?: T;
}

/**
 * Resolves which per-state art a component should render, replacing the near-identical
 * `resolveLayerState`/`resolveTabChromeLayer` functions duplicated across Button.tsx,
 * ContainerButton.tsx, buttonGroupFactory.tsx and tabButtonChrome.tsx (same priority order in
 * all four: disabled beats everything, a caller-selected/actively-pressed state beats hover,
 * hover beats default) - each just used a different subset of `InteractionStates`' optional
 * fields. `selected` mirrors DOM's `aria-selected:` modifier, which every one of those four
 * components resolves identically: "selected OR currently pressed" (an in-progress press previews
 * the selected art, matching DOM's `active:` rule pointing at the same background-image as
 * `aria-selected:` in every real usage found).
 */
export const resolveByState = <T,>(states: InteractionStates<T>, state: InteractionState, selected?: boolean): T => {
    if (state === 'disabled' && states.disabled !== undefined) return states.disabled;
    if ((selected || state === 'pressed') && states.selected !== undefined) return states.selected;
    if (state === 'pressed' && states.pressed !== undefined) return states.pressed;
    if (state === 'hovering' && states.hovering !== undefined) return states.hovering;

    return states.default;
};

/**
 * A single nine-slice texture's geometry, with no `kind` tag - the shape every per-state
 * button/chrome variant table (Button, ContainerButton, ButtonThick's nine-slice states,
 * buttonGroupFactory, tabButtonChrome) resolves down to before handing it straight to
 * `NineSliceLayer`'s matching props. Pulled out once so those four+ variant tables share one
 * type/constructor instead of each redeclaring the identical `{textureKey, leftWidth,
 * topHeight, rightWidth, bottomHeight}` shape under its own name.
 */
export interface NineSliceLayerState {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

export const nineSliceLayerState = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): NineSliceLayerState => (
    { textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);
