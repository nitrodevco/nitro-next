import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box, BoxLayout } from './Box';
import { ScrollbarSliderBarHorizontal } from './ScrollbarSliderBarHorizontal';
import { ScrollbarSliderButtonLeft } from './ScrollbarSliderButtonLeft';
import { ScrollbarSliderButtonRight } from './ScrollbarSliderButtonRight';
import { ScrollbarSliderTrackHorizontal } from './ScrollbarSliderTrackHorizontal';
import { useHoldToRepeat } from './utils/useHoldToRepeat';
import { useResolvedVariant } from './utils/useResolvedVariant';

/**
 * Props-driven skin - see ScrollbarVertical.tsx's docblock for why this deliberately does not
 * call `useScrollController` itself (the caller owns the single controller instance and passes
 * its computed pieces down as plain props instead of `RefObject`s).
 */
export interface ScrollbarHorizontalProps {
    trackRef: (node: PixiContainer | null) => void;
    /** Accepted for prop-shape parity with `useScrollController`'s return value - unused here,
     *  same as DOM's ScrollbarHorizontal never reading `controller.scrollOffset` itself. */
    scrollOffset?: number;
    thumbSize: number;
    thumbOffset: number;
    /** Unlike ScrollbarVertical.tsx (whose DOM source has its aria-disabled wiring commented
     *  out entirely), DOM's ScrollbarHorizontal actively sets
     *  `aria-disabled={!controller.scrollable || controller.atStart}`/`atEnd` on its buttons -
     *  preserved here as a real asymmetry between the two orientations, not "fixed" to match. */
    atStart: boolean;
    atEnd: boolean;
    scrollable: boolean;
    onTrackPointerDown: (event: FederatedPointerEvent) => void;
    onThumbPointerDown: (event: FederatedPointerEvent) => void;
    stepBackward: () => void;
    stepForward: () => void;
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
}

export const ScrollbarHorizontal: ForwardRefExoticComponent<ScrollbarHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarHorizontalProps>(
    (
        { trackRef, thumbSize, thumbOffset, atStart, atEnd, scrollable, onTrackPointerDown, onThumbPointerDown, stepBackward, stepForward, variant, defaultVariant, tintColor, layout },
        ref,
    ) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('scrollbarHorizontal', variant, defaultVariant);

        const holdLeft = useHoldToRepeat(stepBackward);
        const holdRight = useHoldToRepeat(stepForward);

        // DOM's ScrollbarHorizontal also handles ArrowLeft/ArrowRight keydown on the thumb to
        // step scroll position - dropped for the same reason noted in ScrollbarVertical.tsx
        // (Pixi containers aren't natively keyboard-focusable).

        // DOM's `invisible w-0! pointer-events-none` collapse when `!controller.scrollable`.
        if (!scrollable) return null;

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', alignItems: 'stretch', ...layout }}
            >
                <VariantCascadeProvider map={ownCascade}>
                    <ScrollbarSliderButtonLeft
                        defaultVariant={resolvedVariant}
                        disabled={atStart}
                        layout={{ flexShrink: 0 }}
                        onPointerDown={holdLeft.onPointerDown}
                        onPointerUp={holdLeft.onPointerUp}
                        onPointerUpOutside={holdLeft.onPointerUpOutside}
                    />
                    <ScrollbarSliderTrackHorizontal
                        ref={node => trackRef(node)}
                        defaultVariant={resolvedVariant}
                        onPointerDown={onTrackPointerDown}
                    >
                        <ScrollbarSliderBarHorizontal
                            defaultVariant={resolvedVariant}
                            tintColor={tintColor}
                            layout={{ top: 0, height: '100%', left: thumbOffset, width: thumbSize }}
                            onPointerDown={onThumbPointerDown}
                        />
                    </ScrollbarSliderTrackHorizontal>
                    <ScrollbarSliderButtonRight
                        defaultVariant={resolvedVariant}
                        disabled={atEnd}
                        layout={{ flexShrink: 0 }}
                        onPointerDown={holdRight.onPointerDown}
                        onPointerUp={holdRight.onPointerUp}
                        onPointerUpOutside={holdRight.onPointerUpOutside}
                    />
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ScrollbarHorizontal.displayName = 'ScrollbarHorizontal';
