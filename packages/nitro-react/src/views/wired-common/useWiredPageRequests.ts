/**
 * The requesting side of `com.sulake.habbo.roomevents.common.PagedTableView` as a hook: the
 * rate limited `requestPage`, `canRequestNewPage`, and the five click handlers that feed it
 * (`onFirstPageClick`, `onPreviousPageClick`, `onNextPageClick`, `onLastPageClick`,
 * `onRefreshClick`).
 *
 * `WiredPagedTable` owns one of these by itself. A window calls the hook on its own and hands
 * the result to the table (`requests`) when something outside the footer has to go through the
 * same limiter - Flash keeps the refresh button and the filter menus in each window's header,
 * and `WiredRoomLogListView.onSelectFilter` / `VariableManagementOverviewView.onSelectedFilter`
 * ask `canRequestNewPage(false)` before they let a filter change through.
 *
 * The clock (`getTimer()` in Flash, `performance.now()` here) is only ever read inside the
 * returned functions, which run from event handlers; the limiter's two fields live in a ref.
 */
import { useEffect, useRef } from 'react';

import { canRequestNewPage, createPageRequestState, markPageLoaded, NO_PAGE, REQUEST_PAGE_RATELIMIT, tryRequestPage } from './wiredPaging';

export interface WiredPageRequestsOptions {
    /** `currentPage()`: the page being shown, `-1` (`NO_PAGE`) while none has arrived. */
    currentPage: number;
    /** `calculateLastPage()`, `-1` while no page has arrived. */
    lastPage: number;
    /**
     * Identifies the page data being shown - pass the page object from the store. Every change
     * is a `displayNewPage`, which is when Flash runs `onPageLoaded` and lets go of the page
     * that was in flight; without it only a change of `currentPage` does.
     */
    pageKey?: unknown;
    /** `requestPageRatelimit()`: 200 by default, 190 for the room logs, 280 for the variable holders. */
    ratelimit?: number;
    /** The constructor's fourth argument: block the page already in flight for 2000 ms. The room logs turn it off. */
    samePageTimeout?: boolean;
    /**
     * Both `PagedTableView` subclasses call `onPageLoaded()` straight after sending, which lets
     * go of the requested page at once when it is the one on screen - so a refresh is only held
     * back by `ratelimit`, never by the same-page timeout. `WiredTransactionLogsView` does not,
     * and there a refresh does wait out the 2000 ms; it passes `false`.
     */
    pageLoadedOnRequest?: boolean;
    /** Sends the request. Only called once the limiter has let the page through. */
    onRequestPage: (page: number) => void;
}

export interface WiredPageRequests {
    /** `canRequestNewPage(samePage)` - for a filter change, which asks with `false`. */
    canRequestNewPage: (samePage: boolean) => boolean;
    /** `requestPage(page)`: `true` when the limiter let it through and `onRequestPage` was called. */
    requestPage: (page: number) => boolean;
    /** `onFirstPageClick`. */
    requestFirstPage: () => boolean;
    /** `onPreviousPageClick`. */
    requestPreviousPage: () => boolean;
    /** `onNextPageClick`. */
    requestNextPage: () => boolean;
    /** `onLastPageClick`. */
    requestLastPage: () => boolean;
    /** `onRefreshClick`: the current page again. */
    refresh: () => boolean;
    /** The option of the same name, for the page input: a sent request puts the current page back into the field at once. */
    pageLoadedOnRequest: boolean;
}

export const useWiredPageRequests = ({ currentPage, lastPage, pageKey, ratelimit = REQUEST_PAGE_RATELIMIT, samePageTimeout = true, pageLoadedOnRequest = true, onRequestPage }: WiredPageRequestsOptions): WiredPageRequests => {
    const state = useRef(createPageRequestState());

    // PagedTableView.onPageLoaded - a page has been displayed.
    useEffect(() => {
        markPageLoaded(state.current, currentPage);
    }, [ currentPage, pageKey ]);

    const requestPage = (page: number): boolean => {
        if (!tryRequestPage(state.current, page, performance.now(), ratelimit, samePageTimeout)) return false;

        onRequestPage(page);

        if (pageLoadedOnRequest) markPageLoaded(state.current, currentPage);

        return true;
    };

    return {
        canRequestNewPage: samePage => canRequestNewPage(state.current, samePage, performance.now(), ratelimit, samePageTimeout),
        requestPage,
        requestFirstPage: () => requestPage(1),
        requestPreviousPage: () => ((currentPage === NO_PAGE) ? false : requestPage(currentPage - 1)),
        requestNextPage: () => ((currentPage === NO_PAGE) ? false : requestPage(currentPage + 1)),
        requestLastPage: () => ((lastPage === NO_PAGE) ? false : requestPage(lastPage)),
        refresh: () => ((currentPage === NO_PAGE) ? false : requestPage(currentPage)),
        pageLoadedOnRequest,
    };
};
