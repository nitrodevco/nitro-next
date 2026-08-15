import { forwardRef, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';

import { useHoldToRepeat, useScrollbarController } from '#base/hooks';

import { ScrollbarSliderBarHorizontal } from './ScrollbarSliderBarHorizontal';
import { ScrollbarSliderButtonLeft } from './ScrollbarSliderButtonLeft';
import { ScrollbarSliderButtonRight } from './ScrollbarSliderButtonRight';
import { ScrollbarSliderTrackHorizontal } from './ScrollbarSliderTrackHorizontal';
import { cn, useCascadedVariant, VariantCascadeProvider } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

export interface ScrollbarHorizontalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
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

export const ScrollbarHorizontal = forwardRef<HTMLDivElement, ScrollbarHorizontalProps>(
    (
        { className, viewportRef, contentRef, variant, defaultVariant, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, ...props },
        ref
    ) => {
        const cascadedVariant = useCascadedVariant('scrollbarHorizontal');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarHorizontal']?.[resolvedVariant];

        const controller = useScrollbarController({ viewportRef, contentRef, orientation: 'horizontal', step, minThumbSize, reachThreshold, onReachStart, onReachEnd });
        const holdLeft = useHoldToRepeat(controller.stepBackward);
        const holdRight = useHoldToRepeat(controller.stepForward);

        function onThumbKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                controller.stepBackward();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                controller.stepForward();
            }
        }

        if (!controller.scrollable) return null;

        return (
            <div ref={ref} className={cn('flex flex-row items-stretch', className)} {...props}>
                <VariantCascadeProvider map={ownCascade}>
                    <ScrollbarSliderButtonLeft
                        defaultVariant={resolvedVariant}
                        role="button"
                        aria-label="Scroll left"
                        aria-disabled={!controller.scrollable || controller.atStart}
                        className="shrink-0 cursor-pointer touch-none select-none"
                        {...holdLeft}
                    />
                    <ScrollbarSliderTrackHorizontal
                        ref={controller.trackRef}
                        defaultVariant={resolvedVariant}
                        aria-disabled={!controller.scrollable}
                        className="relative h-full flex-1 cursor-pointer touch-none select-none"
                        onPointerDown={controller.onTrackPointerDown}
                    >
                        <ScrollbarSliderBarHorizontal
                            defaultVariant={resolvedVariant}
                            tintColor={tintColor}
                            role="slider"
                            tabIndex={0}
                            aria-label="Scroll position"
                            aria-orientation="horizontal"
                            className="absolute top-0 h-full cursor-grab touch-none select-none active:cursor-grabbing"
                            style={{ left: controller.thumbOffset, width: controller.thumbSize }}
                            onPointerDown={controller.onThumbPointerDown}
                            onPointerMove={controller.onThumbPointerMove}
                            onPointerUp={controller.onThumbPointerUp}
                            onKeyDown={onThumbKeyDown}
                        />
                    </ScrollbarSliderTrackHorizontal>
                    <ScrollbarSliderButtonRight
                        defaultVariant={resolvedVariant}
                        role="button"
                        aria-label="Scroll right"
                        aria-disabled={!controller.scrollable || controller.atEnd}
                        className="shrink-0 cursor-pointer touch-none select-none"
                        {...holdRight}
                    />
                </VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarHorizontal.displayName = 'ScrollbarHorizontal';
