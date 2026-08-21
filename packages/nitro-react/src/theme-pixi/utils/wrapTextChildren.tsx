import './pixiElements';

import { Children, type ReactNode } from 'react';

/**
 * Unlike a DOM `<div>`, Pixi's reconciler has no implicit text-node concept - a raw string or
 * number child throws "Text instances are not yet supported" instead of silently rendering.
 * Applied to Box's own `children` so `<Box>{label}</Box>`-style JSX works the way it would in
 * the DOM package. Give text real styling via an explicit `<pixiText style={...}>` when it
 * matters - this is a safety net, not a design choice.
 *
 * Also used directly by components like ContentArea/Border that accept an arbitrary
 * caller-supplied `children` and forward it through a passthrough wrapper
 * (VariantCascadeProvider, which renders a bare Fragment/Context.Provider - no host node of
 * its own) before it reaches a Box. `Children.map` only sees Box's own JSX-authored children,
 * not what a passthrough wrapper renders internally, so a raw string forwarded that way would
 * reach the reconciler unwrapped unless the component receiving it wraps it itself, at the
 * point where it still owns it.
 */
export const wrapTextChildren = (children: ReactNode): ReactNode => Children.map(children, child => {
    if (typeof child !== 'string' && typeof child !== 'number') return child;
    if (typeof child === 'string' && child.trim() === '') return null;

    return <pixiText layout={{}} text={String(child)} />;
});
