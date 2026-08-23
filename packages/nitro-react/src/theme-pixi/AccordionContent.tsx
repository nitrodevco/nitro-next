import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, Fragment, type ReactNode, type RefAttributes } from 'react';

import { useAccordionItem } from './AccordionContext';
import { Box, type BoxLayout } from './Box';

interface AccordionContentProps {
    layout?: BoxLayout;
    unwrapped?: boolean;
    children?: ReactNode;
}

/**
 * Pixi port of theme/AccordionContent.tsx. Confirmed (per prior research on this exact
 * codebase): DOM has zero open/close animation - `if (!isOpen) return null` is a hard
 * conditional mount/unmount, no CSS transition, no Motion/Framer anywhere in it or its call
 * sites - so the instant show/hide below is exact parity, not a corner cut. `unwrapped`
 * mirrors DOM exactly: skip the wrapping element and render `children` directly when open,
 * same as Accordion's own `unwrapped` prop (Accordion.tsx) skips its wrapping element.
 *
 * DOM's `data-state="open"` attribute has no Pixi equivalent - it exists purely so external
 * CSS can target the open state via a selector, which doesn't apply to a Pixi scene graph
 * (and the conditional mount itself already fully encodes "open" - there's nothing left for a
 * sibling data attribute to convey). Dropped rather than ported, the same way other
 * theme-pixi components drop DOM-only bookkeeping attributes (e.g. CheckBox.tsx not
 * replicating `aria-selected`).
 */
export const AccordionContent: ForwardRefExoticComponent<AccordionContentProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, AccordionContentProps>(
    ({ layout, unwrapped, children }, ref) => {
        const { isOpen } = useAccordionItem();

        if (!isOpen) return null;

        if (unwrapped) return <Fragment>{children}</Fragment>;

        return (
            <Box
                ref={ref}
                layout={layout}
            >
                {children}
            </Box>
        );
    },
);

AccordionContent.displayName = 'AccordionContent';
