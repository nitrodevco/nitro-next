/**
 * The arithmetic of `com.sulake.habbo.roomevents.common.PagedTableView`, free of React so it can
 * be read against the Flash class line by line: the last page of a result set, the clamping of a
 * typed page number, the split of the paging text around `%page%`, and the request rate limiter.
 *
 * Time never comes from here - every function that needs "now" takes it as an argument, the way
 * Flash reads `getTimer()` at the top of `requestPage` / `canRequestNewPage`. The caller reads the
 * clock inside an event handler (see `useWiredPageRequests`).
 */

/** `PagedTableView.requestPageRatelimit()`: the default gap between two page requests, in ms. */
export const REQUEST_PAGE_RATELIMIT = 200;

/** `PagedTableView.REQUEST_SAME_PAGE_TIMEOUT`: how long the page that is already in flight stays blocked, in ms. */
export const REQUEST_SAME_PAGE_TIMEOUT = 2000;

/** What `currentPage()` / `calculateLastPage()` / `totalEntries()` answer while no page has arrived yet. */
export const NO_PAGE = -1;

/**
 * The subclasses' `calculateLastPage()`: `Math.max(totalEntries - 1, 0) / PAGE_SIZE + 1` handed
 * back as an `int`, so an empty result still has a page 1.
 */
export const calculateLastPage = (totalEntries: number, pageSize: number): number => {
    if (totalEntries < 0 || pageSize <= 0) return NO_PAGE;

    return Math.trunc((Math.max(totalEntries - 1, 0) / pageSize) + 1);
};

/** The `pageNumberInput.restrict = "0-9"` of the constructor. */
export const restrictPageInput = (text: string): string => text.replace(/[^0-9]/g, '');

/** The `int(pageNumberInput.text)` of `PagedTableView.navigateToInputPage`: an empty field is 0. */
export const parseInputPage = (text: string): number => {
    const typed = Number.parseInt(text, 10);

    return Number.isFinite(typed) ? typed : 0;
};

/**
 * The clamping half of `PagedTableView.navigateToInputPage`: below 1 becomes 1, above the last
 * page becomes the last page. Flash writes the number back into the field only when it had to
 * clamp it, so the caller compares the result with what it passed in.
 */
export const clampInputPage = (page: number, lastPage: number): number => {
    if (page < 1) return 1;
    if (page > lastPage) return lastPage;

    return page;
};

export interface WiredPagingText {
    /** `pagina_text_start`: everything before `%page%`, with the entries token filled in. */
    start: string;
    /** `pagina_text_end`: everything after `%page%`, with `%page_count%` filled in. */
    end: string;
}

/**
 * The text half of `PagedTableView.onPageLoaded`: the localization is split on `%page%` (the
 * input field stands where the token was) and only used when that leaves exactly two halves.
 * `entriesToken` is `%entries_count%` there; `WiredTransactionLogsView`, which carries its own
 * copy of this code, spells it `%transaction_count%`.
 */
export const splitPagingText = (text: string, totalEntries: number, lastPage: number, entriesToken: string = '%entries_count%'): WiredPagingText | null => {
    const halves = text.split('%page%');

    if (halves.length !== 2) return null;

    return {
        start: halves[0].replace(entriesToken, String(totalEntries)),
        end: halves[1].replace('%page_count%', String(lastPage)),
    };
};

/** The two private fields `requestPage` keeps: the page asked for last and when it was asked. */
export interface WiredPageRequestState {
    requestedPage: number;
    lastRequestTime: number;
}

export const createPageRequestState = (): WiredPageRequestState => ({ requestedPage: NO_PAGE, lastRequestTime: 0 });

/**
 * `PagedTableView.canRequestNewPage`: nothing within `ratelimit` ms of the last request, and -
 * when the constructor's fourth argument left the same-page timeout on - not the page that is
 * already in flight within `REQUEST_SAME_PAGE_TIMEOUT`.
 */
export const canRequestNewPage = (state: WiredPageRequestState, samePage: boolean, now: number, ratelimit: number, samePageTimeout: boolean): boolean => {
    if (state.lastRequestTime > (now - ratelimit)) return false;
    if (samePageTimeout && samePage && (state.lastRequestTime > (now - REQUEST_SAME_PAGE_TIMEOUT))) return false;

    return true;
};

/** `PagedTableView.requestPage`: the gate, then the bookkeeping. `true` when the request may be sent. */
export const tryRequestPage = (state: WiredPageRequestState, page: number, now: number, ratelimit: number, samePageTimeout: boolean): boolean => {
    if (!canRequestNewPage(state, page === state.requestedPage, now, ratelimit, samePageTimeout)) return false;

    state.requestedPage = page;
    state.lastRequestTime = now;

    return true;
};

/** The bookkeeping half of `PagedTableView.onPageLoaded`: the page in flight has arrived. */
export const markPageLoaded = (state: WiredPageRequestState, currentPage: number): void => {
    if (currentPage === state.requestedPage) state.requestedPage = NO_PAGE;
};
