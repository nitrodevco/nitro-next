import { useVirtualizer } from '@tanstack/react-virtual';
import { type ReactNode, useRef } from 'react';

import { cn } from '#base/utils';

import { Scrollbar } from './Scrollbar';

interface ItemGridProps<T> {
    items: T[];
    /** Renders a single cell's contents — pass any component here to customize how items look. */
    renderItem: (item: T, index: number) => ReactNode;
    getItemKey: (item: T, index: number) => string | number;
    columnCount?: number;
    /** Square cell size in px, not counting `gap`. */
    itemSize?: number;
    gap?: number;
    className?: string;
    variant?: '0' | '1' | '3';
    isLoadingMore?: boolean;
    loadingIndicator?: ReactNode;
    /** Fires when the grid is scrolled near the bottom — hook infinite-scroll pagination here. */
    onScrollEnd?: () => void;
    overscan?: number;
}

const DEFAULT_COLUMN_COUNT = 4;
const DEFAULT_ITEM_SIZE = 54;
const DEFAULT_GAP = 4;

export const ItemGrid = <T,>({
    items,
    renderItem,
    getItemKey,
    columnCount = DEFAULT_COLUMN_COUNT,
    itemSize = DEFAULT_ITEM_SIZE,
    gap = DEFAULT_GAP,
    className,
    variant = '3',
    isLoadingMore,
    loadingIndicator,
    onScrollEnd,
    overscan = 4,
}: ItemGridProps<T>) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const rowCount = Math.ceil(items.length / columnCount);
    const rowSize = itemSize + gap;

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => rowSize,
        overscan,
    });

    const totalSize = rowVirtualizer.getTotalSize();

    return (
        <Scrollbar ref={scrollRef} variant={variant} className={cn('flex-1 min-h-0', className)} onScrollEnd={onScrollEnd}>
            <div style={{ height: totalSize + (isLoadingMore ? rowSize : 0), position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const start = virtualRow.index * columnCount;
                    const rowItems = items.slice(start, start + columnCount);

                    return (
                        <div
                            key={virtualRow.key}
                            className="absolute top-0 left-0 flex w-full"
                            style={{ height: virtualRow.size, transform: `translateY(${virtualRow.start}px)`, gap }}
                        >
                            {rowItems.map((item, itemIndex) => (
                                <div key={getItemKey(item, start + itemIndex)} className="shrink-0" style={{ width: itemSize, height: itemSize }}>
                                    {renderItem(item, start + itemIndex)}
                                </div>
                            ))}
                        </div>
                    );
                })}
                {isLoadingMore && (
                    <div
                        className="absolute left-0 flex items-center justify-center w-full text-xs text-white"
                        style={{ top: totalSize, height: rowSize }}
                    >
                        {loadingIndicator ?? 'Loading…'}
                    </div>
                )}
            </div>
        </Scrollbar>
    );
};
