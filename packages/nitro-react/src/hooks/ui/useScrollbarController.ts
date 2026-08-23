import { type PointerEvent as ReactPointerEvent, type RefObject, useCallback, useEffect, useRef, useState } from 'react';

export type ScrollbarOrientation = 'vertical' | 'horizontal';

export interface ScrollbarControllerOptions {
    viewportRef: RefObject<HTMLDivElement | null>;
    contentRef: RefObject<HTMLDivElement | null>;
    orientation: ScrollbarOrientation;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export interface ScrollbarController {
    trackRef: RefObject<HTMLDivElement | null>;
    thumbSize: number;
    thumbOffset: number;
    atStart: boolean;
    atEnd: boolean;
    scrollable: boolean;
    onTrackPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onThumbPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onThumbPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onThumbPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
    stepBackward: () => void;
    stepForward: () => void;
}

const DEFAULT_STEP = 24;
const DEFAULT_MIN_THUMB_SIZE = 17;

export function useScrollbarController({
    viewportRef,
    contentRef,
    orientation,
    step = DEFAULT_STEP,
    minThumbSize = DEFAULT_MIN_THUMB_SIZE,
    reachThreshold = 0,
    onReachStart,
    onReachEnd,
}: ScrollbarControllerOptions): ScrollbarController {
    const [ state, setState ] = useState({ thumbSize: minThumbSize, thumbOffset: 0, atStart: true, atEnd: true, scrollable: false });
    const trackRef = useRef<HTMLDivElement>(null);
    const wasAtStart = useRef(true);
    const wasAtEnd = useRef(true);
    const isVertical = orientation === 'vertical';
    const dragOrigin = useRef<{ pointer: number; scroll: number; availableTrack: number; scrollMax: number } | null>(null);

    const onReachStartRef = useRef(onReachStart);
    const onReachEndRef = useRef(onReachEnd);
    useEffect(() => {
        onReachStartRef.current = onReachStart;
        onReachEndRef.current = onReachEnd;
    });

    const recompute = useCallback(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const clientSize = isVertical ? viewport.clientHeight : viewport.clientWidth;
        const scrollSize = isVertical ? viewport.scrollHeight : viewport.scrollWidth;
        const scrollPos = isVertical ? viewport.scrollTop : viewport.scrollLeft;
        const trackSize = isVertical ? track.clientHeight : track.clientWidth;
        const scrollMax = Math.max(0, scrollSize - clientSize);

        const ratio = scrollSize > 0 ? clientSize / scrollSize : 1;
        const thumbSize = Math.min(trackSize, Math.max(minThumbSize, trackSize * ratio));
        const availableTrack = Math.max(0, trackSize - thumbSize);
        const thumbOffset = scrollMax > 0 ? (scrollPos / scrollMax) * availableTrack : 0;

        const atStart = scrollPos <= reachThreshold;
        const atEnd = scrollMax - scrollPos <= reachThreshold;
        const scrollable = scrollMax > 0;

        setState((prev) => {
            if (prev.thumbSize === thumbSize && prev.thumbOffset === thumbOffset && prev.atStart === atStart && prev.atEnd === atEnd && prev.scrollable === scrollable) {
                return prev;
            }
            return { thumbSize, thumbOffset, atStart, atEnd, scrollable };
        });

        if (atStart && !wasAtStart.current) onReachStartRef.current?.();
        if (atEnd && !wasAtEnd.current) onReachEndRef.current?.();
        wasAtStart.current = atStart;
        wasAtEnd.current = atEnd;
    }, [ viewportRef, isVertical, minThumbSize, reachThreshold ]);

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        recompute();

        const observer = new ResizeObserver(recompute);
        observer.observe(viewport);
        observer.observe(track);
        const content = contentRef.current;
        if (content) observer.observe(content);

        viewport.addEventListener('scroll', recompute, { passive: true });
        return () => {
            observer.disconnect();
            viewport.removeEventListener('scroll', recompute);
        };
    }, [ viewportRef, contentRef, recompute ]);

    const onThumbPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);

        const clientSize = isVertical ? viewport.clientHeight : viewport.clientWidth;
        const scrollSize = isVertical ? viewport.scrollHeight : viewport.scrollWidth;
        const trackSize = isVertical ? track.clientHeight : track.clientWidth;
        const scrollMax = Math.max(0, scrollSize - clientSize);
        const ratio = scrollSize > 0 ? clientSize / scrollSize : 1;
        const thumbSize = Math.min(trackSize, Math.max(minThumbSize, trackSize * ratio));

        dragOrigin.current = {
            pointer: isVertical ? event.clientY : event.clientX,
            scroll: isVertical ? viewport.scrollTop : viewport.scrollLeft,
            availableTrack: Math.max(0, trackSize - thumbSize),
            scrollMax,
        };
    };

    const onThumbPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const origin = dragOrigin.current;
        const viewport = viewportRef.current;
        if (!origin || !viewport) return;
        const pointer = isVertical ? event.clientY : event.clientX;
        const scrollDelta = origin.availableTrack > 0 ? ((pointer - origin.pointer) / origin.availableTrack) * origin.scrollMax : 0;
        const next = Math.min(origin.scrollMax, Math.max(0, origin.scroll + scrollDelta));
        if (isVertical) viewport.scrollTop = next;
        else viewport.scrollLeft = next;
    };

    const onThumbPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        dragOrigin.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const onTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;
        const rect = track.getBoundingClientRect();
        const clickPos = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
        const clientSize = isVertical ? viewport.clientHeight : viewport.clientWidth;
        const scrollSize = isVertical ? viewport.scrollHeight : viewport.scrollWidth;
        const scrollMax = Math.max(0, scrollSize - clientSize);
        const current = isVertical ? viewport.scrollTop : viewport.scrollLeft;

        const direction = clickPos < state.thumbOffset ? -1 : clickPos > state.thumbOffset + state.thumbSize ? 1 : 0;
        if (direction === 0) return;
        const next = Math.min(scrollMax, Math.max(0, current + direction * clientSize));
        viewport.scrollTo(isVertical ? { top: next, behavior: 'smooth' } : { left: next, behavior: 'smooth' });
    };

    const stepBackward = () => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        if (isVertical) viewport.scrollTop -= step;
        else viewport.scrollLeft -= step;
    };

    const stepForward = () => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        if (isVertical) viewport.scrollTop += step;
        else viewport.scrollLeft += step;
    };

    return {
        trackRef,
        thumbSize: state.thumbSize,
        thumbOffset: state.thumbOffset,
        atStart: state.atStart,
        atEnd: state.atEnd,
        scrollable: state.scrollable,
        onTrackPointerDown,
        onThumbPointerDown,
        onThumbPointerMove,
        onThumbPointerUp,
        stepBackward,
        stepForward,
    };
}
