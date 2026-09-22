/**
 * The room's wired log - `WiredRoomLogListView` on `logs_overview_xml`, a `PagedTableView`: a text
 * filter, the source and level menus, auto refresh every 2.5 s (on by default), and the log a page
 * of 50 at a time, each line coloured by its level (`WiredRoomLogListTableObject`).
 *
 * Paging keeps the page's own filters; changing a filter asks for page 1 with the new ones,
 * provided the request limiter (190 ms, no same-page timeout) lets it through - a menu choice it
 * refuses does not happen at all (`WE_SELECT` prevented). A page that the user asked for puts
 * its filters back into the controls and scrolls to the top; an auto refresh leaves both alone.
 *
 * The reference server (turbo-cloud) does not answer `WiredGetRoomLogs`.
 *
 * Every text is style 3 without a `text_style` var (`u_regular`); the three filter labels add
 * `bold`, `info_text` is an `html` window (markup, `leading` 1), and the auto refresh label has
 * neither `word_wrap` nor an `auto_size`, so it stays on one line cut at its 90x29.
 */
import type { IWiredLogEntry, IWiredLogPage } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { closeWiredRoomLogs, requestWiredRoomLogs, WiredRoomLogsRequest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { WIRED_ROOM_LOGS_FRAME_ID, WIRED_ROOM_LOGS_PAGE_SIZE } from '#base/context/wired';
import { Border, Box, CheckBox, Frame, TextInput, ThemeText } from '#base/theme';
import { uintToHexColor } from '#base/wired';

import { useWiredPageRequests } from '../wired-common/useWiredPageRequests';
import { WiredPagedTable } from '../wired-common/WiredPagedTable';
import { calculateLastPage } from '../wired-common/wiredPaging';
import { WiredTableCell, WiredTableColumn } from '../wired-common/WiredTableView';
import { WiredMenuDropmenu } from './WiredMenuDropmenu';

/** `WiredRoomLogListView.REQUEST_PAGE_RATELIMIT` / `REFRESH_TIME`. */
const REQUEST_PAGE_RATELIMIT = 190;
const REFRESH_TIME_MS = 2500;
/** `WiredRoomLogListTableObject.COLORS`, by log level: info, warn, error, debug. */
const LEVEL_COLORS = [ 4607, 11757568, 14362624, 10158534 ].map(uintToHexColor);
/** `filter_input`'s `max_chars`. */
const FILTER_MAX_CHARS = 400;
/** The header above `middle`. */
const HEADER_HEIGHT = 97;
/** The frame's `margin_*` vars: the content box starts under the 33px title bar. */
const FRAME_MARGINS = [ 0, 33, 0, 0 ] as const;

export interface WiredRoomLogsViewProps {
    page: IWiredLogPage;
    /** The page answers a request the user made (`displayNewPage(false)`). */
    pageRequested: boolean;
}

export const WiredRoomLogsView = ({ page, pageRequested }: WiredRoomLogsViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { bringWindowToFront } = useWindowActions();
    const [ source, setSource ] = useState(page.logSourceFilter);
    const [ level, setLevel ] = useState(page.logLevelFilter);
    const [ query, setQuery ] = useState(page.query ?? '');
    const [ autoRefresh, setAutoRefresh ] = useState(true);
    const [ refreshEpoch, setRefreshEpoch ] = useState(0);
    const [ scrollKey, setScrollKey ] = useState(0);
    const [ shownPage, setShownPage ] = useState(page);
    // The filters the next request goes out with; paging and auto refresh leave them at the page's own.
    const nextFilters = useRef<Omit<WiredRoomLogsRequest, 'page'> | null>(null);
    const silentRequest = useRef(false);

    // `displayNewPage(!forced)`: a page the user asked for resets the controls and the scroll.
    if (shownPage !== page) {
        setShownPage(page);

        if (pageRequested) {
            setSource(page.logSourceFilter);
            setLevel(page.logLevelFilter);
            setQuery(page.query ?? '');
            setScrollKey(key => key + 1);
        }
    }

    useEffect(() => {
        if (pageRequested) bringWindowToFront(WIRED_ROOM_LOGS_FRAME_ID);
    }, [ page, pageRequested, bringWindowToFront ]);

    const requests = useWiredPageRequests({
        currentPage: page.currentPage,
        lastPage: calculateLastPage(page.totalEntries, WIRED_ROOM_LOGS_PAGE_SIZE),
        pageKey: page,
        ratelimit: REQUEST_PAGE_RATELIMIT,
        samePageTimeout: false,
        // `requestPageWithFilters`: the page's filters unless new ones were chosen.
        onRequestPage: (requested) => {
            const filters = nextFilters.current ?? { logSourceFilter: page.logSourceFilter, logLevelFilter: page.logLevelFilter, query: page.query ?? '' };

            requestWiredRoomLogs(send, { page: requested, ...filters }, silentRequest.current);
        },
    });

    // `updateFilters` - the auto refresh starts over, and page 1 is asked for with what the controls say.
    const updateFilters = (changes: Partial<{ source: number; level: number; query: string }> = {}) => {
        if (!requests.canRequestNewPage(false)) return;

        setRefreshEpoch(epoch => epoch + 1);

        nextFilters.current = { logSourceFilter: changes.source ?? source, logLevelFilter: changes.level ?? level, query: changes.query ?? query };
        requests.requestPage(1);
        nextFilters.current = null;
    };

    // The timer below outlives renders; it asks through the limiter of the latest one.
    const requestsRef = useRef(requests);

    useEffect(() => {
        requestsRef.current = requests;
    });

    // `onAutoRefresh` - the page on screen with its own filters, quietly. A filter change starts the timer over.
    useEffect(() => {
        if (!autoRefresh) return;

        const timer = setInterval(() => {
            silentRequest.current = true;
            requestsRef.current.refresh();
            silentRequest.current = false;
        }, REFRESH_TIME_MS);

        return () => clearInterval(timer);
    }, [ autoRefresh, refreshEpoch ]);

    const columns: WiredTableColumn[] = [
        { id: 'timestamp', title: t('wiredmenu.logs_overview.col.timestamp', 'wiredmenu.logs_overview.col.timestamp'), widthFactor: 0.2 },
        { id: 'source', title: t('wiredmenu.logs_overview.col.source', 'wiredmenu.logs_overview.col.source'), widthFactor: 0.08 },
        { id: 'level', title: t('wiredmenu.logs_overview.col.level', 'wiredmenu.logs_overview.col.level'), widthFactor: 0.08 },
        { id: 'message', title: t('wiredmenu.logs_overview.col.message', 'wiredmenu.logs_overview.col.message'), widthFactor: 0.64 },
    ];

    // `WiredRoomLogListTableObject.getTableCell`.
    const getCell = (entry: IWiredLogEntry, columnId: string): WiredTableCell => {
        const textColor = LEVEL_COLORS[entry.logLevel];

        switch (columnId) {
            case 'timestamp': return { text: entry.timestampStr, inspectable: true, textColor };
            case 'source': return { text: t(`wiredmenu.logs_overview.log_source.${entry.logSource}`, `wiredmenu.logs_overview.log_source.${entry.logSource}`), textColor };
            case 'level': return { text: t(`wiredmenu.logs_overview.log_level.${entry.logLevel}`, `wiredmenu.logs_overview.log_level.${entry.logLevel}`), textColor };
            default: return { text: entry.logMessage, inspectable: true, textColor };
        }
    };

    const sourceItems = [ 'all', '0', '1' ].map(item => t(`wiredmenu.logs_overview.log_source.${item}`, `wiredmenu.logs_overview.log_source.${item}`));
    const levelItems = [ 'all', '0', '1', '2', '3' ].map(item => t(`wiredmenu.logs_overview.log_level.${item}`, `wiredmenu.logs_overview.log_level.${item}`));

    const boldText = (key: string, left: number, top: number) => (
        <ThemeText
            text={t(key, key)}
            textStyle="u_regular"
            flashFormat={{ bold: true }}
            verticalAlign="top"
            layout={{ position: 'absolute', left, top, height: 17 }}
        />
    );

    return (
        <Frame
            variant="3"
            id={WIRED_ROOM_LOGS_FRAME_ID}
            caption={t('wiredmenu.logs_overview.title', 'wiredmenu.logs_overview.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="y"
            centered
            rememberPosition={false}
            onClose={closeWiredRoomLogs}
            layout={{ position: 'absolute', width: 700, height: 508, minWidth: 700, maxWidth: 700, minHeight: 380, maxHeight: 700 }}
            margins={FRAME_MARGINS}
            contentLayout={{ flexDirection: 'column' }}
        >
            <Box layout={{ width: 700, height: HEADER_HEIGHT, flexShrink: 0 }}>
                <Border
                    variant="4"
                    layout={{ position: 'absolute', left: 8, top: 7, width: 580, height: 38 }}
                >
                    <ThemeText
                        text={t('wiredmenu.logs_overview.info', 'wiredmenu.logs_overview.info')}
                        textStyle="u_regular"
                        textOptions={{ align: 'center', wordWrap: true, wordWrapWidth: 574 }}
                        flashFormat={{ leading: 1 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 1, top: 3, width: 578, height: 32 }}
                    />
                </Border>
                <Box layout={{ position: 'absolute', left: 15, top: 60, width: 314, height: 25 }}>
                    {boldText('wiredmenu.logs_overview.filter', 0, 3)}
                    <Border
                        variant="4"
                        layout={{ position: 'absolute', left: 45, top: 0, width: 269, height: 25 }}
                    >
                        <TextInput
                            value={query}
                            maxLength={FILTER_MAX_CHARS}
                            onChange={setQuery}
                            onEnter={() => updateFilters()}
                            textStyle="u_regular"
                            flashPlacement
                            backgroundColor={null}
                            focusedBackgroundColor={null}
                            layout={{ position: 'absolute', left: 6, top: 4, width: 257, height: 18 }}
                        />
                    </Border>
                </Box>
                <Box layout={{ position: 'absolute', left: 596, top: 19, width: 15, height: 15 }}>
                    <CheckBox
                        variant="3"
                        selected={autoRefresh}
                        onPointerTap={() => setAutoRefresh(!autoRefresh)}
                        layout={{ width: 15, height: 15 }}
                    />
                </Box>
                <ThemeText
                    text={t('wiredmenu.logs_overview.auto_refresh', 'wiredmenu.logs_overview.auto_refresh')}
                    textStyle="u_regular"
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 614, top: 18, width: 90, height: 29 }}
                />
                <Box layout={{ position: 'absolute', left: 349, top: 60, width: 164, height: 25 }}>
                    {boldText('wiredmenu.logs_overview.log_source', 0, 3)}
                    <WiredMenuDropmenu
                        items={sourceItems}
                        selected={source + 1}
                        canSelect={() => requests.canRequestNewPage(false)}
                        onSelect={(index) => {
                            setSource(index - 1);
                            updateFilters({ source: index - 1 });
                        }}
                        layout={{ position: 'absolute', left: 74, top: 0, width: 90, height: 25 }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 534, top: 60, width: 154, height: 25 }}>
                    {boldText('wiredmenu.logs_overview.log_level', 0, 3)}
                    <WiredMenuDropmenu
                        items={levelItems}
                        selected={level + 1}
                        canSelect={() => requests.canRequestNewPage(false)}
                        onSelect={(index) => {
                            setLevel(index - 1);
                            updateFilters({ level: index - 1 });
                        }}
                        layout={{ position: 'absolute', left: 62, top: 0, width: 90, height: 25 }}
                    />
                </Box>
            </Box>
            <WiredPagedTable
                columns={columns}
                rows={page.elements}
                getRowId={entry => String(entry.id)}
                getCell={getCell}
                currentPage={page.currentPage}
                totalEntries={page.totalEntries}
                pageSize={WIRED_ROOM_LOGS_PAGE_SIZE}
                pagingTextKey="wiredmenu.logs_overview.bottom_text"
                pageKey={page}
                requests={requests}
                scrollResetKey={scrollKey}
                layout={{ flex: 1 }}
            />
        </Frame>
    );
};
