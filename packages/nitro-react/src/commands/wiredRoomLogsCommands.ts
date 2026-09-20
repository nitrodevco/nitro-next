/**
 * The room's wired log window - `WiredRoomLogListController` and the requesting half of
 * `WiredRoomLogListView`. A request made by the user (the monitor tab's button, a
 * `wiredmenu/logs` link, paging, the filters) opens the window with the page it gets back and
 * puts the page's filters into the window's controls; the view's auto refresh asks quietly, and
 * its answer is only shown while the window is up. The state is `WiredRoomLogsSlice`.
 *
 * The reference server (turbo-cloud) does not answer `WiredGetRoomLogs`.
 */
import type { IWiredLogPage } from '@nitrodevco/nitro-packets';
import { WiredGetRoomLogsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { WIRED_ROOM_LOGS_PAGE_SIZE, wiredStore } from '#base/context/wired';

type Send = WebSocketConnection['send'];

export interface WiredRoomLogsRequest {
    page: number;
    /** `IWiredLogEntry.logLevel` to narrow to, -1 for all. */
    logLevelFilter: number;
    /** `IWiredLogEntry.logSource` to narrow to, -1 for all. */
    logSourceFilter: number;
    query: string;
}

/** `WiredRoomLogListController.send` - `silent` (the auto refresh) does not ask for the window to open. */
export const requestWiredRoomLogs = (send: Send, { page, logLevelFilter, logSourceFilter, query }: WiredRoomLogsRequest, silent: boolean = false) => {
    if (!silent) wiredStore.getState().patchWiredRoomLogs({ roomLogsRequested: true });

    send(new WiredGetRoomLogsComposer({ page, pageSize: WIRED_ROOM_LOGS_PAGE_SIZE, logLevelFilter, logSourceFilter, query }));
};

/** The first page, unfiltered - the monitor tab's "log overview" button and the `wiredmenu/logs` link. */
export const openWiredRoomLogs = (send: Send) => requestWiredRoomLogs(send, { page: 1, logLevelFilter: -1, logSourceFilter: -1, query: '' });

/** `WiredRoomLogListController.onGetPage`. */
export const onWiredRoomLogs = (page: IWiredLogPage) => {
    const { roomLogsVisible, roomLogsRequested, patchWiredRoomLogs } = wiredStore.getState();

    if (page.amount !== WIRED_ROOM_LOGS_PAGE_SIZE) return;
    if (!roomLogsVisible && !roomLogsRequested) return;

    patchWiredRoomLogs({ roomLogsPage: page, roomLogsPageRequested: roomLogsRequested, roomLogsVisible: true, roomLogsRequested: false });
};

/** The window's close button. */
export const closeWiredRoomLogs = () => wiredStore.getState().patchWiredRoomLogs({ roomLogsVisible: false });
