import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useHoldToRepeat, useResolvedVariant } from './hooks';
import { ScrollbarSliderBarVertical } from './ScrollbarSliderBarVertical';
import { ScrollbarSliderButtonDown } from './ScrollbarSliderButtonDown';
import { ScrollbarSliderButtonUp } from './ScrollbarSliderButtonUp';
import { ScrollbarSliderTrackVertical } from './ScrollbarSliderTrackVertical';

/**
 * Props-driven skin, deliberately NOT calling `useScrollController` itself. DOM's
 * ScrollbarVertical takes `viewportRef`/`contentRef` as `RefObject`s that its caller already
 * populated by rendering the real scrollable viewport elsewhere - multiple readers can share
 * one `RefObject.current`. Pixi has no equivalent: a container only becomes available via a
 * callback ref fired once at mount, so if this component called its own
 * `useScrollController` AND its caller (ScrollArea, InfiniteGrid) also needed one for the
 * actual masked/scrolled content, the two instances would hold independent, silently
 * diverging copies of `scrollOffset`/`thumbSize`/etc. Instead the caller owns the single
 * `useScrollController` instance and passes its already-computed pieces down as plain props;
 * this component only still owns `useHoldToRepeat` (UI behavior local to the two buttons, not
 * shared scroll state) and forwards `trackRef` to its own `ScrollbarSliderTrackVertical`.
 */
export interface ScrollbarVerticalProps {
    trackRef: (node: PixiContainer | null) => void;
    /** Accepted for prop-shape parity with `useScrollController`'s return value (so callers
     *  can spread the controller object wholesale) - unused here, same as DOM's
     *  ScrollbarVertical never reading `controller.scrollOffset` itself either. */
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
    layout?: BoxLayout;
}

export const ScrollbarVertical: ForwardRefExoticComponent<ScrollbarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarVerticalProps>(
    (
        { trackRef, thumbSize, thumbOffset, scrollable, onTrackPointerDown, onThumbPointerDown, stepBackward, stepForward, variant, defaultVariant, tintColor, layout },
        ref,
    ) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('scrollbarVertical', variant, defaultVariant);

        const holdUp = useHoldToRepeat(stepBackward);
        const holdDown = useHoldToRepeat(stepForward);

        // DOM's ScrollbarVertical also handles ArrowUp/ArrowDown keydown on the thumb to step
        // scroll position (and, separately, has its aria-disabled wiring on the buttons
        // commented out entirely - both buttons here are never disabled, matching that). Pixi
        // containers aren't natively keyboard-focusable/navigable the way an HTML div with
        // tabIndex is, so there's no Pixi event to hook the keyboard-stepping behavior to -
        // intentionally dropped rather than silently omitted.

        // DOM's `invisible w-0! pointer-events-none` collapse when `!controller.scrollable` -
        // not rendering the subtree at all is the Pixi equivalent of zero width + fully
        // non-interactive, and simpler than threading a zero-size layout through every child.
        if (!scrollable) return null;

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'column', alignItems: 'stretch', ...layout }}
            >
                <VariantCascadeProvider map={ownCascade}>
                    <ScrollbarSliderButtonUp
                        defaultVariant={resolvedVariant}
                        layout={{ flexShrink: 0 }}
                        onPointerDown={holdUp.onPointerDown}
                        onPointerUp={holdUp.onPointerUp}
                        onPointerUpOutside={holdUp.onPointerUpOutside}
                    />
                    <ScrollbarSliderTrackVertical
                        ref={node => trackRef(node)}
                        defaultVariant={resolvedVariant}
                        onPointerDown={onTrackPointerDown}
                    >
                        {/* `thumbSize` can briefly read 0 on the very first measure tick after
                            becoming scrollable - the track's own yoga layout (which `thumbSize`
                            is computed against) settles a tick after the viewport/content sizes
                            that make `scrollable` true. Skipping that one degenerate render
                            avoids ever mounting the thumb's `NineSliceSprite` at zero size -
                            confirmed directly, one that starts at zero size never recovers once
                            resized on the following tick, unlike one that simply mounts fresh
                            once a real size is already known. */}
                        {thumbSize > 0 && (
                            <ScrollbarSliderBarVertical
                                defaultVariant={resolvedVariant}
                                tintColor={tintColor}
                                layout={{ left: 0, width: '100%', top: thumbOffset, height: thumbSize }}
                                onPointerDown={onThumbPointerDown}
                            />
                        )}
                    </ScrollbarSliderTrackVertical>
                    <ScrollbarSliderButtonDown
                        defaultVariant={resolvedVariant}
                        layout={{ flexShrink: 0 }}
                        onPointerDown={holdDown.onPointerDown}
                        onPointerUp={holdDown.onPointerUp}
                        onPointerUpOutside={holdDown.onPointerUpOutside}
                    />
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ScrollbarVertical.displayName = 'ScrollbarVertical';
