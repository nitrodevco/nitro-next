import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useHoldToRepeat, useResolvedVariant } from './hooks';
import { ScrollbarSliderBarHorizontal } from './ScrollbarSliderBarHorizontal';
import { ScrollbarSliderButtonLeft } from './ScrollbarSliderButtonLeft';
import { ScrollbarSliderButtonRight } from './ScrollbarSliderButtonRight';
import { ScrollbarSliderTrackHorizontal } from './ScrollbarSliderTrackHorizontal';

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
    scrollable: boolean;
    onTrackPointerDown: (event: FederatedPointerEvent) => void;
    onThumbPointerDown: (event: FederatedPointerEvent) => void;
    stepBackward: () => void;
    stepForward: () => void;
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    /**
     * What happens once the content fits. `true` (the default) removes the scrollbar, as
     * `ScrollableItemListWindow` / `ScrollableItemGridWindow` hide theirs. `false` keeps it, the
     * way a layout's own `scrollbar_*` window stays: `ScrollBarController.updateLiftSizeAndPosition`
     * disables it and every `_INTERNAL` part, so the buttons, the track and the lift - grown to
     * the whole track - draw their `disabled` art and take no input.
     */
    hideWhenDisabled?: boolean;
    layout?: BoxLayout;
}

export const ScrollbarHorizontal: ForwardRefExoticComponent<ScrollbarHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarHorizontalProps>(
    (
        { trackRef, thumbSize, thumbOffset, scrollable, onTrackPointerDown, onThumbPointerDown, stepBackward, stepForward, variant, defaultVariant, tintColor, hideWhenDisabled = true, layout },
        ref,
    ) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('scrollbarHorizontal', variant, defaultVariant);

        const holdLeft = useHoldToRepeat(stepBackward);
        const holdRight = useHoldToRepeat(stepForward);

        // DOM's ScrollbarHorizontal also handles ArrowLeft/ArrowRight keydown on the thumb to
        // step scroll position - dropped for the same reason noted in ScrollbarVertical.tsx
        // (Pixi containers aren't natively keyboard-focusable).

        const disabled = !scrollable;

        if (disabled && hideWhenDisabled) return null;

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', alignItems: 'stretch', ...layout }}
            >
                <VariantCascadeProvider map={ownCascade}>
                    <ScrollbarSliderButtonLeft
                        defaultVariant={resolvedVariant}
                        disabled={disabled}
                        layout={{ flexShrink: 0 }}
                        onPointerDown={holdLeft.onPointerDown}
                        onPointerUp={holdLeft.onPointerUp}
                        onPointerUpOutside={holdLeft.onPointerUpOutside}
                    />
                    <ScrollbarSliderTrackHorizontal
                        ref={node => trackRef(node)}
                        defaultVariant={resolvedVariant}
                        disabled={disabled}
                        onPointerDown={onTrackPointerDown}
                    >
                        {/* See ScrollbarVertical.tsx's identical guard - `thumbSize` can briefly
                            read 0 on the first measure tick after becoming scrollable, and
                            mounting the thumb's `NineSliceSprite` at zero size leaves it
                            permanently invisible once resized on the next tick. */}
                        {disabled && (
                            <ScrollbarSliderBarHorizontal
                                defaultVariant={resolvedVariant}
                                tintColor={tintColor}
                                disabled
                                layout={{ top: 0, height: '100%', left: 0, width: '100%' }}
                            />
                        )}
                        {!disabled && thumbSize > 0 && (
                            <ScrollbarSliderBarHorizontal
                                defaultVariant={resolvedVariant}
                                tintColor={tintColor}
                                layout={{ top: 0, height: '100%', left: thumbOffset, width: thumbSize }}
                                onPointerDown={onThumbPointerDown}
                            />
                        )}
                    </ScrollbarSliderTrackHorizontal>
                    <ScrollbarSliderButtonRight
                        defaultVariant={resolvedVariant}
                        disabled={disabled}
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
