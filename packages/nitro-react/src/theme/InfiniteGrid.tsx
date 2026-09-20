import { Container as PixiContainer } from 'pixi.js';
import { Key, ReactElement, useEffect, useState } from 'react';

import { Box } from './Box';
import { useLayoutSize, useRowVirtualizer, useScrollController } from './hooks';
import { ScrollbarVertical } from './ScrollbarVertical';
import { ScrollViewport } from './utils';

const MIN_COLUMNS = 1;
const MAX_COLUMNS = 12;
const ROW_GAP = 4;
const OVERSCAN = 1;

export interface InfiniteGridProps<T> {
    items: T[];
    itemWidth?: number;
    overrideColumnCount?: number;
    itemRender: (item: T, index?: number) => ReactElement;
    getKey: (item: T) => Key;
    scrollResetKey?: unknown;
}

/**
 * DOM counterpart: a real CSS grid inside a native-scroll `ScrollArea`. No virtualizer of any
 * kind - real DOM elements are cheap enough at the item counts a catalog/inventory page
 * actually renders (tens to low hundreds) that reimplementing react-virtual's row-measurement
 * dance here would be complexity with no payoff; Pixi's own row virtualizer exists because
 * *Pixi* render objects are the expensive part there; that cost doesn't exist on this target.
 *
 * `columnCount` is computed with the *exact same* `ResizeObserver`-measured-width formula
 * `InfiniteGrid` uses (`Math.ceil(width / (itemWidth + 4))`, clamped to
 * [MIN_COLUMNS, MAX_COLUMNS]) and rendered as explicit `repeat(columnCount, 1fr)` tracks,
 * rather than letting CSS `grid-template-columns: repeat(auto-fill, minmax(...))` pick its own
 * column count - `auto-fill`'s own packing algorithm doesn't match Pixi's formula (it fits as
 * many `itemWidth`-or-wider tracks as the container allows, which rounds differently than
 * `Math.ceil`), so the two targets disagreed on how many columns fit the same width and showed
 * a different item count per row for identical content.
 */
// The trailing comma below disambiguates a generic arrow function's `<T,>` from a JSX opening
// tag in a .tsx file.
// eslint-disable-next-line @stylistic/comma-dangle
export const InfiniteGrid = <T,>({ items, itemWidth = 45, overrideColumnCount = 0, itemRender, getKey, scrollResetKey }: InfiniteGridProps<T>) => {
    const [ viewportNode, setViewportNode ] = useState<PixiContainer | null>(null);
    const { width: viewportWidth, height: viewportHeight } = useLayoutSize(viewportNode);

    const columnCount = overrideColumnCount || Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, Math.ceil(viewportWidth / (itemWidth + 4)))) || MIN_COLUMNS;
    const rowCount = Math.ceil(items.length / (columnCount || 1)) || 1;

    const scroll = useScrollController({ orientation: 'vertical' });
    const scrollTo = scroll.scrollTo;

    useEffect(() => {
        scrollTo(0);
    }, [ scrollResetKey, scrollTo ]);

    const { virtualItems, totalSize, measureRow } = useRowVirtualizer({
        count: rowCount,
        estimateSize: itemWidth,
        overscan: OVERSCAN,
        viewportHeight,
        scrollOffset: scroll.scrollOffset,
        gap: 2,
    });

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
                variant="3"
            />
        </Box>
    );
};
