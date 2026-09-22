import { Container as PixiContainer } from 'pixi.js';
import { Key, ReactElement, useEffect, useState } from 'react';

import { Box } from './Box';
import { useLayoutSize, useRowVirtualizer, useScrollController } from './hooks';
import { ScrollbarVertical } from './ScrollbarVertical';
import { ITEM_GRID_SCROLLBAR_WIDTH, itemGridColumnCount, ItemGridLayout, ScrollViewport } from './utils';

const MIN_COLUMNS = 1;
const MAX_COLUMNS = 12;
const OVERSCAN = 1;

export interface InfiniteGridProps<T> {
    items: T[];
    itemWidth?: number;
    overrideColumnCount?: number;
    /**
     * Lays the grid out as Flash's `scrollable_itemgrid_vertical` does, in place of splitting the
     * width evenly: fixed cells with `spacing` between them, as many columns as
     * `itemGridColumnCount` opens in the grid's width (`overrideColumnCount` still wins), and the
     * 17px scrollbar flush against the grid's right edge. The grid keeps its width when the bar
     * hides (`ScrollableItemGridWindow` only hides `_SCROLLBAR`), and rows are still virtualised.
     */
    itemGrid?: ItemGridLayout;
    /** The scrollbar's style: the scrollable item grid's own `style` (0 or 3). Defaults to 3. */
    scrollbarVariant?: string;
    itemRender: (item: T, index?: number) => ReactElement;
    getKey: (item: T) => Key;
    scrollResetKey?: unknown;
}

/**
 * A virtualised, vertically scrolling grid of items: only the rows in view (and `OVERSCAN` either
 * side) are mounted. By default the grid's width is split evenly between
 * `ceil(width / (itemWidth + 4))` columns (clamped to [MIN_COLUMNS, MAX_COLUMNS]) with 2px gaps;
 * with `itemGrid` it is Flash's `ItemGridController` layout instead - see `ItemGridLayout`.
 */
// The trailing comma below disambiguates a generic arrow function's `<T,>` from a JSX opening
// tag in a .tsx file.
// eslint-disable-next-line @stylistic/comma-dangle
export const InfiniteGrid = <T,>({ items, itemWidth = 45, overrideColumnCount = 0, itemGrid, scrollbarVariant = '3', itemRender, getKey, scrollResetKey }: InfiniteGridProps<T>) => {
    const [ viewportNode, setViewportNode ] = useState<PixiContainer | null>(null);
    const { width: viewportWidth, height: viewportHeight } = useLayoutSize(viewportNode);

    const spacing = itemGrid?.spacing ?? 0;
    const rowSpacing = itemGrid?.verticalSpacing ?? spacing;
    const columnCount = overrideColumnCount
        || (itemGrid ? itemGridColumnCount(viewportWidth, itemGrid.width, spacing) : Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, Math.ceil(viewportWidth / (itemWidth + 4)))))
        || MIN_COLUMNS;
    const rowCount = Math.ceil(items.length / (columnCount || 1)) || 1;

    const scroll = useScrollController({ orientation: 'vertical' });
    const scrollTo = scroll.scrollTo;

    useEffect(() => {
        scrollTo(0);
    }, [ scrollResetKey, scrollTo ]);

    // The measured rows are the default layout's; an item grid's rows are all one height, so
    // their window is worked out directly below and the virtualizer is left idle.
    const { virtualItems, totalSize, measureRow } = useRowVirtualizer({
        count: itemGrid ? 0 : rowCount,
        estimateSize: itemWidth,
        overscan: OVERSCAN,
        viewportHeight,
        scrollOffset: scroll.scrollOffset,
        gap: 2,
    });

    const scrollbar = (
        <ScrollbarVertical
            trackRef={scroll.trackRef}
            scrollOffset={scroll.scrollOffset}
            thumbSize={scroll.thumbSize}
            thumbOffset={scroll.thumbOffset}
            scrollable={scroll.scrollable}
            onTrackPointerDown={scroll.onTrackPointerDown}
            onThumbPointerDown={scroll.onThumbPointerDown}
            stepBackward={scroll.stepBackward}
            stepForward={scroll.stepForward}
            variant={scrollbarVariant}
            layout={itemGrid ? { width: ITEM_GRID_SCROLLBAR_WIDTH, height: '100%' } : undefined}
        />
    );

    if (itemGrid) {
        const rowPitch = itemGrid.height + rowSpacing;
        const gridRows = Math.ceil(items.length / columnCount);
        const gridHeight = (gridRows > 0) ? ((gridRows * itemGrid.height) + ((gridRows - 1) * rowSpacing)) : 0;
        const firstRow = Math.max(0, Math.floor(scroll.scrollOffset / rowPitch) - OVERSCAN);
        const lastRow = Math.min(gridRows, Math.ceil((scroll.scrollOffset + viewportHeight) / rowPitch) + OVERSCAN);
        const cells: ReactElement[] = [];

        for (let row = firstRow; row < lastRow; row++) {
            for (let column = 0; column < columnCount; column++) {
                const index = (row * columnCount) + column;

                if (index >= items.length) break;

                const item = items[index];

                cells.push(
                    <Box
                        key={getKey(item)}
                        layout={{ position: 'absolute', left: column * (itemGrid.width + spacing), top: row * rowPitch, width: itemGrid.width, height: itemGrid.height }}
                    >
                        {itemRender(item, index) ?? null}
                    </Box>,
                );
            }
        }

        return (
            <Box layout={{ flexDirection: 'row', flex: 1 }}>
                <ScrollViewport
                    viewportRef={(node) => {
                        scroll.viewportRef(node);
                        setViewportNode(node);
                    }}
                    contentRef={scroll.contentRef}
                    onWheel={scroll.onWheel}
                    scrollOffset={scroll.scrollOffset}
                    orientation="vertical"
                    layout={{ flex: 1, height: '100%' }}
                    contentLayout={{ position: 'relative', width: '100%', height: gridHeight }}
                >
                    {cells}
                </ScrollViewport>
                <Box layout={{ width: ITEM_GRID_SCROLLBAR_WIDTH, height: '100%', flexShrink: 0 }}>
                    {scrollbar}
                </Box>
            </Box>
        );
    }

    return (
        <Box layout={{ flexDirection: 'row', flex: 1, gap: 2 }}>
            <ScrollViewport
                viewportRef={(node) => {
                    scroll.viewportRef(node);
                    setViewportNode(node);
                }}
                contentRef={scroll.contentRef}
                onWheel={scroll.onWheel}
                scrollOffset={scroll.scrollOffset}
                orientation="vertical"
                layout={{ flex: 1, height: '100%' }}
                contentLayout={{ position: 'relative', width: '100%', height: totalSize }}
            >
                {virtualItems.map(row => (
                    <Box
                        key={row.index}
                        ref={node => measureRow(row.index, node)}
                        layout={{ position: 'absolute', top: row.start, left: 0, width: '100%', flexDirection: 'row' }}
                    >
                        {Array.from({ length: columnCount }).map((_, i) => {
                            const index = i + (row.index * columnCount);
                            const item = index < items.length ? items[index] : undefined;

                            // A fixed-width flex row has no equivalent of DOM's `grid-cols-N`
                            // column tracks, which stay equally sized regardless of how many
                            // cells actually have content. `flexBasis: 0, flexGrow: 1` divides
                            // the row's available width evenly among however many item slots
                            // are rendered (matching react's default `flexShrink: 0` this
                            // library ports from Yoga, not CSS's `1`, so items must grow into
                            // place rather than shrink) - an empty slot must still be rendered
                            // for a missing trailing item so the real items keep the same width
                            // as every other row instead of stretching to fill the gap.
                            return (
                                <Box
                                    key={item !== undefined ? getKey(item) : i}
                                    layout={{ flexBasis: 0, flexGrow: 1 }}
                                >
                                    {item !== undefined && (itemRender(item, i) ?? null)}
                                </Box>
                            );
                        })}
                    </Box>
                ))}
            </ScrollViewport>
            {scrollbar}
        </Box>
    );
};
