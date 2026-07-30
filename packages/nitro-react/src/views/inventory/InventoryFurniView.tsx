import { useState } from 'react';

import { Border, FurnitureImage, ItemGrid } from '#base/components';
import { Dropmenu, type DropmenuOption } from '#base/components/Dropmenu';
import { type InventoryFurniFilter, type InventoryFurniItem, useInventoryFurniItems } from '#base/hooks/logic/useInventoryFurniItems';

const FILTER_OPTIONS: DropmenuOption[] = [
    { value: 'all', label: 'All items' },
    { value: 'floor', label: 'Floor items' },
    { value: 'wall', label: 'Wall items' },
];

const renderFurniItem = (item: InventoryFurniItem) => (
    <div className="flex items-center justify-center w-full h-full rounded bg-black/15">
        <FurnitureImage type={item.className} />
    </div>
);

export const InventoryFurniView = () => {
    const [filter, setFilter] = useState<InventoryFurniFilter>('all');
    const { items, isLoadingMore, loadMore } = useInventoryFurniItems(filter);

    return (
        <div className="flex flex-col h-full min-h-0 gap-1.5">
            <Border variant="3" tintColor="#CACACA" className="flex gap-1.5 p-1 shrink-0">
                <Border variant="0">
                    <input type="text"></input>
                </Border>
                <Dropmenu
                    variant="100"
                    options={FILTER_OPTIONS}
                    value={filter}
                    onChange={(value) => setFilter(value as InventoryFurniFilter)}
                />
            </Border>
            <ItemGrid
                items={items}
                getItemKey={(item) => item.id}
                renderItem={renderFurniItem}
                isLoadingMore={isLoadingMore}
                onScrollEnd={loadMore}
            />
        </div>
    );
}
