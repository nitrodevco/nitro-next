import { Container as PixiContainer, FederatedPointerEvent, Graphics as PixiGraphics } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { boxLayoutToStyle } from './dom';
import { useDomScrollController, useScrollController } from './hooks';
import { ScrollbarHorizontal } from './ScrollbarHorizontal';
import { ScrollbarVertical } from './ScrollbarVertical';
import { getRenderMode, ScrollViewport } from './utils';

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
    layout?: BoxLayout;
    viewportLayout?: BoxLayout;
    contentLayout?: BoxLayout;
    children?: ReactNode;
}

/**
 * Pixi port of theme/ScrollArea.tsx - top-level composition of a masked scrollable viewport
 * plus one or two themed scrollbars. Owns the `useScrollController` instance(s) itself and
 * hands their computed pieces down as plain props to `ScrollViewport`/`ScrollbarVertical`/
 * `ScrollbarHorizontal` - see ScrollbarVertical.tsx's docblock for why DOM's shared-`RefObject`
 * composition doesn't translate to Pixi and the controller has to be lifted here instead of
 * living inside the scrollbar components.
 */
const ScrollAreaPixi = forwardRef<PixiContainer, ScrollAreaProps>(
    (
        { orientation = 'vertical', variant, defaultVariant, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, layout, viewportLayout, contentLayout, children },
        ref,
    ) => {
        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';
        const isBoth = orientation === 'both';

        // DOM only forwards reachThreshold/onReachStart/onReachEnd to a scrollbar when a
        // single axis is active - with 'both' shown it's ambiguous which axis "start"/"end"
        // refers to, so DOM (and this port) drop them rather than guess. Preserved verbatim
        // from theme/ScrollArea.tsx.
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

        // Only used by the 'both' branch below - kept unconditional since hooks can't be
        // called conditionally.
        const [ maskNode, setMaskNode ] = useState<PixiGraphics | null>(null);

        // DOM's content wrapper is always `relative w-full` regardless of orientation - a plain
        // block div, whose children stack vertically by default with no flex involved. Yoga has
        // no block-layout mode (its own default flex-direction is 'row', not a vertical stack),
        // so `flexDirection: 'column'` here is what actually reproduces DOM's default stacking
        // behavior - callers scrolling a single wide row (horizontal orientation) override via
        // `contentLayout`, the same way DOM callers would give their children their own
        // `flex flex-row` wrapper.
        const resolvedContentLayout: BoxLayout = contentLayout ?? { position: 'relative', width: '100%', flexDirection: 'column' };

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', width: '100%', height: '100%', minWidth: 0, minHeight: 0, gap: 1, ...layout }}
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
                                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
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
                                orientation={showVertical ? 'vertical' : 'horizontal'}
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
                    />
                )}
                {showHorizontal && (
                    <ScrollbarHorizontal
                        trackRef={horizontal.trackRef}
                        thumbSize={horizontal.thumbSize}
                        thumbOffset={horizontal.thumbOffset}
                        atStart={horizontal.atStart}
                        atEnd={horizontal.atEnd}
                        scrollable={horizontal.scrollable}
                        onTrackPointerDown={horizontal.onTrackPointerDown}
                        onThumbPointerDown={horizontal.onThumbPointerDown}
                        stepBackward={horizontal.stepBackward}
                        stepForward={horizontal.stepForward}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                    />
                )}
            </Box>
        );
    },
);

ScrollAreaPixi.displayName = 'ScrollAreaPixi';

/**
 * DOM counterpart: a real `overflow: auto` viewport (native scroll, its own chrome hidden via
 * `.nitro-scroll-hide` - see base.css) drives `useDomScrollController`, whose computed pieces
 * feed the *same* `ScrollbarVertical`/`ScrollbarHorizontal` presentational components the Pixi
 * target uses unmodified (they only take primitive props - thumb size/offset, plain callbacks -
 * with no Pixi-specific behavior of their own). Their prop types are written against Pixi's
 * `FederatedPointerEvent`/`PixiContainer`, but since `Box`'s own DOM branch already forwards a
 * real DOM `PointerEvent`/`HTMLDivElement` through those exact same prop slots at runtime (see
 * Box.tsx's docblock on that same cast), bridging this controller's real DOM handlers/refs
 * through here is the identical, already-established pattern, not a new risk.
 */
const ScrollAreaDom = forwardRef<PixiContainer, ScrollAreaProps>(
    (
        { orientation = 'vertical', variant, defaultVariant, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, layout, viewportLayout, contentLayout, children },
        ref,
    ) => {
        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';
        const isBoth = orientation === 'both';

        const vertical = useDomScrollController({
            orientation: 'vertical',
            step,
            minThumbSize,
            reachThreshold: isBoth ? undefined : reachThreshold,
            onReachStart: isBoth ? undefined : onReachStart,
            onReachEnd: isBoth ? undefined : onReachEnd,
        });
        const horizontal = useDomScrollController({
            orientation: 'horizontal',
            step,
            minThumbSize,
            reachThreshold: isBoth ? undefined : reachThreshold,
            onReachStart: isBoth ? undefined : onReachStart,
            onReachEnd: isBoth ? undefined : onReachEnd,
        });

        const resolvedContentLayout: BoxLayout = contentLayout ?? { position: 'relative', width: '100%', flexDirection: 'column' };

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', width: '100%', height: '100%', minWidth: 0, minHeight: 0, gap: 1, ...layout }}
            >
                <div
                    ref={(node) => {
                        if (showVertical) vertical.viewportRef(node);
                        if (showHorizontal) horizontal.viewportRef(node);
                    }}
                    className="nitro-scroll-hide"
                    style={{
                        ...boxLayoutToStyle({ flex: 1, minWidth: 0, minHeight: 0, ...viewportLayout }),
                        // Load-bearing, not decorative - see ScrollViewport.tsx's (Pixi) own
                        // docblock on the identical bug: flexbox's default `align-items:
                        // stretch` cross-axis-stretches the lone content child to exactly the
                        // viewport's own size, which zeroes `scrollHeight - clientHeight` and
                        // makes the whole area report as never scrollable no matter how much
                        // content it actually holds.
                        alignItems: 'flex-start',
                        overflowY: showVertical ? 'auto' : 'hidden',
                        overflowX: showHorizontal ? 'auto' : 'hidden',
                    }}
                >
                    <div style={boxLayoutToStyle(resolvedContentLayout)}>
                        {children}
                    </div>
                </div>
                {showVertical && (
                    <ScrollbarVertical
                        trackRef={node => vertical.trackRef(node as unknown as HTMLDivElement | null)}
                        thumbSize={vertical.thumbSize}
                        thumbOffset={vertical.thumbOffset}
                        scrollable={vertical.scrollable}
                        onTrackPointerDown={vertical.onTrackPointerDown as unknown as (event: FederatedPointerEvent) => void}
                        onThumbPointerDown={vertical.onThumbPointerDown as unknown as (event: FederatedPointerEvent) => void}
                        stepBackward={vertical.stepBackward}
                        stepForward={vertical.stepForward}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                    />
                )}
                {showHorizontal && (
                    <ScrollbarHorizontal
                        trackRef={node => horizontal.trackRef(node as unknown as HTMLDivElement | null)}
                        thumbSize={horizontal.thumbSize}
                        thumbOffset={horizontal.thumbOffset}
                        atStart={horizontal.atStart}
                        atEnd={horizontal.atEnd}
                        scrollable={horizontal.scrollable}
                        onTrackPointerDown={horizontal.onTrackPointerDown as unknown as (event: FederatedPointerEvent) => void}
                        onThumbPointerDown={horizontal.onThumbPointerDown as unknown as (event: FederatedPointerEvent) => void}
                        stepBackward={horizontal.stepBackward}
                        stepForward={horizontal.stepForward}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                    />
                )}
            </Box>
        );
    },
);

ScrollAreaDom.displayName = 'ScrollAreaDom';

export const ScrollArea: ForwardRefExoticComponent<ScrollAreaProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollAreaProps>(
    (props, ref) => getRenderMode() === 'dom'
        ? (
                <ScrollAreaDom
                    ref={ref}
                    {...props}
                />
            )
        : (
                <ScrollAreaPixi
                    ref={ref}
                    {...props}
                />
            ),
);

ScrollArea.displayName = 'ScrollArea';
