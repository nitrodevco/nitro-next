import { useVirtualizer } from '@tanstack/react-virtual';
import {
    Fragment,
    type Key,
    type ReactElement,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { ScrollbarVertical } from './ScrollbarVertical';

export const InfiniteGrid = <T,>(props: {
    items: T[];
    itemWidth?: number;
    minHeight?: number;
    horizontalGap?: number;
    verticalGap?: number;
    overrideColumnCount?: number;
    itemRender: (item: T, index?: number) => ReactElement;
    getKey: (item: T) => Key;
}) => {
    const {
        items = [],
        itemWidth = 45,
        minHeight = 45,
        horizontalGap = 4,
        verticalGap = 4,
        overrideColumnCount = 0,
        itemRender,
        getKey,
    } = props;
    const [columnCount, setColumnCount] = useState(1);
    const elementRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const rowCount = Math.ceil(items.length / columnCount);
    const rowPitch = minHeight + verticalGap;

    const virtualizer = useVirtualizer({
        count: rowCount,
        overscan: 1,
        getScrollElement: () => elementRef.current,
        estimateSize: () => rowPitch,
    });

    useLayoutEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        const updateColumnCount = (width: number) => {
            const nextColumnCount =
                overrideColumnCount ||
                Math.max(
                    1,
                    Math.floor(
                        (Math.floor(width) + horizontalGap) /
                            (itemWidth + horizontalGap),
                    ),
                );

            setColumnCount(nextColumnCount);
        };

        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];

            if (entry) updateColumnCount(entry.contentRect.width);
        });

        resizeObserver.observe(element);

        const initialSize = element.getBoundingClientRect();

        updateColumnCount(initialSize.width);

        return () => resizeObserver.disconnect();
    }, [horizontalGap, itemWidth, overrideColumnCount]);

    const contentHeight = Math.max(
        0,
        virtualizer.getTotalSize() - (rowCount ? verticalGap : 0),
    );

    return (
        <div className="flex size-full min-h-0 min-w-0 p-1 overflow-hidden">
            <div
                ref={elementRef}
                className="min-h-0 min-w-0 flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
                <div
                    ref={contentRef}
                    className="relative w-full"
                    style={{
                        height: `${contentHeight}px`,
                    }}
                >
                    {virtualizer.getVirtualItems().map(virtualRow => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                            className="grid absolute top-0 left-0"
                            style={{
                                width: `${columnCount * itemWidth + Math.max(0, columnCount - 1) * horizontalGap}px`,
                                height: `${minHeight + (virtualRow.index < rowCount - 1 ? verticalGap : 0)}px`,
                                gridTemplateColumns: `repeat(${columnCount}, ${itemWidth}px)`,
                                gridTemplateRows: `${minHeight}px`,
                                columnGap: `${horizontalGap}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            {Array.from({ length: columnCount }, (_, i) => {
                                const item = items[i + virtualRow.index * columnCount];

                                if (!item) return null;

                                return (
                                    <Fragment key={getKey(item)}>
                                        {itemRender(item, i)}
                                    </Fragment>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <ScrollbarVertical
                viewportRef={elementRef}
                contentRef={contentRef}
                variant="3"
            />
        </div>
    );
};
