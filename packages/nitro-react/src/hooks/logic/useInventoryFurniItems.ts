import type { IFurnitureData } from '@nitrodevco/nitro-api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useFurnitureDataStore } from '#base/stores';

export type InventoryFurniItem = {
    id: number;
    className: string;
};

export type InventoryFurniFilter = 'all' | 'floor' | 'wall';

const PAGE_SIZE = 30;
/**
 * `FurniListEventMessage` (nitro-shared) doesn't parse its item array yet — the inventory
 * packet/composer pair is still a stub. Until that's wired up, synthesize slots by cycling
 * through real catalog classnames (so icons render for real) up to this mock total, paginated
 * the same way a real inventory fetch would be.
 */
const MOCK_TOTAL = 240;
const MOCK_FETCH_DELAY_MS = 300;

export const useInventoryFurniItems = (filter: InventoryFurniFilter = 'all') => {
    const floorItems = useFurnitureDataStore((state) => state.floorItems);
    const wallItems = useFurnitureDataStore((state) => state.wallItems);

    const classNames = useMemo(() => {
        const floorPool: IFurnitureData[] = filter !== 'wall' ? Array.from(floorItems.values()) : [];
        const wallPool: IFurnitureData[] = filter !== 'floor' ? Array.from(wallItems.values()) : [];

        return floorPool.concat(wallPool).map((item) => item.className);
    }, [floorItems, wallItems, filter]);

    const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [prevFilter, setPrevFilter] = useState(filter);
    const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cancels any in-flight mock "fetch" tied to the previous filter — runs on unmount and whenever
    // `filter` changes (before the state reset below takes effect), so a stale timeout can't bump
    // `loadedCount` for a filter that's no longer selected.
    useEffect(() => () => {
        if (pendingTimeoutRef.current != null) clearTimeout(pendingTimeoutRef.current);
    }, [filter]);

    // Reset pagination when the filter changes, following React's "adjust state during render" pattern
    // instead of an effect — https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    if (filter !== prevFilter) {
        setPrevFilter(filter);
        setLoadedCount(PAGE_SIZE);
        setIsLoadingMore(false);
    }

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
