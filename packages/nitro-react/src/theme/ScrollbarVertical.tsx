import { forwardRef, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';

import { useHoldToRepeat, useScrollbarController } from '#base/hooks';

import { ScrollbarSliderBarVertical } from './ScrollbarSliderBarVertical';
import { ScrollbarSliderButtonDown } from './ScrollbarSliderButtonDown';
import { ScrollbarSliderButtonUp } from './ScrollbarSliderButtonUp';
import { ScrollbarSliderTrackVertical } from './ScrollbarSliderTrackVertical';
import { cn, useCascadedVariant, VariantCascadeProvider } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

export interface ScrollbarVerticalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    className?: string;
    viewportRef: RefObject<HTMLDivElement | null>;
    contentRef: RefObject<HTMLDivElement | null>;
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export const ScrollbarVertical = forwardRef<HTMLDivElement, ScrollbarVerticalProps>(
    (
        { className, viewportRef, contentRef, variant, defaultVariant, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, ...props },
        ref
    ) => {
        const cascadedVariant = useCascadedVariant('scrollbarVertical');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarVertical']?.[resolvedVariant];

        const controller = useScrollbarController({ viewportRef, contentRef, orientation: 'vertical', step, minThumbSize, reachThreshold, onReachStart, onReachEnd });
        const holdUp = useHoldToRepeat(controller.stepBackward);
        const holdDown = useHoldToRepeat(controller.stepForward);

        const onThumbKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                controller.stepBackward();
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                controller.stepForward();
            }
        }

        /*
         * The illumina scrollbar layout (illumina_light_scrollbar_vertical_xml) holds
         * only the track and the lift — no up/down buttons.
         */
        const hasButtons = resolvedVariant !== '100';

        return (
            /*
             * ScrollBarController disables itself when visibleRegion / scrollableRegion
             * >= 1, and ScrollableItemListWindow reacts to WE_DISABLED / WE_ENABLED by
             * toggling the scrollbar's visibility and handing its width back to the
             * item list — so an unscrollable scrollbar is hidden, not shown disabled.
             */
            <div ref={ref} aria-disabled={!controller.scrollable} className={cn('flex w-fit flex-col items-stretch', !controller.scrollable && 'hidden', className)} {...props}>
                <VariantCascadeProvider map={ownCascade}>
                    {hasButtons && <ScrollbarSliderButtonUp
                        defaultVariant={resolvedVariant}
                        role="button"
                        aria-label="Scroll up"
                        aria-disabled={!controller.scrollable}
                        className="shrink-0 cursor-pointer touch-none select-none"
                        {...holdUp}
                    />}
                    <ScrollbarSliderTrackVertical
                        ref={controller.trackRef}
                        defaultVariant={resolvedVariant}
                        aria-disabled={!controller.scrollable}
                        className="relative w-full flex-1 cursor-pointer touch-none select-none"
                        onPointerDown={controller.onTrackPointerDown}
                    >
                        {/*
                          * The skin library defines a disabled sprite for the track
                          * (3-disabled.png) but none for the lift, so a disabled scrollbar
                          * draws the track alone — the lift is not rendered.
                          */}
                        {controller.scrollable && <ScrollbarSliderBarVertical
                            defaultVariant={resolvedVariant}
                            tintColor={tintColor}
                            role="slider"
                            tabIndex={0}
                            aria-label="Scroll position"
                            aria-orientation="vertical"
                            className="absolute left-0 w-full cursor-grab touch-none select-none active:cursor-grabbing"
                            style={{ top: controller.thumbOffset, height: controller.thumbSize }}
                            onPointerDown={controller.onThumbPointerDown}
                            onPointerMove={controller.onThumbPointerMove}
                            onPointerUp={controller.onThumbPointerUp}
                            onKeyDown={onThumbKeyDown}
                        />}
                    </ScrollbarSliderTrackVertical>
                    {hasButtons && <ScrollbarSliderButtonDown
                        defaultVariant={resolvedVariant}
                        role="button"
                        aria-label="Scroll down"
                        aria-disabled={!controller.scrollable}
                        className="shrink-0 cursor-pointer touch-none select-none"
                        {...holdDown}
                    />}
                </VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarVertical.displayName = 'ScrollbarVertical';
