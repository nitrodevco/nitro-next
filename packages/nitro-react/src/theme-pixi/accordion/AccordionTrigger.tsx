import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from '../Box';
import { useAccordion, useAccordionItem } from './AccordionContext';

interface AccordionTriggerProps {
    layout?: BoxLayout;
    /** Optional passthrough for a caller's own hover tracking (e.g. FriendListTab.tsx's
     *  footer-tooltip text) - DOM spreads these alongside its own onClick as plain extra div
     *  props; Pixi's Box only takes one `onPointerOver`/`onPointerOut` pair, so they're
     *  threaded through explicitly rather than silently dropped. */
    onPointerOver?: () => void;
    onPointerOut?: () => void;
    children?: ReactNode | ((state: { isOpen: boolean }) => ReactNode);
}

/**
 * Pixi port of theme/AccordionTrigger.tsx. DOM is an unstyled `<div role="button">` - no
 * variants, no cva, no classes beyond a conditional `cursor-pointer` and whatever className
 * the caller supplies (`layout` here). DOM also plumbs an optional caller `onClick`/
 * `onKeyDown` through a defaultPrevented guard before toggling, but no real call site in this
 * codebase passes either (both known call sites only pass className/children), so that
 * passthrough is dropped here in favor of this package's plain onPress-style convention (see
 * ContainerButton.tsx) - toggle() fires directly off the tap.
 *
 * When `alwaysOpen` is set, DOM strips `role`/`tabIndex`/`aria-expanded`/`cursor-pointer` but
 * still technically wires up (now-inert, since Accordion's own toggle no-ops) click/keyboard
 * handlers. Here that's modeled as `eventMode="none"`, which is strictly more correct for
 * Pixi: it also stops the trigger from swallowing pointer events meant for something beneath
 * it, which DOM's div can't do short of `pointer-events: none` (which DOM never sets either).
 *
 * The render-prop form (`children` as a function of `{isOpen}`, used by real call sites to
 * swap an arrow icon) is preserved verbatim. Neither branch needs an explicit
 * `wrapTextChildren` call: `content` (whichever form) is passed straight through as Box's own
 * JSX children with no intermediate host-less wrapper in between, and Box already runs
 * `wrapTextChildren` on its own children internally (see Box.tsx) - the same reason Bubble.tsx
 * and Header.tsx don't call it themselves for their own directly-passed children either.
 */
export const AccordionTrigger: ForwardRefExoticComponent<AccordionTriggerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, AccordionTriggerProps>(
    ({ layout, onPointerOver, onPointerOut, children }, ref) => {
        const { alwaysOpen } = useAccordion();
        const { isOpen, toggle } = useAccordionItem();

        const content = typeof children === 'function' ? children({ isOpen }) : children;

        return (
            <Box
                ref={ref}
                layout={layout}
                eventMode={alwaysOpen ? 'none' : 'static'}
                cursor={alwaysOpen ? undefined : 'pointer'}
                onPointerTap={alwaysOpen ? undefined : toggle}
                onPointerOver={alwaysOpen ? undefined : onPointerOver}
                onPointerOut={alwaysOpen ? undefined : onPointerOut}
            >
                {content}
            </Box>
        );
    },
);

AccordionTrigger.displayName = 'AccordionTrigger';
