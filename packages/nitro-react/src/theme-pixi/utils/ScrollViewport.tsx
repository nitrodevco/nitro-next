import './pixiElements';

import type { Container as PixiContainer, FederatedWheelEvent, Graphics as PixiGraphics } from 'pixi.js';
import { type ReactNode, useState } from 'react';

import type { BoxLayout } from '../Box';
import type { ScrollOrientation } from './useScrollController';

export interface ScrollViewportProps {
    viewportRef: (node: PixiContainer | null) => void;
    contentRef: (node: PixiContainer | null) => void;
    onWheel: (event: FederatedWheelEvent) => void;
    scrollOffset: number;
    orientation: ScrollOrientation;
    layout?: BoxLayout;
    /** Overrides the content container's own layout - InfiniteGrid needs an explicit
     *  `height`/`width` (its virtualizer's `totalSize`) instead of the default flex-stack,
     *  since its rows are individually `position: 'absolute'` (translated by their own
     *  measured offset) rather than flowing children. */
    contentLayout?: BoxLayout;
    children?: ReactNode;
}

/**
 * The masked, scrollable window `ScrollArea`/`InfiniteGrid` share: a fixed-size viewport
 * clips a content container that's translated by `-scrollOffset` (composed on top of its own
 * layout position, the same technique useFrameDrag.ts's drag offset already relies on).
 * Clipping is a plain Pixi mask (a Graphics rect) rather than @pixi/layout's
 * `overflow: 'hidden'`, which - confirmed by reading @pixi/layout's source - only implements
 * real masking on its own specialized `LayoutContainer`/`layoutContainer` class, not on the
 * plain `pixiContainer` `Box` wraps.
 *
 * The mask must be assigned to the OUTER viewport container using a mask graphics that's its
 * own CHILD, not a sibling of the content being clipped - confirmed by direct experimentation
 * against this exact pixi.js version. `objectA.mask = objectB` where A and B are siblings
 * under a shared parent fails silently (the masked object renders fully invisible) and logs
 * "PixiJS Warning: Mask bounds, renderable is not inside the root container" - pixi.js's
 * `addMaskLocalBounds` walks the mask's own `.parent` chain expecting to reach the masked
 * object itself, which a sibling relationship never satisfies. `container.mask =
 * childOfThatSameContainer` (the standard Pixi idiom) is what works. The mask sizes itself via
 * the same fill-stretch `layout` every other background layer in this package uses (see
 * utils/Layer.tsx's `FILL_LAYOUT` for why the explicit `width`/`height: '100%'` there aren't
 * redundant with the `0` insets) - masking doesn't change that, so no special-cased pixel
 * measurement is needed here either.
 *
 * `alignItems: 'flex-start'` on the outer container is load-bearing, not decorative: without
 * it, Yoga's default `alignItems: 'stretch'` cross-axis-stretches the content container (a
 * normal-flow flex item here, unaffected by its own `position: 'relative'`) to exactly match
 * the viewport's own size on whichever axis isn't the scroll direction's main axis - which,
 * since this outer container never sets its own `flexDirection` (defaulting to Yoga's 'row'),
 * is the HEIGHT for a vertical scroller. That silently clamps the content container's measured
 * height to the viewport's height regardless of how much taller its children actually are,
 * making `useScrollController`'s `scrollMax` compute to 0 (confirmed empirically: `scrollable`
 * stayed `false` and the content height measured exactly equal to the viewport height until
 * this was added).
 */
export const ScrollViewport = ({ viewportRef, contentRef, onWheel, scrollOffset, orientation, layout, contentLayout, children }: ScrollViewportProps) => {
    const [maskNode, setMaskNode] = useState<PixiGraphics | null>(null);
    const isVertical = orientation === 'vertical';

    return (
        <pixiContainer
            ref={viewportRef}
            eventMode="static"
            onWheel={onWheel}
            mask={maskNode ?? undefined}
            layout={{ alignItems: 'flex-start', ...layout }}
        >
            <pixiGraphics
                ref={setMaskNode}
                eventMode="none"
                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                draw={g => { g.clear(); g.rect(0, 0, 1, 1).fill(0xFFFFFF); }}
            />
            <pixiContainer
                ref={contentRef}
                x={isVertical ? 0 : -scrollOffset}
                y={isVertical ? -scrollOffset : 0}
                layout={contentLayout ?? {
                    position: 'relative',
                    flexDirection: isVertical ? 'column' : 'row',
                    width: isVertical ? '100%' : undefined,
                    height: isVertical ? undefined : '100%',
                }}
            >
                {children}
            </pixiContainer>
        </pixiContainer>
    );
};
