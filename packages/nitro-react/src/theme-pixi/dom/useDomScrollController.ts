import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react';

export type ScrollOrientation = 'vertical' | 'horizontal';

export interface DomScrollControllerOptions {
    orientation: ScrollOrientation;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export interface DomScrollController {
    viewportRef: (node: HTMLDivElement | null) => void;
    trackRef: (node: HTMLDivElement | null) => void;
    thumbSize: number;
    thumbOffset: number;
    atStart: boolean;
    atEnd: boolean;
    scrollable: boolean;
    onTrackPointerDown: (event: ReactPointerEvent) => void;
    onThumbPointerDown: (event: ReactPointerEvent) => void;
    stepBackward: () => void;
    stepForward: () => void;
}

const DEFAULT_STEP = 24;
const DEFAULT_MIN_THUMB_SIZE = 17;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * DOM counterpart to `theme-pixi/utils/useScrollController.ts` - drives the exact same themed
 * `ScrollbarVertical`/`ScrollbarHorizontal` skin off real browser scroll (`scrollTop`/
 * `scrollHeight`, a native `scroll` event, `ResizeObserver`) instead of Pixi's manually-tracked
 * offset + rAF polling of `.layout.computedLayout`.
 *
 * Deliberately mirrors the Pixi hook's window-level pointermove/pointerup drag technique rather
 * than `hooks/ui/useScrollbarController.ts`'s `setPointerCapture` + thumb-local
 * pointermove/pointerup handlers - `ScrollbarSliderBarVertical`/`Horizontal` (shared, unmodified,
 * by both render targets) only expose an `onPointerDown` prop, not the `onPointerMove`/
 * `onPointerUp` passthroughs a capture-based drag would need, so matching Pixi's technique here
 * is what lets this plug into those same components as-is instead of forking them.
 */
export const useDomScrollController = ({
    orientation,
    step = DEFAULT_STEP,
    minThumbSize = DEFAULT_MIN_THUMB_SIZE,
    reachThreshold = 0,
    onReachStart,
    onReachEnd,
}: DomScrollControllerOptions): DomScrollController => {
    const isVertical = orientation === 'vertical';

    const [ viewportNode, setViewportNode ] = useState<HTMLDivElement | null>(null);
    const [ trackNode, setTrackNode ] = useState<HTMLDivElement | null>(null);

    const [ metrics, setMetrics ] = useState({ thumbSize: minThumbSize, thumbOffset: 0, atStart: true, atEnd: true, scrollable: false, scrollMax: 0 });
    const metricsRef = useRef(metrics);
    useEffect(() => {
        metricsRef.current = metrics;
    }, [ metrics ]);

    const wasAtStartRef = useRef(true);
    const wasAtEndRef = useRef(true);
    const onReachStartRef = useRef(onReachStart);
    const onReachEndRef = useRef(onReachEnd);
    useEffect(() => {
        onReachStartRef.current = onReachStart;
        onReachEndRef.current = onReachEnd;
    });

    const activeListenersRef = useRef<{ move: (e: PointerEvent) => void; up: (e: PointerEvent) => void } | null>(null);
    const stopDragging = useCallback(() => {
        const listeners = activeListenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            activeListenersRef.current = null;
        }
    }, []);

    useEffect(() => stopDragging, [ stopDragging ]);

    const measure = useCallback(() => {
        // `scrollable` only ever needs the viewport (+content, implicitly via its own
        // `scrollHeight`) - deliberately NOT gated on `trackNode` too, unlike everything below
        // that actually needs the track's own size. `ScrollbarVertical`/`Horizontal` render
        // (and so mount their track) only once `scrollable` is true, so requiring `trackNode`
        // here would make `scrollable` depend on a node that only exists once `scrollable` is
        // already true - a mount that can never happen.
        if (!viewportNode) return;

        const clientSize = isVertical ? viewportNode.clientHeight : viewportNode.clientWidth;
        const scrollSize = isVertical ? viewportNode.scrollHeight : viewportNode.scrollWidth;
        const scrollPos = isVertical ? viewportNode.scrollTop : viewportNode.scrollLeft;
        const trackSize = trackNode ? (isVertical ? trackNode.clientHeight : trackNode.clientWidth) : 0;
        const scrollMax = Math.max(0, scrollSize - clientSize);

        const ratio = scrollSize > 0 ? clientSize / scrollSize : 1;
        const thumbSize = Math.min(trackSize, Math.max(minThumbSize, trackSize * ratio));
        const availableTrack = Math.max(0, trackSize - thumbSize);

        const thumbOffset = scrollMax > 0 ? (scrollPos / scrollMax) * availableTrack : 0;
        const atStart = scrollPos <= reachThreshold;
        const atEnd = scrollMax - scrollPos <= reachThreshold;
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
    }, [ viewportNode, trackNode, isVertical, minThumbSize, reachThreshold ]);

    useEffect(() => {
        if (!viewportNode) return;

        // Matches the codebase's existing measure-on-mount idiom (usePixiTexture.ts,
        // InventoryFurniViewPixi.tsx): sizes/scroll position must be read as soon as the real
        // nodes exist, not deferred another render behind a state flag, so the scrollbar isn't
        // visibly stale (wrong thumb size/hidden-when-scrollable) for one frame after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        measure();

        const observer = new ResizeObserver(measure);

        observer.observe(viewportNode);
        // Content growing/shrinking without the viewport's own box changing (e.g. more rows
        // appended) still changes `scrollHeight` - observing every child covers that, matching
        // what a dedicated `contentRef` would give us without needing one.
        Array.from(viewportNode.children).forEach(child => observer.observe(child));

        viewportNode.addEventListener('scroll', measure, { passive: true });

        return () => {
            observer.disconnect();
            viewportNode.removeEventListener('scroll', measure);
        };
    }, [ viewportNode, measure ]);

    // Separate from the effect above on purpose: the track only exists once `scrollable` is
    // already true (`ScrollbarVertical`/`Horizontal` don't render otherwise), so it can't be a
    // dependency of the effect that determines `scrollable` in the first place - see `measure`'s
    // own comment. Once it does mount, this fills in the track-dependent metrics
    // (thumbSize/thumbOffset) the first measure pass necessarily computed as 0/using a 0 track.
    useEffect(() => {
        if (!trackNode) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        measure();

        const observer = new ResizeObserver(measure);

        observer.observe(trackNode);

        return () => observer.disconnect();
    }, [ trackNode, measure ]);

    const onThumbPointerDown = (event: ReactPointerEvent) => {
        event.stopPropagation();

        if (!viewportNode) return;

        const dragOrigin = {
            pointer: isVertical ? event.clientY : event.clientX,
            scroll: isVertical ? viewportNode.scrollTop : viewportNode.scrollLeft,
            availableTrack: Math.max(0, (isVertical ? (trackNode?.clientHeight ?? 0) : (trackNode?.clientWidth ?? 0)) - metricsRef.current.thumbSize),
            scrollMax: metricsRef.current.scrollMax,
        };

        const handleMove = (moveEvent: PointerEvent) => {
            const pointer = isVertical ? moveEvent.clientY : moveEvent.clientX;
            const delta = dragOrigin.availableTrack > 0 ? ((pointer - dragOrigin.pointer) / dragOrigin.availableTrack) * dragOrigin.scrollMax : 0;
            const next = clamp(dragOrigin.scroll + delta, 0, dragOrigin.scrollMax);

            if (isVertical) viewportNode.scrollTop = next;
            else viewportNode.scrollLeft = next;
        };

        const handleUp = () => stopDragging();

        activeListenersRef.current = { move: handleMove, up: handleUp };
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    const onTrackPointerDown = (event: ReactPointerEvent) => {
        if (!viewportNode || !trackNode) return;

        const rect = trackNode.getBoundingClientRect();
        const clickPos = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
        const clientSize = isVertical ? viewportNode.clientHeight : viewportNode.clientWidth;
        const { thumbOffset, thumbSize, scrollMax } = metricsRef.current;

        const direction = clickPos < thumbOffset ? -1 : clickPos > thumbOffset + thumbSize ? 1 : 0;
        if (direction === 0) return;

        const current = isVertical ? viewportNode.scrollTop : viewportNode.scrollLeft;
        const next = clamp(current + (direction * clientSize), 0, scrollMax);

        // `scrollTop`/`scrollLeft` are how the browser's own native scroll position is driven -
        // unlike Pixi's virtual offset (plain React state the caller applies declaratively as
        // an `x`/`y` prop), there is no non-imperative way to move it.
        // eslint-disable-next-line react-hooks/immutability
        if (isVertical) viewportNode.scrollTop = next;
        else viewportNode.scrollLeft = next;
    };

    const stepBackward = () => {
        if (!viewportNode) return;

        // eslint-disable-next-line react-hooks/immutability
        if (isVertical) viewportNode.scrollTop -= step;
        else viewportNode.scrollLeft -= step;
    };

    const stepForward = () => {
        if (!viewportNode) return;

        // eslint-disable-next-line react-hooks/immutability
        if (isVertical) viewportNode.scrollTop += step;
        else viewportNode.scrollLeft += step;
    };

    return {
        viewportRef: setViewportNode,
        trackRef: setTrackNode,
        thumbSize: metrics.thumbSize,
        thumbOffset: metrics.thumbOffset,
        atStart: metrics.atStart,
        atEnd: metrics.atEnd,
        scrollable: metrics.scrollable,
        onTrackPointerDown,
        onThumbPointerDown,
        stepBackward,
        stepForward,
    };
};
