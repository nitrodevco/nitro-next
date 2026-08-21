import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { Fragment, type Key, type ReactElement, useEffect, useState } from 'react';

import { Box } from './Box';
import { ScrollbarVertical } from './ScrollbarVertical';
import { ScrollViewport } from './utils/ScrollViewport';
import { useRowVirtualizer } from './utils/useRowVirtualizer';
import { useScrollController } from './utils/useScrollController';

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
}

/**
 * Pixi port of theme/InfiniteGrid.tsx. DOM measures the real scroll viewport's width via
 * `ResizeObserver` (debounced 10ms, forced on first measurement) to pick a column count, then
 * virtualizes ROWS (not individual items) with `@tanstack/react-virtual` in measured-height
 * mode. Pixi has neither a DOM element for `ResizeObserver`/react-virtual's `getScrollElement`
 * to target nor a `ResizeObserver` equivalent, so both are replaced with the same
 * `requestAnimationFrame` + `.layout.computedLayout` polling this package already uses
 * elsewhere (see useScrollController.ts, useRowVirtualizer.ts) - close enough to the DOM
 * version's ~10ms debounce that no separate debounce is needed on top of it.
 */
export const InfiniteGrid = <T,>({ items, itemWidth = 45, overrideColumnCount = 0, itemRender, getKey }: InfiniteGridProps<T>) => {
    const [viewportNode, setViewportNode] = useState<PixiContainer | null>(null);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        if (!viewportNode) return;

        let raf = 0;
        const tick = () => {
            const width = viewportNode.layout?.computedLayout?.width ?? viewportNode.width ?? 0;
            const height = viewportNode.layout?.computedLayout?.height ?? viewportNode.height ?? 0;
            setViewportWidth(prev => (Math.abs(prev - width) > 0.5 ? width : prev));
            setViewportHeight(prev => (Math.abs(prev - height) > 0.5 ? height : prev));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [viewportNode]);

    const columnCount = overrideColumnCount || Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, Math.ceil(viewportWidth / (itemWidth + 4)))) || MIN_COLUMNS;
    const rowCount = Math.ceil(items.length / (columnCount || 1)) || 1;

    const scroll = useScrollController({ orientation: 'vertical' });
    const { virtualItems, totalSize, measureRow } = useRowVirtualizer({
        count: rowCount,
        estimateSize: itemWidth,
        overscan: OVERSCAN,
        viewportHeight,
        scrollOffset: scroll.scrollOffset,
        gap: ROW_GAP,
    });

    return (
        <Box layout={{ flexDirection: 'row', flex: 1, gap: 2, padding: 4 }}>
            <ScrollViewport
                viewportRef={node => { scroll.viewportRef(node); setViewportNode(node); }}
                contentRef={scroll.contentRef}
                onWheel={scroll.onWheel}
                scrollOffset={scroll.scrollOffset}
                orientation="vertical"
                layout={{ flex: 1, height: '100%', padding: 2 }}
                contentLayout={{ position: 'relative', width: '100%', height: totalSize }}
            >
                {virtualItems.map(row => (
                    <Box
                        key={row.index}
                        ref={node => measureRow(row.index, node)}
                        layout={{ position: 'absolute', top: row.start, left: 0, width: '100%', flexDirection: 'row', gap: 4 }}
                    >
                        {Array.from({ length: columnCount }).map((_, i) => {
                            const item = items[i + (row.index * columnCount)];
                            if (!item) return null;

                            return (
                                <Fragment key={getKey(item)}>
                                    {itemRender(item, i) ?? null}
                                </Fragment>
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
