import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useHoldToRepeat } from './hooks/useHoldToRepeat';
import { useResolvedVariant } from './hooks/useResolvedVariant';
import { ScrollbarPartProps, ScrollbarTrackProps } from './scrollbarParts';

/**
 * Props-driven skin, deliberately NOT calling `useScrollController` itself. DOM's scrollbars took
 * `viewportRef`/`contentRef` as `RefObject`s that their caller already populated by rendering the
 * real scrollable viewport elsewhere - multiple readers can share one `RefObject.current`. Pixi has
 * no equivalent: a container only becomes available via a callback ref fired once at mount, so if
 * this component called its own `useScrollController` AND its caller (ScrollArea, InfiniteGrid)
 * also needed one for the actual masked/scrolled content, the two instances would hold
 * independent, silently diverging copies of `scrollOffset`/`thumbSize`/etc. Instead the caller
 * owns the single `useScrollController` instance and passes its already-computed pieces down as
 * plain props; this component only still owns `useHoldToRepeat` (UI behavior local to the two
 * buttons, not shared scroll state) and forwards `trackRef` to its own track.
 *
 * DOM's scrollbars also stepped the position on arrow keys over the thumb. Pixi containers aren't
 * keyboard-focusable the way an HTML div with `tabIndex` is, so there is no event to hook that to -
 * intentionally dropped rather than silently omitted.
 */
export interface ScrollbarProps {
    trackRef: (node: PixiContainer | null) => void;
    /** Accepted for prop-shape parity with `useScrollController`'s return value (so callers
     *  can spread the controller object wholesale) - unused here. */
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

type Part<P> = ForwardRefExoticComponent<P & RefAttributes<PixiContainer>>;

export interface ScrollbarParts {
    /** The arrow that steps back (up / left) and the one that steps forward (down / right). */
    backward: Part<ScrollbarPartProps>;
    forward: Part<ScrollbarPartProps>;
    track: Part<ScrollbarTrackProps>;
    lift: Part<ScrollbarPartProps>;
}

/** A scrollbar along one axis: an arrow, the track with its lift, the other arrow. */
export const createScrollbar = (displayName: string, cascadeKey: string, axis: 'vertical' | 'horizontal', { backward: Backward, forward: Forward, track: Track, lift: Lift }: ScrollbarParts): Part<ScrollbarProps> => {
    const vertical = axis === 'vertical';

    const Component = forwardRef<PixiContainer, ScrollbarProps>(
        (
            { trackRef, thumbSize, thumbOffset, scrollable, onTrackPointerDown, onThumbPointerDown, stepBackward, stepForward, variant, defaultVariant, tintColor, hideWhenDisabled = true, layout },
            ref,
        ) => {
            const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
            const holdBackward = useHoldToRepeat(stepBackward);
            const holdForward = useHoldToRepeat(stepForward);
            const disabled = !scrollable;

            if (disabled && hideWhenDisabled) return null;

            // Disabled, the lift fills the track; otherwise it is `thumbSize` long at `thumbOffset`.
            const liftLayout: BoxLayout = vertical
                ? { left: 0, width: '100%', top: disabled ? 0 : thumbOffset, height: disabled ? '100%' : thumbSize }
                : { top: 0, height: '100%', left: disabled ? 0 : thumbOffset, width: disabled ? '100%' : thumbSize };

            return (
                <Box
                    ref={ref}
                    layout={{ flexDirection: vertical ? 'column' : 'row', alignItems: 'stretch', ...layout }}
                >
                    <VariantCascadeProvider map={ownCascade}>
                        <Backward
                            defaultVariant={resolvedVariant}
                            disabled={disabled}
                            layout={{ flexShrink: 0 }}
                            onPointerDown={holdBackward.onPointerDown}
                            onPointerUp={holdBackward.onPointerUp}
                            onPointerUpOutside={holdBackward.onPointerUpOutside}
                        />
                        <Track
                            ref={node => trackRef(node)}
                            defaultVariant={resolvedVariant}
                            disabled={disabled}
                            // `relative_*_scale_fixed` across: in a rect wider than its art the track stays as wide as the arrows.
                            layout={{ alignSelf: 'flex-start' }}
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
                            {(disabled || (thumbSize > 0)) && (
                                <Lift
                                    // A new lift when it is disabled or enabled: the two are drawn and sized differently.
                                    key={disabled ? 'disabled' : 'thumb'}
                                    defaultVariant={resolvedVariant}
                                    tintColor={tintColor}
                                    disabled={disabled}
                                    layout={liftLayout}
                                    onPointerDown={disabled ? undefined : onThumbPointerDown}
                                />
                            )}
                        </Track>
                        <Forward
                            defaultVariant={resolvedVariant}
                            disabled={disabled}
                            layout={{ flexShrink: 0 }}
                            onPointerDown={holdForward.onPointerDown}
                            onPointerUp={holdForward.onPointerUp}
                            onPointerUpOutside={holdForward.onPointerUpOutside}
                        />
                    </VariantCascadeProvider>
                </Box>
            );
        },
    );

    Component.displayName = displayName;

    return Component;
};
