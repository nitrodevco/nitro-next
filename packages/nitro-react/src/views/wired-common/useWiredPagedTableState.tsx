/**
 * `PagedTableView`'s state, shared by `WiredPagedTable` (the footer drawn by hand) and the windows
 * drawn from their templates, which bind the layout's own `footer` (`useWiredPagedTableTemplate`).
 */
import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { TemplateBindings } from '#base/theme';
import { TableView } from '#base/views/shared/table/TableView';

import { useWiredPageRequests, WiredPageRequests } from './useWiredPageRequests';
import type { WiredPagedTableProps } from './WiredPagedTable';
import { calculateLastPage, clampInputPage, NO_PAGE, parseInputPage, restrictPageInput, splitPagingText } from './wiredPaging';

/** `PagedTableView`'s paging state: the limiter, the paging text, the page field and the first / last page flags. */
export const usePagedTableState = <T extends object>({ currentPage, totalEntries, pageSize, lastPage: givenLastPage, pagingTextKey, entriesToken, pageKey, requestPageRatelimit, samePageTimeout, pageLoadedOnRequest, requests: givenRequests, onRequestPage }: WiredPagedTableProps<T>) => {
    const t = useTranslation();
    const lastPage = givenLastPage ?? ((pageSize === undefined) ? NO_PAGE : calculateLastPage(totalEntries, pageSize));
    const ownRequests = useWiredPageRequests({ currentPage, lastPage, pageKey, ratelimit: requestPageRatelimit, samePageTimeout, pageLoadedOnRequest, onRequestPage: page => onRequestPage?.(page) });
    const requests = givenRequests ?? ownRequests;
    const hasPage = (currentPage !== NO_PAGE);
    // PagedTableView.loc(pagingTextKey()): a missing key reads as the key itself.
    const pagingText = hasPage ? splitPagingText(t(pagingTextKey, pagingTextKey), totalEntries, lastPage, entriesToken) : null;
    const [ inputText, setInputText ] = useState(hasPage ? String(currentPage) : '1');
    const [ shown, setShown ] = useState({ currentPage, pageKey });

    // PagedTableView.onPageLoaded: a displayed page puts its number into the field - inside the same `if` as the two texts.
    if ((shown.currentPage !== currentPage) || (shown.pageKey !== pageKey)) {
        setShown({ currentPage, pageKey });

        if (pagingText) setInputText(String(currentPage));
    }

    // PagedTableView.navigateToInputPage
    const navigateToInputPage = () => {
        const typed = parseInputPage(inputText);
        const page = clampInputPage(typed, lastPage);

        if (page !== typed) setInputText(String(page));

        if (!hasPage || (page === currentPage)) return;

        // Both subclasses run onPageLoaded() as soon as the request is out, which puts the page still on screen back into the field.
        if (requests.requestPage(page) && requests.pageLoadedOnRequest && pagingText) setInputText(String(currentPage));
    };

    const atFirstPage = hasPage && (currentPage <= 1);
    const atLastPage = hasPage && (currentPage >= lastPage);

    return { requests, pagingText, inputText, setInputText, navigateToInputPage, atFirstPage, atLastPage };
};

/**
 * For a window drawn from its template (`logs_overview_xml` ...): the bindings of the layout's
 * `footer` (`onPageLoaded`, the four buttons, the page field) and the table that goes into its
 * `table_view`.
 */
export const useWiredPagedTableTemplate = <T extends object>(props: WiredPagedTableProps<T>): { requests: WiredPageRequests; bindings: TemplateBindings; table: ReactNode } => {
    const { requests, pagingText, inputText, setInputText, navigateToInputPage, atFirstPage, atLastPage } = usePagedTableState(props);
    const { currentPage, totalEntries: _totalEntries, pageSize: _pageSize, lastPage: _lastPage, pagingTextKey: _pagingTextKey, entriesToken: _entriesToken, pageKey: _pageKey, requestPageRatelimit: _ratelimit, samePageTimeout: _samePageTimeout, pageLoadedOnRequest: _pageLoadedOnRequest, requests: _requests, onRequestPage: _onRequestPage, tableSideInset: _inset, layout: _layout, scrollResetKey, ...tableProps } = props;

    return {
        requests,
        bindings: {
            first_page_btn: { disableSection: atFirstPage, onPointerTap: requests.requestFirstPage },
            prev_page_btn: { disableSection: atFirstPage, onPointerTap: requests.requestPreviousPage },
            next_page_btn: { disableSection: atLastPage, onPointerTap: requests.requestNextPage },
            last_page_btn: { disableSection: atLastPage, onPointerTap: requests.requestLastPage },
            pagina_text_start: { caption: pagingText?.start ?? '' },
            pagina_text_end: { caption: pagingText?.end ?? '' },
            pagina_number_input: {
                caption: inputText,
                restrict: '0-9',
                onChange: value => setInputText(restrictPageInput(value)),
                onEnter: navigateToInputPage,
                onBlur: navigateToInputPage,
            },
        },
        table: (
            <TableView
                {...tableProps}
                scrollResetKey={scrollResetKey ?? currentPage}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        ),
    };
};
