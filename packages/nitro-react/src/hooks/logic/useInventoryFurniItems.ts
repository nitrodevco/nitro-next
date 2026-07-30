import type { IFurnitureData } from '@nitrodevco/nitro-api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useFurnitureDataStore } from '#base/stores';

export type InventoryFurniItem = {
    id: number;
    className: string;
};

const PAGE_SIZE = 30;
/**
 * `FurniListEventMessage` (nitro-shared) doesn't parse its item array yet — the inventory
 * packet/composer pair is still a stub. Until that's wired up, synthesize slots by cycling
 * through real catalog classnames (so icons render for real) up to this mock total, paginated
 * the same way a real inventory fetch would be.
 */
const MOCK_TOTAL = 240;
const MOCK_FETCH_DELAY_MS = 300;

export const useInventoryFurniItems = () => {
    const floorItems = useFurnitureDataStore((state) => state.floorItems);
    const classNames = useMemo(() => Array.from(floorItems.values()).map((item: IFurnitureData) => item.className), [floorItems]);

    const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (pendingTimeoutRef.current != null) clearTimeout(pendingTimeoutRef.current);
    }, []);

    const items = useMemo<InventoryFurniItem[]>(() => {
        if (!classNames.length) return [];

        const count = Math.min(loadedCount, MOCK_TOTAL);

        return Array.from({ length: count }, (_, index) => ({
            id: index,
            className: classNames[index % classNames.length],
        }));
    }, [classNames, loadedCount]);

    const hasMore = classNames.length > 0 && items.length < MOCK_TOTAL;

    const loadMore = useCallback(() => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);

        pendingTimeoutRef.current = setTimeout(() => {
            pendingTimeoutRef.current = null;
            setLoadedCount((count) => Math.min(count + PAGE_SIZE, MOCK_TOTAL));
            setIsLoadingMore(false);
        }, MOCK_FETCH_DELAY_MS);
    }, [isLoadingMore, hasMore]);

    return { items, hasMore, isLoadingMore, loadMore };
};
