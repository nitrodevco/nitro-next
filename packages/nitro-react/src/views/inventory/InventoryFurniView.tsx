import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

import { Border, FurnitureImage, Scrollbar } from '#base/components';
import { Dropmenu } from '#base/components/Dropmenu';
import { useInventoryFurniItems } from '#base/hooks/logic/useInventoryFurniItems';

const COLUMN_COUNT = 4;
const ROW_SIZE = 58;

export const InventoryFurniView = () => {
    const { items, isLoadingMore, loadMore } = useInventoryFurniItems();
    const scrollRef = useRef<HTMLDivElement>(null);

    const rowCount = Math.ceil(items.length / COLUMN_COUNT);

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => ROW_SIZE,
        overscan: 4,
    });

    return (
        <div className="flex flex-col h-full min-h-0 gap-1.5">
            <Border variant="3" tintColor="#CACACA" className="flex gap-1.5 p-1 shrink-0">
                <Border variant="0">
                    <input type="text"></input>
                </Border>
                <Dropmenu variant="100" />
            </Border>
            <Scrollbar
                ref={scrollRef}
                variant="3"
                className="flex-1 min-h-0"
                onScrollEnd={loadMore}
            >
                <div style={{ height: rowVirtualizer.getTotalSize() + (isLoadingMore ? ROW_SIZE : 0), position: 'relative' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const rowItems = items.slice(virtualRow.index * COLUMN_COUNT, virtualRow.index * COLUMN_COUNT + COLUMN_COUNT);

                        return (
                            <div
                                key={virtualRow.key}
                                className="absolute top-0 left-0 flex w-full gap-1"
                                style={{ height: virtualRow.size, transform: `translateY(${virtualRow.start}px)` }}
                            >
                                {rowItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-center rounded bg-black/15 size-13.5">
                                        <FurnitureImage type={item.className} />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    {isLoadingMore && (
                        <div
                            className="absolute left-0 flex items-center justify-center w-full text-xs text-white"
                            style={{ top: rowVirtualizer.getTotalSize(), height: ROW_SIZE }}
                        >
                            Loading…
                        </div>
                    )}
                </div>
            </Scrollbar>
        </div>
    );
}
