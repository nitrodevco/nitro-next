import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorActions, useWebSocketContext } from '#base/context';

/**
 * HabboNewNavigator.performSearch / performLastSearch — every search goes through
 * the 4000ms NavigatorCache: a hit replays the stored container without a packet,
 * a miss records the search as the last one and sends the composer.
 * performLastSearch (refresh button, window re-open) evicts the entry first so the
 * same search is fetched fresh; it does nothing until a first search has been sent
 * (the last filter starts out null).
 */
export const useNavigatorSearch = () => {
    const { setIsSearching, setPendingSearchText, applySearchResult, getCachedSearch, evictCachedSearch, getLastSearch, setLastSearch } = useNavigatorActions();
    const { send } = useWebSocketContext();

    const performSearch = (searchCode: string, filter: string = '', searchText: string = '') => {
        setIsSearching(true);
        setPendingSearchText(searchText);

        const cached = getCachedSearch(`${searchCode}/${filter}`);

        if (cached) {
            applySearchResult(cached);

            return;
        }

        setLastSearch(searchCode, filter);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: filter }));
    };

    const performLastSearch = () => {
        const last = getLastSearch();

        if (last.filter === null) return;

        evictCachedSearch(`${last.searchCode}/${last.filter}`);

        performSearch(last.searchCode, last.filter);
    };

    return { performSearch, performLastSearch };
}
