/**
 * `com.sulake.habbo.roomevents.common.PagedTableView`, the base of the wired menu's paged
 * windows (`WiredRoomLogListView`, `VariableManagementOverviewView`; `WiredTransactionLogsView`
 * carries a copy of the same code): a `TableView` over a pagination footer.
 *
 * This renders what those windows' layouts (`logs_overview_xml`,
 * `variables_management_overview_xml`, `transaction_overview_xml`) hold in `table_view` and in
 * `footer`; the frame, the header and the filters are the window's. The three layouts agree on
 * every number used here: `table_view` is inset 14px from the frame on both sides, the footer is
 * 60 high and ends 2px above the content box's bottom, with the 30 high `pagination` row 16 down, the 50x30 first/previous buttons start 17
 * from the left with 13 between them, next/last end 17 from the right with 10 between them, and
 * the "N found. Showing page [ ] of M" row is centred, 4 down, 2 between its three parts. Its
 * texts are style 3 without a `text_style` var (`u_regular`), and `pagina_number_input` is a
 * `border="true"` field whose `background="true"` fills it in `TextField.backgroundColor`'s own
 * white, the layout giving it no colour of its own.
 *
 * It is controlled: the caller says which page is shown and how many there are, and gets
 * `onRequestPage` when the user asks for another one and the rate limiter agrees
 * (`useWiredPageRequests`). What is ported from the Flash class:
 * - `onPageLoaded`: the four buttons go through `Util.disableSection` at the first and the last
 *   page - a `container_button` is disabled (no input, the skin's disabled face) and the icons
 *   in it drop to half their blend; the paging text is split on `%page%`; the input shows the
 *   current page.
 * - `onPageInputDown` / `onPageInputClickAway` / `navigateToInputPage`: digits only, Enter or
 *   leaving the field clamps what was typed into 1..last and asks for that page.
 * - `onFirstPageClick` ... `onLastPageClick`, `requestPage`, `canRequestNewPage`.
 *
 * The refresh button (`refresh_btn`, a 62x30 `Button variant="3"`) and the loading icon
 * (`searching_icon`, see `WiredLoadingIcon`) are not in the footer in any of the layouts but at
 * window-specific places in the header, so the window renders them. For the button to share
 * this table's limiter the window calls `useWiredPageRequests` itself, passes the result as
 * `requests` and wires the button to `requests.refresh`. Note that `onPageRequested`, the only
 * thing in `PagedTableView` that shows the loading icon, is never called by either subclass;
 * only `WiredTransactionLogsView` shows it, from its own `requestPage`.
 *
 * Until the first page arrives (`currentPage` of -1) Flash shows the layout's placeholder
 * captions; this shows no paging text, a "1" in the field and all four buttons enabled, which
 * is the state the layout starts in.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, BoxLayout, ContainerButton, Icon, TextInput, ThemeText } from '#base/theme';

import { useWiredPageRequests, WiredPageRequests } from './useWiredPageRequests';
import { calculateLastPage, clampInputPage, NO_PAGE, parseInputPage, restrictPageInput, splitPagingText } from './wiredPaging';
import { WiredTableView, WiredTableViewProps } from './WiredTableView';

/** `footer` and the `pagination` row in it. */
const FOOTER_HEIGHT = 60;
/** The content box (`margin_bottom` 0) runs 2px past the footer's bottom edge. */
const FOOTER_BOTTOM = 2;
const PAGINATION_TOP = 16;
const PAGINATION_HEIGHT = 30;
/** `footer_buttons_left` / `footer_buttons_right`. */
const BUTTONS_SIDE_INSET = 17;
const BUTTONS_LEFT_SPACING = 13;
const BUTTONS_RIGHT_SPACING = 10;
const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 30;
/** The page text row: 4 down in `pagination`, `spacing` 2, 17 high `u_regular` texts at blend 0.7, a 21x17 bordered input. */
const PAGE_TEXT_STYLE = 'u_regular';
const PAGE_TEXT_TOP = 4;
const PAGE_TEXT_SPACING = 2;
const PAGE_TEXT_HEIGHT = 17;
const PAGE_TEXT_BLEND = 0.7;
const PAGE_INPUT_WIDTH = 21;
/** `table_view` is at x=13 of `middle`, which is at x=1 of the frame. */
const TABLE_SIDE_INSET = 14;

/** `<icon style="4">` points left, `<icon style="5">` right; both are 10x10 boxes at y=10 tinted `0x00`. */
const ARROW_LEFT = 4;
const ARROW_RIGHT = 5;

interface PageButtonProps {
    arrow: number;
    /** The x of each arrow in the 50x30 button, from the layouts. */
    arrowLefts: readonly number[];
    disabled: boolean;
    onClick: () => void;
}

/** One of `first_page_btn`, `prev_page_btn`, `next_page_btn`, `last_page_btn`, in the state `Util.disableSection` leaves it in. */
const PageButton = ({ arrow, arrowLefts, disabled, onClick }: PageButtonProps) => (
    <ContainerButton
        variant="3"
        disabled={disabled}
        onPointerTap={onClick}
        layout={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT, flexShrink: 0 }}
    >
        {arrowLefts.map(left => (
            <Icon
                key={left}
                variant={arrow}
                tintColor="#000000"
                alpha={disabled ? 0.5 : 1}
                layout={{ position: 'absolute', left, top: 10, width: 10, height: 10 }}
            />
        ))}
    </ContainerButton>
);

export interface WiredPagedTableProps<T extends object> extends Omit<WiredTableViewProps<T>, 'layout'> {
    /** `currentPage()`: 1-based, `-1` while no page has arrived. */
    currentPage: number;
    /** `totalEntries()`, for the paging text and - with `pageSize` - the last page. */
    totalEntries: number;
    /** The window's `PAGE_SIZE` (50 for the room logs and the variable holders, 25 for the transactions). */
    pageSize?: number;
    /** `calculateLastPage()`, when the caller would rather say it than have it worked out from `totalEntries` and `pageSize`. */
    lastPage?: number;
    /** `pagingTextKey()`: a localization with `%page%` where the input goes, plus the entries token and `%page_count%`. */
    pagingTextKey: string;
    /** `%entries_count%` unless said otherwise; the transactions text uses `%transaction_count%`. */
    entriesToken?: string;
    /** Identifies the page data being shown (the store's page object): a new one is a `displayNewPage`. */
    pageKey?: unknown;
    /** `requestPageRatelimit()`, 200 ms by default. Ignored when `requests` is given. */
    requestPageRatelimit?: number;
    /** The constructor's fourth argument, on by default. Ignored when `requests` is given. */
    samePageTimeout?: boolean;
    /** See `WiredPageRequestsOptions.pageLoadedOnRequest`. Ignored when `requests` is given. */
    pageLoadedOnRequest?: boolean;
    /** The window's own `useWiredPageRequests`, when its header shares the limiter (refresh button, filters). */
    requests?: WiredPageRequests;
    /** Sends the page request. Not called when `requests` is given - that hook has its own. */
    onRequestPage?: (page: number) => void;
    /** The space between the frame's edge and the table, 14 in all three layouts. */
    tableSideInset?: number;
    /** The box that holds `middle` and `footer`: the frame's full width, from the header's end to the frame's bottom. Fills its flex parent when omitted. */
    layout?: BoxLayout;
}

export const WiredPagedTable = <T extends object>({ currentPage, totalEntries, pageSize, lastPage: givenLastPage, pagingTextKey, entriesToken, pageKey, requestPageRatelimit, samePageTimeout, pageLoadedOnRequest, requests: givenRequests, onRequestPage, tableSideInset = TABLE_SIDE_INSET, layout, scrollResetKey, ...tableProps }: WiredPagedTableProps<T>) => {
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

    return (
        <Box layout={{ flex: 1, minWidth: 0, minHeight: 0, flexDirection: 'column', ...layout }}>
            <Box layout={{ flex: 1, minHeight: 0, flexDirection: 'column', paddingLeft: tableSideInset, paddingRight: tableSideInset }}>
                <WiredTableView
                    {...tableProps}
                    scrollResetKey={scrollResetKey ?? currentPage}
                />
            </Box>
            <Box layout={{ width: '100%', height: FOOTER_HEIGHT, flexShrink: 0, marginBottom: FOOTER_BOTTOM }}>
                <Box layout={{ position: 'absolute', left: 0, right: 0, top: PAGINATION_TOP, height: PAGINATION_HEIGHT }}>
                    <Box layout={{ position: 'absolute', left: BUTTONS_SIDE_INSET, top: 0, height: BUTTON_HEIGHT, flexDirection: 'row', gap: BUTTONS_LEFT_SPACING }}>
                        <PageButton
                            arrow={ARROW_LEFT}
                            arrowLefts={[ 18, 27 ]}
                            disabled={atFirstPage}
                            onClick={requests.requestFirstPage}
                        />
                        <PageButton
                            arrow={ARROW_LEFT}
                            arrowLefts={[ 22 ]}
                            disabled={atFirstPage}
                            onClick={requests.requestPreviousPage}
                        />
                    </Box>
                    <Box layout={{ position: 'absolute', right: BUTTONS_SIDE_INSET, top: 0, height: BUTTON_HEIGHT, flexDirection: 'row', gap: BUTTONS_RIGHT_SPACING }}>
                        <PageButton
                            arrow={ARROW_RIGHT}
                            arrowLefts={[ 23 ]}
                            disabled={atLastPage}
                            onClick={requests.requestNextPage}
                        />
                        <PageButton
                            arrow={ARROW_RIGHT}
                            arrowLefts={[ 18, 27 ]}
                            disabled={atLastPage}
                            onClick={requests.requestLastPage}
                        />
                    </Box>
                    <Box layout={{ position: 'absolute', left: 0, right: 0, top: PAGE_TEXT_TOP, height: PAGE_TEXT_HEIGHT, flexDirection: 'row', justifyContent: 'center', gap: PAGE_TEXT_SPACING }}>
                        <ThemeText
                            text={pagingText?.start ?? ''}
                            textStyle={PAGE_TEXT_STYLE}
                            alpha={PAGE_TEXT_BLEND}
                            verticalAlign="top"
                            layout={{ height: PAGE_TEXT_HEIGHT }}
                        />
                        <TextInput
                            value={inputText}
                            onChange={value => setInputText(restrictPageInput(value))}
                            onEnter={navigateToInputPage}
                            onFocusChange={(focused) => {
                                if (!focused) navigateToInputPage();
                            }}
                            textStyle={PAGE_TEXT_STYLE}
                            flashPlacement
                            border="#000000"
                            backgroundColor="#ffffff"
                            focusedBackgroundColor="#ffffff"
                            layout={{ width: PAGE_INPUT_WIDTH, height: PAGE_TEXT_HEIGHT, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={pagingText?.end ?? ''}
                            textStyle={PAGE_TEXT_STYLE}
                            alpha={PAGE_TEXT_BLEND}
                            verticalAlign="top"
                            layout={{ height: PAGE_TEXT_HEIGHT }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
