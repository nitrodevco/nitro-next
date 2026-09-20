/**
 * A chest's or the room's transaction log - Flash `transactions/overview/WiredTransactionLogsView`
 * on `transaction_overview_xml` (880x391): the list type and id in the header with a refresh
 * button and the loading icon, a paged table of `TransactionTableObject` rows, and the paging
 * footer (`TransactionConfig.PAGE_SIZE` 25 a page).
 *
 * - `displayNewPage`: "list type" names the log (`wiredchests.logs.type.<n>`), "id" is the chest
 *   id or the room id; the table goes back to the top.
 * - `requestPage`: at most one request every 280 ms, the same page again only after 2 s; a chest
 *   log pages by chest id, the room log by page alone. The loading icon shows from the request to
 *   the next page.
 * - A row: the transaction type, its readable time, the user (a link opening their profile),
 *   what was withdrawn and deposited (`summarize`), the number of chests, and a "details" link
 *   that asks for `WiredTransactionLogDetails`.
 */
import type { IWiredTransactionInfo, IWiredTransactionLogList } from '@nitrodevco/nitro-packets';
import { WiredTransactionLogListType } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { openWiredTransactionUserProfile, requestWiredTransactionDetails, requestWiredTransactionLogsPage } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { WIRED_TRANSACTION_PAGE_SIZE } from '#base/context/wired-trading';
import { Box, Button, Frame, ThemeText } from '#base/theme';
import { summarizeWiredTransaction } from '#base/utils';
import { useWiredPageRequests } from '#base/views/wired-common/useWiredPageRequests';
import { WiredLoadingIcon } from '#base/views/wired-common/WiredLoadingIcon';
import { WiredPagedTable } from '#base/views/wired-common/WiredPagedTable';
import { calculateLastPage } from '#base/views/wired-common/wiredPaging';
import { WiredTableCell, WiredTableColumn } from '#base/views/wired-common/WiredTableView';

/** `WiredTransactionLogsView.REQUEST_PAGE_RATELIMIT`: this view's own, not `PagedTableView`'s 200. */
const REQUEST_PAGE_RATELIMIT = 280;
const HEADER_HEIGHT = 62;

interface KeyValueProps {
    name: string;
    value: string;
}

/** One `pair` of the header: a bold key and its value, 2 apart. */
const KeyValue = ({ name, value }: KeyValueProps) => (
    <Box layout={{ flexDirection: 'row', gap: 2, height: 20 }}>
        <ThemeText
            text={name}
            textStyle="text-style-u-bold"
        />
        <ThemeText
            text={value}
            textStyle="text-style-u-regular"
        />
    </Box>
);

export interface WiredTransactionLogsViewProps {
    logs: IWiredTransactionLogList;
    onClose: () => void;
}

export const WiredTransactionLogsView = ({ logs, onClose }: WiredTransactionLogsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ loading, setLoading ] = useState(false);
    const [ loadedFor, setLoadedFor ] = useState(logs);

    // A new page is in: `displayNewPage` hides the loading icon.
    if (loadedFor !== logs) {
        setLoadedFor(logs);
        setLoading(false);
    }

    const lastPage = calculateLastPage(logs.totalLogs, WIRED_TRANSACTION_PAGE_SIZE);
    const requests = useWiredPageRequests({
        currentPage: logs.currentPage,
        lastPage,
        pageKey: logs,
        ratelimit: REQUEST_PAGE_RATELIMIT,
        onRequestPage: (page) => {
            requestWiredTransactionLogsPage(send, logs, page);
            setLoading(true);
        },
    });

    const loc = (key: string) => t(key, key);

    const columns: WiredTableColumn[] = [
        { id: 'type', title: loc('wiredchests.logs.col.type'), widthFactor: 0.17 },
        { id: 'timestamp', title: loc('wiredchests.logs.col.timestamp'), widthFactor: 0.15 },
        { id: 'username', title: loc('wiredchests.logs.col.username'), widthFactor: 0.14 },
        { id: 'withdraws', title: loc('wiredchests.logs.col.withdraws'), widthFactor: 0.14 },
        { id: 'deposits', title: loc('wiredchests.logs.col.deposits'), widthFactor: 0.14 },
        { id: 'chests', title: loc('wiredchests.logs.col.chests'), widthFactor: 0.12 },
        { id: 'details', title: loc('wiredchests.logs.col.details'), widthFactor: 0.14 },
    ];

    /** `TransactionTableObject.getTableCell`. */
    const getCell = (info: IWiredTransactionInfo, columnId: string): WiredTableCell => {
        switch (columnId) {
            case 'type': return { text: t(`wired_transactions.type.${info.transactionType}`) };
            case 'timestamp': return { text: info.readableTimestamp };
            case 'username': return { type: 'link', text: info.userName, onLinkClick: () => openWiredTransactionUserProfile(send, info.userId) };
            case 'deposits': return { text: summarizeWiredTransaction(t, info.depositFurniCount, info.depositCoinsCount) };
            case 'withdraws': return { text: summarizeWiredTransaction(t, info.withdrawFurniCount, info.withdrawCoinsCount) };
            case 'chests': return { text: String(info.chestCount) };
            case 'details': return { type: 'link', text: loc('wiredchests.logs.details_text'), onLinkClick: () => requestWiredTransactionDetails(send, info.transactionId) };
            default: return { text: '' };
        }
    };

    const isChestLog = (Number(logs.logListType) === Number(WiredTransactionLogListType.Chest));

    return (
        <Frame
            variant="3"
            id="wired-transaction-logs"
            caption={t('wiredchests.logs.title')}
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            rememberPosition={false}
            centered
            onClose={onClose}
            contentLayout={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}
            layout={{ position: 'absolute', width: 880, height: 391 }}
        >
            <Box layout={{ flexDirection: 'column', width: 880, height: 358 }}>
                <Box layout={{ position: 'relative', width: 880, height: HEADER_HEIGHT, flexShrink: 0 }}>
                    <Box layout={{ position: 'absolute', left: 15, top: 13, flexDirection: 'column', gap: 2 }}>
                        <KeyValue
                            name={loc('wiredchests.logs.list_type')}
                            value={loc(`wiredchests.logs.type.${logs.logListType}`)}
                        />
                        <KeyValue
                            name={loc(isChestLog ? 'wiredchests.logs.chest_id' : 'wiredchests.logs.room_id')}
                            value={String(logs.logListId)}
                        />
                    </Box>
                    <WiredLoadingIcon
                        visible={loading}
                        layout={{ position: 'absolute', left: 777, top: 20 }}
                    />
                    <Button
                        variant="3"
                        onPointerTap={requests.refresh}
                        layout={{ position: 'absolute', left: 801, top: 13, width: 62, height: 30 }}
                    >
                        {t('wiredchests.logs.refresh')}
                    </Button>
                </Box>
                <WiredPagedTable
                    columns={columns}
                    rows={logs.logs}
                    getRowId={info => String(info.transactionId)}
                    getCell={getCell}
                    currentPage={logs.currentPage}
                    totalEntries={logs.totalLogs}
                    lastPage={lastPage}
                    pagingTextKey="wiredchests.logs.bottom_text"
                    entriesToken="%transaction_count%"
                    pageKey={logs}
                    requests={requests}
                    scrollResetKey={logs}
                    layout={{ width: 880, height: 294 }}
                />
            </Box>
        </Frame>
    );
};
