import { forwardRef, type HTMLAttributes, useRef } from 'react';

import { ScrollbarHorizontal } from './ScrollbarHorizontal';
import { ScrollbarVertical } from './ScrollbarVertical';
import { cn } from './utils';

type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    className?: string;
    orientation?: ScrollAreaOrientation;
    variant?: string;
    defaultVariant?: string;
    viewportClassName?: string;
    contentClassName?: string;
    tintColor?: string;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({
        className,
        orientation = 'vertical',
        variant,
        defaultVariant,
        viewportClassName,
        contentClassName,
        tintColor,
        step,
        minThumbSize,
        reachThreshold,
        onReachStart,
        onReachEnd,
        children,
        ...props
    }, ref) => {
        const viewportRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';

        return (
            <div ref={ref} className={cn('flex size-full min-h-0 min-w-0 gap-px', className)} {...props}>
                <div ref={viewportRef} className={cn('min-h-0 min-w-0 flex-1 scrollbar-none [&::-webkit-scrollbar]:hidden', showVertical && 'overflow-y-auto', showHorizontal && 'overflow-x-auto', viewportClassName)}>
                    <div ref={contentRef} className={cn(contentClassName, 'relative w-full')}>
                        {children}
                    </div>
                </div>
                {showVertical && (
                    <ScrollbarVertical
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        step={step}
                        minThumbSize={minThumbSize}
                        reachThreshold={orientation === 'both' ? undefined : reachThreshold}
                        onReachStart={orientation === 'both' ? undefined : onReachStart}
                        onReachEnd={orientation === 'both' ? undefined : onReachEnd}
                    />)}
                {showHorizontal && (
                    <ScrollbarHorizontal
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        step={step}
                        minThumbSize={minThumbSize}
                        reachThreshold={orientation === 'both' ? undefined : reachThreshold}
                        onReachStart={orientation === 'both' ? undefined : onReachStart}
                        onReachEnd={orientation === 'both' ? undefined : onReachEnd}
                    />)}
            </div>
        );
    }
);

ScrollArea.displayName = 'ScrollArea';
