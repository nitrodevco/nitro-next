import { Container as PixiContainer, Graphics as PixiGraphics } from 'pixi.js';
import { forwardRef, ReactNode, useEffect, useLayoutEffect, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { useScrollController } from './hooks';
import { ScrollbarHorizontal } from './ScrollbarHorizontal';
import { ScrollbarVertical } from './ScrollbarVertical';
import { FillLayout, ScrollViewport } from './utils';

type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps {
    orientation?: ScrollAreaOrientation;
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
    /**
     * Whether the scrollbar goes away while the content fits (the default, as a
     * `scrollable_itemlist` / `scrollable_itemgrid` hides its own), or stays drawn disabled, as a
     * layout's own `scrollbar_*` window does - see `ScrollbarVertical`'s `hideWhenDisabled`.
     */
    hideDisabledScrollbar?: boolean;
    /** Scrolls back to the start whenever this value changes - pass whatever identifies the content (a tab, a category, a page). */
    scrollResetKey?: unknown;
    /**
     * Scrolls to the end whenever this value changes - a chat list's newest entry, the way
     * Flash sets `scrollV = 1` after appending. It waits two frames, so the new content has
     * been laid out and the end is the new one.
     */
    scrollEndKey?: unknown;
    /**
     * Where the vertical scroll goes, 0 (top) to 1 (bottom) of its range - Flash's `scrollV` on a
     * scrollable list. Applied whenever it changes, two frames on, as `scrollEndKey` is, so content
     * set with it has been laid out.
     */
    scrollV?: number;
    /**
     * The vertical scroll offset, whenever it changes - for a list that mounts only the rows in
     * view (nitro-react's `TableView`, Flash `TableView.manageRowViews`).
     */
    onScrollChange?: (offset: number) => void;
    layout?: BoxLayout;
    viewportLayout?: BoxLayout;
    /**
     * Where the scrollbar sits. A layout port passes the rect of the layout's own `scrollbar_*`
     * window (with `viewportLayout` the list's), so the two are placed as Flash places them
     * rather than the bar being carved out of the list's box.
     */
    scrollbarLayout?: BoxLayout;
    contentLayout?: BoxLayout;
    children?: ReactNode;
}

/**
 * A masked scrollable viewport with one or two themed scrollbars beside it - what a
 * `scrollable_itemlist` / `scrollable_itemgrid` and a list with a layout's own `scrollbar_*` window
 * draw as. Owns the `useScrollController` instance(s) and hands their computed pieces down as plain
 * props to `ScrollViewport` and the scrollbars (see `createScrollbar` for why the controller lives
 * here, not in the scrollbar).
 */
export const ScrollArea = forwardRef<PixiContainer, ScrollAreaProps>(
    (
        { orientation = 'vertical', variant, defaultVariant, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, scrollResetKey, scrollEndKey, scrollV, onScrollChange, hideDisabledScrollbar = true, layout, viewportLayout, scrollbarLayout, contentLayout, children },
        ref,
    ) => {
        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';
        const isBoth = orientation === 'both';

        // reachThreshold/onReachStart/onReachEnd apply only while a single axis scrolls - with
        // 'both' it is ambiguous which axis "start"/"end" refers to, so they are dropped rather
        // than guessed.
        const vertical = useScrollController({
            orientation: 'vertical',
            step,
            minThumbSize,
            reachThreshold: isBoth ? undefined : reachThreshold,
            onReachStart: isBoth ? undefined : onReachStart,
            onReachEnd: isBoth ? undefined : onReachEnd,
        });
        const horizontal = useScrollController({
            orientation: 'horizontal',
            step,
            minThumbSize,
            reachThreshold: isBoth ? undefined : reachThreshold,
            onReachStart: isBoth ? undefined : onReachStart,
            onReachEnd: isBoth ? undefined : onReachEnd,
        });

        const verticalScrollTo = vertical.scrollTo;
        const horizontalScrollTo = horizontal.scrollTo;

        useEffect(() => {
            verticalScrollTo(0);
            horizontalScrollTo(0);
        }, [ scrollResetKey, verticalScrollTo, horizontalScrollTo ]);

        const verticalOffset = vertical.scrollOffset;

        // Before the frame draws, so the rows a list builds as they come into view are there when they show.
        useLayoutEffect(() => {
            onScrollChange?.(verticalOffset);
        }, [ verticalOffset, onScrollChange ]);

        useEffect(() => {
            if (scrollEndKey === undefined) return;

            let second = 0;
            const first = requestAnimationFrame(() => {
                second = requestAnimationFrame(() => verticalScrollTo(Number.MAX_SAFE_INTEGER));
            });

            return () => {
                cancelAnimationFrame(first);
                cancelAnimationFrame(second);
            };
        }, [ scrollEndKey, verticalScrollTo ]);

        const verticalScrollToRatio = vertical.scrollToRatio;

        useEffect(() => {
            if (scrollV === undefined) return;

            let second = 0;
            const first = requestAnimationFrame(() => {
                second = requestAnimationFrame(() => verticalScrollToRatio(scrollV));
            });

            return () => {
                cancelAnimationFrame(first);
                cancelAnimationFrame(second);
            };
        }, [ scrollV, verticalScrollToRatio ]);

        // Only used by the 'both' branch below - kept unconditional since hooks can't be
        // called conditionally.
        const [ maskNode, setMaskNode ] = useState<PixiGraphics | null>(null);

        // The children stack top to bottom whatever the orientation (Yoga's own default is a
        // row); a caller scrolling a single wide row passes its own `contentLayout`.
        const resolvedContentLayout: BoxLayout = contentLayout ?? { position: 'relative', width: '100%', flexDirection: 'column', gap: 2 };

        return (
            <Box
                ref={ref}
                layout={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', minWidth: 0, minHeight: 0, gap: 2, ...layout }}
            >
                {isBoth
                    ? (
                            <pixiContainer
                                ref={(node) => {
                                    vertical.viewportRef(node);
                                    horizontal.viewportRef(node);
                                }}
                                eventMode="static"
                                onWheel={(event) => {
                                    vertical.onWheel(event);
                                    horizontal.onWheel(event);
                                }}
                                mask={maskNode ?? undefined}
                                layout={{ flex: 1, minWidth: 0, minHeight: 0, ...viewportLayout }}
                            >
                                <pixiGraphics
                                    ref={setMaskNode}
                                    eventMode="none"
                                    layout={FillLayout}
                                    draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                                />
                                <pixiContainer
                                    ref={(node) => {
                                        vertical.contentRef(node);
                                        horizontal.contentRef(node);
                                    }}
                                    x={-horizontal.scrollOffset}
                                    y={-vertical.scrollOffset}
                                    layout={resolvedContentLayout}
                                >
                                    {children}
                                </pixiContainer>
                            </pixiContainer>
                        )
                    : (
                            <ScrollViewport
                                viewportRef={showVertical ? vertical.viewportRef : horizontal.viewportRef}
                                contentRef={showVertical ? vertical.contentRef : horizontal.contentRef}
                                onWheel={showVertical ? vertical.onWheel : horizontal.onWheel}
                                scrollOffset={showVertical ? vertical.scrollOffset : horizontal.scrollOffset}
                                vertical={showVertical}
                                layout={{ flex: 1, minWidth: 0, minHeight: 0, ...viewportLayout }}
                                contentLayout={resolvedContentLayout}
                            >
                                {children}
                            </ScrollViewport>
                        ) }
                {showVertical && (
                    <ScrollbarVertical
                        trackRef={vertical.trackRef}
                        thumbSize={vertical.thumbSize}
                        thumbOffset={vertical.thumbOffset}
                        scrollable={vertical.scrollable}
                        onTrackPointerDown={vertical.onTrackPointerDown}
                        onThumbPointerDown={vertical.onThumbPointerDown}
                        stepBackward={vertical.stepBackward}
                        stepForward={vertical.stepForward}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        hideWhenDisabled={hideDisabledScrollbar}
                        layout={scrollbarLayout}
                    />
                )}
                {showHorizontal && (
                    <ScrollbarHorizontal
                        trackRef={horizontal.trackRef}
                        thumbSize={horizontal.thumbSize}
                        thumbOffset={horizontal.thumbOffset}
                        scrollable={horizontal.scrollable}
                        onTrackPointerDown={horizontal.onTrackPointerDown}
                        onThumbPointerDown={horizontal.onThumbPointerDown}
                        stepBackward={horizontal.stepBackward}
                        stepForward={horizontal.stepForward}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        hideWhenDisabled={hideDisabledScrollbar}
                        layout={scrollbarLayout}
                    />
                )}
            </Box>
        );
    },
);

ScrollArea.displayName = 'ScrollArea';
