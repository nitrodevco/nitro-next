import { type CSSProperties, forwardRef, type HTMLAttributes, type PointerEvent as ReactPointerEvent, type ReactNode, type UIEvent as ReactUIEvent, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarButtonVariantsConfig = {
    variant: {
        '0': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttonup-0-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--scrollbarsliderbuttonup-0-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttonup-0-disabled-src)] disabled:cursor-default',
        '1': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttonup-1-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--scrollbarsliderbuttonup-1-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttonup-1-disabled-src)] disabled:cursor-default',
        '3': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttonup-3-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--scrollbarsliderbuttonup-3-hovering-src)] active:[background-image:var(--scrollbarsliderbuttonup-3-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttonup-3-disabled-src)] disabled:cursor-default',
    },
} as const;

const scrollbarDownButtonVariantsConfig = {
    variant: {
        '0': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttondown-0-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--scrollbarsliderbuttondown-0-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttondown-0-disabled-src)] disabled:cursor-default',
        '1': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttondown-1-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--scrollbarsliderbuttondown-1-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttondown-1-disabled-src)] disabled:cursor-default',
        '3': 'w-4.25 h-4 [background-image:var(--scrollbarsliderbuttondown-3-default-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--scrollbarsliderbuttondown-3-hovering-src)] active:[background-image:var(--scrollbarsliderbuttondown-3-pressed-src)] active:[image-rendering:pixelated] disabled:[background-image:var(--scrollbarsliderbuttondown-3-disabled-src)] disabled:cursor-default',
    },
} as const;

const scrollbarTrackVariantsConfig = {
    variant: {
        '0': '[background-image:var(--scrollbarslidertrackvertical-0-default-src)] bg-size-[100%_1px] bg-repeat-y',
        '1': '[background-image:var(--scrollbarslidertrackvertical-1-default-src)] bg-size-[100%_1px] bg-repeat-y',
        '3': '[background-image:var(--scrollbarslidertrackvertical-3-default-src)] bg-size-[100%_2px] bg-repeat-y',
    },
} as const;

const scrollbarThumbVariantsConfig = {
    variant: {
        '0': '[background-image:var(--scrollbarsliderbarvertical-0-default-src)] bg-size-[100%_100%] bg-no-repeat active:[background-image:var(--scrollbarsliderbarvertical-0-pressed-src)] active:[image-rendering:pixelated]',
        '1': '[background-image:var(--scrollbarsliderbarvertical-1-default-src)] bg-size-[100%_100%] bg-no-repeat',
        '3': '[border-image-source:var(--scrollbarsliderbarvertical-3-default-src)] [border-image-slice:8_0_8_0_fill] [border-image-width:8px_0px_8px_0px] [border-image-repeat:stretch] hover:[border-image-source:var(--scrollbarsliderbarvertical-3-hovering-src)] active:[border-image-source:var(--scrollbarsliderbarvertical-3-pressed-src)]',
    },
} as const;

const scrollbarUpButtonVariants = cva('shrink-0 cursor-pointer disabled:cursor-default', { variants: scrollbarButtonVariantsConfig, defaultVariants: { variant: '3' } });
const scrollbarDownButtonVariants = cva('shrink-0 cursor-pointer disabled:cursor-default', { variants: scrollbarDownButtonVariantsConfig, defaultVariants: { variant: '3' } });
const scrollbarTrackVariants = cva('relative flex-1 min-h-4 w-4.25 cursor-pointer', { variants: scrollbarTrackVariantsConfig, defaultVariants: { variant: '3' } });
const scrollbarThumbVariants = cva('absolute left-0 w-4.25 cursor-pointer', { variants: scrollbarThumbVariantsConfig, defaultVariants: { variant: '3' } });

type ScrollbarVariantProps = VariantProps<typeof scrollbarButtonVariantsConfig>;

/** Smallest the thumb is ever drawn, so it stays grabbable even when the content is huge relative to the viewport. */
const MIN_THUMB_SIZE = 20;
/** Step (px) an up/down button click — or a held button's repeat tick — scrolls the content. */
const BUTTON_SCROLL_STEP = 40;
const BUTTON_REPEAT_INTERVAL_MS = 60;

interface ScrollbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'>, ScrollbarVariantProps {
    className?: string;
    /** Class applied to the scrollable content viewport itself (padding, gap, etc). */
    contentClassName?: string;
    children?: ReactNode;
    /** Fires whenever the content scrolls, with the raw native scroll event. */
    onScroll?: (event: Event) => void;
    /** Fires once when the content scrolls within `scrollEndThreshold` px of the bottom — hook infinite-scroll pagination here. */
    onScrollEnd?: () => void;
    scrollEndThreshold?: number;
}

/**
 * Themed vertical scroll container: draws Nitro's own track/thumb/up/down-button art instead of
 * the browser's native scrollbar, while the content underneath stays a real `overflow-y: auto`
 * element (wheel/touch/keyboard scrolling all keep working for free).
 *
 * The forwarded ref points at the scrollable *content* element — that's what callers pumping
 * their own scroll position (e.g. a virtualizer's `getScrollElement`) actually need.
 */
export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
    ({ className, contentClassName, variant, children, onScroll, onScrollEnd, scrollEndThreshold = 120, ...props }, ref) => {
        const contentRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

        const [thumb, setThumb] = useState({ size: MIN_THUMB_SIZE, offset: 0, scrollable: false });

        const updateThumb = useCallback(() => {
            const content = contentRef.current;
            const track = trackRef.current;

            if (!content || !track) return;

            const { scrollTop, scrollHeight, clientHeight } = content;
            const trackSize = track.clientHeight;
            const scrollable = scrollHeight > clientHeight + 1;

            if (!scrollable) {
                setThumb({ size: trackSize, offset: 0, scrollable: false });

                return;
            }

            const size = Math.max(MIN_THUMB_SIZE, (clientHeight / scrollHeight) * trackSize);
            const maxOffset = trackSize - size;
            const maxScrollTop = scrollHeight - clientHeight;
            const offset = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxOffset : 0;

            setThumb({ size, offset, scrollable: true });
        }, []);

        useLayoutEffect(() => {
            updateThumb();
        }, [updateThumb, children]);

        useEffect(() => {
            const content = contentRef.current;

            if (!content) return;

            const observer = new ResizeObserver(updateThumb);

            observer.observe(content);

            return () => observer.disconnect();
        }, [updateThumb]);

        const handleScroll = useCallback((event: ReactUIEvent<HTMLDivElement>) => {
            updateThumb();
            onScroll?.(event.nativeEvent);

            if (!onScrollEnd) return;

            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

            if (scrollHeight - scrollTop - clientHeight <= scrollEndThreshold) onScrollEnd();
        }, [updateThumb, onScroll, onScrollEnd, scrollEndThreshold]);

        const scrollByStep = useCallback((direction: 1 | -1) => {
            contentRef.current?.scrollBy({ top: direction * BUTTON_SCROLL_STEP, behavior: 'auto' });
        }, []);

        const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

        const stopRepeat = useCallback(() => {
            if (repeatIntervalRef.current == null) return;

            clearInterval(repeatIntervalRef.current);
            repeatIntervalRef.current = null;
        }, []);

        useEffect(() => stopRepeat, [stopRepeat]);

        const handleButtonPointerDown = useCallback((direction: 1 | -1) => {
            scrollByStep(direction);
            stopRepeat();
            repeatIntervalRef.current = setInterval(() => scrollByStep(direction), BUTTON_REPEAT_INTERVAL_MS);
        }, [scrollByStep, stopRepeat]);

        const handleThumbPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
            if (event.button !== 0) return;

            event.preventDefault();

            const content = contentRef.current;
            const track = trackRef.current;

            if (!content || !track) return;

            const trackSize = track.clientHeight;
            const maxScrollTop = content.scrollHeight - content.clientHeight;

            if (maxScrollTop <= 0) return;

            const startY = event.clientY;
            const startScrollTop = content.scrollTop;
            const thumbSize = Math.max(MIN_THUMB_SIZE, (content.clientHeight / content.scrollHeight) * trackSize);
            const maxOffset = trackSize - thumbSize;

            const handleMove = (moveEvent: PointerEvent) => {
                if (maxOffset <= 0) return;

                const deltaY = moveEvent.clientY - startY;
                const deltaScroll = (deltaY / maxOffset) * maxScrollTop;

                content.scrollTop = Math.min(maxScrollTop, Math.max(0, startScrollTop + deltaScroll));
            };

            const handleUp = () => {
                window.removeEventListener('pointermove', handleMove);
                window.removeEventListener('pointerup', handleUp);
            };

            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', handleUp);
        }, []);

        const handleTrackPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
            if (event.target !== event.currentTarget) return;

            const content = contentRef.current;
            const track = trackRef.current;

            if (!content || !track) return;

            const rect = track.getBoundingClientRect();
            const clickRatio = (event.clientY - rect.top) / rect.height;
            const maxScrollTop = content.scrollHeight - content.clientHeight;

            content.scrollTo({ top: clickRatio * maxScrollTop, behavior: 'smooth' });
        }, []);

        const thumbStyle: CSSProperties = { height: thumb.size, transform: `translateY(${thumb.offset}px)` };

        return (
            <div className={cn('flex min-h-0 min-w-0 gap-1', className)} {...props}>
                <div
                    ref={contentRef}
                    onScroll={handleScroll}
                    className={cn('min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', contentClassName)}
                >
                    {children}
                </div>
                <div className="flex flex-col items-center shrink-0">
                    <button
                        type="button"
                        aria-label="Scroll up"
                        disabled={!thumb.scrollable}
                        className={scrollbarUpButtonVariants({ variant })}
                        onPointerDown={() => handleButtonPointerDown(-1)}
                        onPointerUp={stopRepeat}
                        onPointerLeave={stopRepeat}
                    />
                    <div
                        ref={trackRef}
                        role="scrollbar"
                        aria-orientation="vertical"
                        onPointerDown={handleTrackPointerDown}
                        className={scrollbarTrackVariants({ variant })}
                    >
                        <div
                            onPointerDown={handleThumbPointerDown}
                            style={thumbStyle}
                            className={scrollbarThumbVariants({ variant })}
                        />
                    </div>
                    <button
                        type="button"
                        aria-label="Scroll down"
                        disabled={!thumb.scrollable}
                        className={scrollbarDownButtonVariants({ variant })}
                        onPointerDown={() => handleButtonPointerDown(1)}
                        onPointerUp={stopRepeat}
                        onPointerLeave={stopRepeat}
                    />
                </div>
            </div>
        );
    }
);

Scrollbar.displayName = 'Scrollbar';
