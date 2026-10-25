import { Container as PixiContainer, FederatedPointerEvent, FederatedWheelEvent } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ScrollControllerOptions } from '../scroll';
import { clamp } from '../utils/clamp';
import { ClientToStage } from '../utils/GetPixelRatio';
import { useLatest } from './useLatest';
import { useLayoutEvent } from './useLayoutEvent';
import { useWindowPointerDrag } from './useWindowPointerDrag';

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
    /** Jumps to an absolute offset (clamped to the scrollable range); `scrollTo(0)` is "back to the start". */
    scrollTo: (offset: number) => void;
    /** Jumps to `ratio` (0 to 1) of the scrollable range as it is laid out now. */
    scrollToRatio: (ratio: number) => void;
}

const DEFAULT_STEP = 24;
const DEFAULT_MIN_THUMB_SIZE = 17;

const computedSize = (node: PixiContainer | null, axis: 'width' | 'height'): number => {
    // A destroyed node can still be held in state until React clears its ref; its `scale` is
    // null by then, so the `width`/`height` getters would throw.
    if (!node || node.destroyed) return 0;

    return node.layout?.computedLayout?.[axis] ?? node[axis] ?? 0;
};

/**
 * The scroll state of one axis of a scrollable area (Flash's `ScrollBarController` and the
 * scrollable list it drives): the offset, the lift's size and place, and the wheel, track, lift and
 * arrow input. Pixi has no native scrolling, so this owns the offset (`scrollOffset`, which the
 * caller applies as the content container's own `x`/`y`, on top of its layout position) and
 * re-measures the viewport, content and track from @pixi/layout's `layout` event
 * (`useLayoutEvent`) and on every offset change. A lift drag runs on window-level `pointermove` /
 * `pointerup` listeners, as `useFrameDrag`'s does: Pixi's `FederatedPointerEvent` has no pointer
 * capture.
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

    const [ viewportNode, setViewportNode ] = useState<PixiContainer | null>(null);
    const [ contentNode, setContentNode ] = useState<PixiContainer | null>(null);
    const [ trackNode, setTrackNode ] = useState<PixiContainer | null>(null);

    const [ scrollOffset, setScrollOffset ] = useState(0);
    const scrollOffsetRef = useLatest(scrollOffset);

    const [ metrics, setMetrics ] = useState({ thumbSize: minThumbSize, thumbOffset: 0, atStart: true, atEnd: true, scrollable: false, scrollMax: 0 });
    const metricsRef = useLatest(metrics);

    const wasAtStartRef = useRef(true);
    const wasAtEndRef = useRef(true);
    const onReachStartRef = useLatest(onReachStart);
    const onReachEndRef = useLatest(onReachEnd);

    const dragOriginRef = useRef<{ pointer: number; scroll: number; availableTrack: number; scrollMax: number; scale: number } | null>(null);
    const { start: startPointerDrag, stop: stopPointerDrag } = useWindowPointerDrag();

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
    }, [ viewportNode, contentNode, trackNode, sizeAxis, minThumbSize, reachThreshold ]);

    // Re-measure when any of the three boxes gets a new layout, or the offset moves (its clamp
    // and the thumb position depend on it) - not every frame.
    useLayoutEvent(viewportNode, measure);
    useLayoutEvent(contentNode, measure);
    useLayoutEvent(trackNode, measure);

    useEffect(() => {
        measure();
    }, [ measure, scrollOffset ]);

    // The range as the boxes are laid out now: a layout can settle after the last `layout` event
    // `measure` heard (a template list's content box resized in the same pass as its items), so a
    // scroll clamps to the live sizes rather than to the last measured range - which would leave
    // the end of the content out of reach.
    const liveScrollMax = useCallback(() => {
        const clientSize = computedSize(viewportNode, sizeAxis);
        const scrollSize = computedSize(contentNode, sizeAxis);

        return (viewportNode && contentNode) ? Math.max(0, scrollSize - clientSize) : metricsRef.current.scrollMax;
    }, [ viewportNode, contentNode, sizeAxis ]);

    const stopDragging = useCallback(() => {
        stopPointerDrag();
        dragOriginRef.current = null;
    }, [ stopPointerDrag ]);

    const onWheel = (event: FederatedWheelEvent) => {
        const delta = isVertical ? event.deltaY : event.deltaX;
        if (!delta) return;

        event.stopPropagation();
        setScrollOffset(clamp(scrollOffsetRef.current + delta, 0, liveScrollMax()));
    };

    const onThumbPointerDown = (event: FederatedPointerEvent) => {
        event.stopPropagation();

        // A lift inside a scaled window (the room-zoomed `ScaledWindow`, WIN63-202610131318
        // `beginScrollbarDrag`) follows the pointer in its own pixels: screen pixels over its world
        // scale. 1 everywhere else.
        const world = trackNode?.worldTransform;
        const worldScale = world ? (isVertical ? Math.hypot(world.c, world.d) : Math.hypot(world.a, world.b)) : 1;

        dragOriginRef.current = {
            pointer: ClientToStage(isVertical ? event.clientY : event.clientX),
            scroll: scrollOffsetRef.current,
            availableTrack: Math.max(0, computedSize(trackNode, sizeAxis) - metricsRef.current.thumbSize),
            scrollMax: liveScrollMax(),
            scale: (worldScale > 0) ? worldScale : 1,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const origin = dragOriginRef.current;
            if (!origin) return;

            const pointer = ClientToStage(isVertical ? moveEvent.clientY : moveEvent.clientX);
            const delta = origin.availableTrack > 0 ? (((pointer - origin.pointer) / origin.scale) / origin.availableTrack) * origin.scrollMax : 0;
            setScrollOffset(clamp(origin.scroll + delta, 0, origin.scrollMax));
        };

        startPointerDrag(event.pointerId, { onMove: handleMove, onEnd: () => stopDragging() });
    };

    const onTrackPointerDown = (event: FederatedPointerEvent) => {
        if (!trackNode) return;

        const trackGlobal = trackNode.getGlobalPosition();
        const clickPos = (isVertical ? event.global.y : event.global.x) - (isVertical ? trackGlobal.y : trackGlobal.x);
        const clientSize = computedSize(viewportNode, sizeAxis);
        const { thumbOffset, thumbSize } = metricsRef.current;
        const scrollMax = liveScrollMax();

        const direction = clickPos < thumbOffset ? -1 : clickPos > thumbOffset + thumbSize ? 1 : 0;
        if (direction === 0) return;

        setScrollOffset(clamp(scrollOffsetRef.current + direction * clientSize, 0, scrollMax));
    };

    const stepBackward = () => setScrollOffset(clamp(scrollOffsetRef.current - step, 0, liveScrollMax()));
    const stepForward = () => setScrollOffset(clamp(scrollOffsetRef.current + step, 0, liveScrollMax()));

    const scrollTo = useCallback((offset: number) => {
        const next = clamp(offset, 0, liveScrollMax());

        // Written through to the ref as well so a wheel/step in the same frame builds on the new
        // position rather than the one the effect hasn't synced yet.
        scrollOffsetRef.current = next;
        setScrollOffset(next);
    }, [ liveScrollMax ]);

    /** Scrolls to `ratio` (0 to 1) of the scroll range as it is now laid out. */
    const scrollToRatio = useCallback((ratio: number) => scrollTo(ratio * liveScrollMax()), [ scrollTo, liveScrollMax ]);

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
        scrollTo,
        scrollToRatio,
    };
};
