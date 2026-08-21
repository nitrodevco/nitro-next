import type { Container as PixiContainer, FederatedPointerEvent, FederatedWheelEvent } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

export type ScrollOrientation = 'vertical' | 'horizontal';

export interface ScrollControllerOptions {
    orientation: ScrollOrientation;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export interface ScrollController {
    viewportRef: (node: PixiContainer | null) => void;
    contentRef: (node: PixiContainer | null) => void;
    trackRef: (node: PixiContainer | null) => void;
    scrollOffset: number;
    thumbSize: number;
    thumbOffset: number;
    atStart: boolean;
    atEnd: boolean;
    scrollable: boolean;
    onWheel: (event: FederatedWheelEvent) => void;
    onTrackPointerDown: (event: FederatedPointerEvent) => void;
    onThumbPointerDown: (event: FederatedPointerEvent) => void;
    stepBackward: () => void;
    stepForward: () => void;
}

const DEFAULT_STEP = 24;
const DEFAULT_MIN_THUMB_SIZE = 17;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const computedSize = (node: PixiContainer | null, axis: 'width' | 'height'): number => {
    if (!node) return 0;

    return node.layout?.computedLayout?.[axis] ?? node[axis] ?? 0;
};

/**
 * Pixi-native port of hooks/ui/useScrollbarController.ts. DOM's version leans on native
 * browser scroll (a hidden `overflow-y-auto` viewport with `scrollTop`/`scrollHeight`/
 * `ResizeObserver`/the native `scroll` event) driving a fully custom-skinned scrollbar UI -
 * Pixi has none of that, so this owns the scroll position itself (`scrollOffset`, applied by
 * the caller as the content container's own `y`/`x`, on top of its layout position - the same
 * composition technique useFrameDrag.ts's drag offset already relies on) and measures
 * viewport/content/track sizes every animation frame (there's no ResizeObserver equivalent for
 * a Pixi container's yoga-computed size) instead of a `scroll` event + observer, reading
 * `.layout.computedLayout` the same way useFrameDrag.ts/useFrameResize.ts already do. Thumb
 * dragging uses window-level pointermove/pointerup (Pixi's FederatedPointerEvent has no
 * setPointerCapture, confirmed absent from pixi.js's event types), the same technique
 * useFrameDrag.ts uses for the identical reason.
 *
 * IMPORTANT for call sites: assign `viewportRef`/`contentRef`/`trackRef` to a JSX `ref` prop
 * via an inline arrow (`ref={node => controller.trackRef(node)}`), never as a direct member
 * expression (`ref={controller.trackRef}`). Confirmed empirically against this repo's
 * `eslint-plugin-react-hooks` version: passing a hook-result object's property straight into a
 * JSX `ref=` prop makes the "treat ref-like identifiers as refs" heuristic (any `xxxRef`-named
 * binding, `enableTreatRefLikeIdentifiersAsRefs`) taint every OTHER property read from that
 * same object elsewhere in the component as a false-positive "Cannot access refs during render"
 * error - even plain numbers/callbacks with no "Ref" in their own name. Wrapping the ref prop
 * in its own inline closure avoids the false positive entirely (verified via a minimal repro).
 */
export const useScrollController = ({
    orientation,
    step = DEFAULT_STEP,
    minThumbSize = DEFAULT_MIN_THUMB_SIZE,
    reachThreshold = 0,
    onReachStart,
    onReachEnd,
}: ScrollControllerOptions): ScrollController => {
    const isVertical = orientation === 'vertical';
    const sizeAxis = isVertical ? 'height' : 'width';

    const [viewportNode, setViewportNode] = useState<PixiContainer | null>(null);
    const [contentNode, setContentNode] = useState<PixiContainer | null>(null);
    const [trackNode, setTrackNode] = useState<PixiContainer | null>(null);

    const [scrollOffset, setScrollOffset] = useState(0);
    const scrollOffsetRef = useRef(0);
    useEffect(() => {
        scrollOffsetRef.current = scrollOffset;
    }, [scrollOffset]);

    const [metrics, setMetrics] = useState({ thumbSize: minThumbSize, thumbOffset: 0, atStart: true, atEnd: true, scrollable: false, scrollMax: 0 });
    const metricsRef = useRef(metrics);
    useEffect(() => {
        metricsRef.current = metrics;
    }, [metrics]);

    const wasAtStartRef = useRef(true);
    const wasAtEndRef = useRef(true);
    const onReachStartRef = useRef(onReachStart);
    const onReachEndRef = useRef(onReachEnd);
    useEffect(() => {
        onReachStartRef.current = onReachStart;
        onReachEndRef.current = onReachEnd;
    });

    const dragOriginRef = useRef<{ pointer: number, scroll: number, availableTrack: number, scrollMax: number } | null>(null);
    const activeListenersRef = useRef<{ move: (e: PointerEvent) => void, up: (e: PointerEvent) => void } | null>(null);

    const measure = useCallback(() => {
        const clientSize = computedSize(viewportNode, sizeAxis);
        const scrollSize = computedSize(contentNode, sizeAxis);
        const trackSize = computedSize(trackNode, sizeAxis);
        const scrollMax = Math.max(0, scrollSize - clientSize);

        const ratio = scrollSize > 0 ? clientSize / scrollSize : 1;
        const thumbSize = Math.min(trackSize, Math.max(minThumbSize, trackSize * ratio));
        const availableTrack = Math.max(0, trackSize - thumbSize);

        const clampedOffset = clamp(scrollOffsetRef.current, 0, scrollMax);
        if (clampedOffset !== scrollOffsetRef.current) setScrollOffset(clampedOffset);

        const thumbOffset = scrollMax > 0 ? (clampedOffset / scrollMax) * availableTrack : 0;
        const atStart = clampedOffset <= reachThreshold;
        const atEnd = scrollMax - clampedOffset <= reachThreshold;
        const scrollable = scrollMax > 0;

        setMetrics(prev => (
            prev.thumbSize === thumbSize && prev.thumbOffset === thumbOffset && prev.atStart === atStart && prev.atEnd === atEnd && prev.scrollable === scrollable && prev.scrollMax === scrollMax
                ? prev
                : { thumbSize, thumbOffset, atStart, atEnd, scrollable, scrollMax }
        ));

        if (atStart && !wasAtStartRef.current) onReachStartRef.current?.();
        if (atEnd && !wasAtEndRef.current) onReachEndRef.current?.();
        wasAtStartRef.current = atStart;
        wasAtEndRef.current = atEnd;
    }, [viewportNode, contentNode, trackNode, sizeAxis, minThumbSize, reachThreshold]);

    useEffect(() => {
        if (!viewportNode) return;

        measure();

        let raf = 0;
        const tick = () => {
            measure();
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [viewportNode, measure]);

    const stopDragging = useCallback(() => {
        const listeners = activeListenersRef.current;
        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }
        dragOriginRef.current = null;
    }, []);

    useEffect(() => stopDragging, [stopDragging]);

    const onWheel = (event: FederatedWheelEvent) => {
        const delta = isVertical ? event.deltaY : event.deltaX;
        if (!delta) return;

        event.stopPropagation();
        setScrollOffset(clamp(scrollOffsetRef.current + delta, 0, metricsRef.current.scrollMax));
    };

    const onThumbPointerDown = (event: FederatedPointerEvent) => {
        event.stopPropagation();

        dragOriginRef.current = {
            pointer: isVertical ? event.clientY : event.clientX,
            scroll: scrollOffsetRef.current,
            availableTrack: Math.max(0, computedSize(trackNode, sizeAxis) - metricsRef.current.thumbSize),
            scrollMax: metricsRef.current.scrollMax,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const origin = dragOriginRef.current;
            if (!origin) return;

            const pointer = isVertical ? moveEvent.clientY : moveEvent.clientX;
            const delta = origin.availableTrack > 0 ? ((pointer - origin.pointer) / origin.availableTrack) * origin.scrollMax : 0;
            setScrollOffset(clamp(origin.scroll + delta, 0, origin.scrollMax));
        };

        const handleUp = () => stopDragging();

        activeListenersRef.current = { move: handleMove, up: handleUp };
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    const onTrackPointerDown = (event: FederatedPointerEvent) => {
        if (!trackNode) return;

        const trackGlobal = trackNode.getGlobalPosition();
        const clickPos = (isVertical ? event.global.y : event.global.x) - (isVertical ? trackGlobal.y : trackGlobal.x);
        const clientSize = computedSize(viewportNode, sizeAxis);
        const { thumbOffset, thumbSize, scrollMax } = metricsRef.current;

        const direction = clickPos < thumbOffset ? -1 : clickPos > thumbOffset + thumbSize ? 1 : 0;
        if (direction === 0) return;

        setScrollOffset(clamp(scrollOffsetRef.current + direction * clientSize, 0, scrollMax));
    };

    const stepBackward = () => setScrollOffset(clamp(scrollOffsetRef.current - step, 0, metricsRef.current.scrollMax));
    const stepForward = () => setScrollOffset(clamp(scrollOffsetRef.current + step, 0, metricsRef.current.scrollMax));

    return {
        viewportRef: setViewportNode,
        contentRef: setContentNode,
        trackRef: setTrackNode,
        scrollOffset,
        thumbSize: metrics.thumbSize,
        thumbOffset: metrics.thumbOffset,
        atStart: metrics.atStart,
        atEnd: metrics.atEnd,
        scrollable: metrics.scrollable,
        onWheel,
        onTrackPointerDown,
        onThumbPointerDown,
        stepBackward,
        stepForward,
    };
};
