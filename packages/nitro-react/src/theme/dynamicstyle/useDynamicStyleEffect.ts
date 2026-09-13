import { useContext, useMemo } from 'react';

import { InteractionState } from '../hooks/useInteractionState';
import { DynamicStyleEffect, dynamicStyleEffect, DynamicStyleName, DynamicStyleRole, resolveDynamicStyleRule } from '../utils/dynamicStyles';
import { DynamicStyleContext } from './DynamicStyleContext';

/** The host's own rule for its current state - `undefined` when the component names no style. */
export const useHostDynamicStyleEffect = (name: DynamicStyleName | undefined, state: InteractionState): DynamicStyleEffect | undefined =>
    useMemo(() => (name ? dynamicStyleEffect(resolveDynamicStyleRule(name, undefined, state)) : undefined), [ name, state ]);

/** A tagged child's rule for the nearest host's state - `undefined` outside a host, or without a role. */
export const useDynamicStyleEffect = (role: DynamicStyleRole | undefined): DynamicStyleEffect | undefined => {
    const host = useContext(DynamicStyleContext);
    const name = host?.name;
    const state = host?.state ?? 'default';

    return useMemo(() => ((name && role) ? dynamicStyleEffect(resolveDynamicStyleRule(name, role, state)) : undefined), [ name, role, state ]);
};

/**
 * The props an effect puts on a `Box`/sprite: the position nudge (Pixi adds the container's own
 * position on top of the layout's, DOM translates), the alpha and the multiply tint. Only
 * defined fields are included so a container without an effect keeps its defaults.
 */
export const dynamicStyleBoxProps = (effect: DynamicStyleEffect | undefined, alpha?: number): { x?: number; y?: number; alpha?: number; tint?: string } => {
    const props: { x?: number; y?: number; alpha?: number; tint?: string } = {};

    if (effect) {
        props.x = effect.x;
        props.y = effect.y;

        if (effect.tint) props.tint = effect.tint;
    }

    const resolvedAlpha = (alpha === undefined) ? effect?.alpha : (alpha * (effect?.alpha ?? 1));

    if (resolvedAlpha !== undefined) props.alpha = resolvedAlpha;

    return props;
};
