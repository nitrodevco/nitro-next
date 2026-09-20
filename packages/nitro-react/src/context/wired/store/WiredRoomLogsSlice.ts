/**
 * The room's wired log window - `WiredRoomLogListController` and its `WiredRoomLogListView`
 * (`logs_overview_xml`): the page on screen and whether the window is up. A page that arrives
 * while the window is closed is dropped unless it answers a request that was meant to open it
 * (`_-S1z`). Flash hides the window on `REE_DISPOSED`; here the whole slice goes with the room.
 *
 * The reference server (turbo-cloud) does not answer `WiredGetRoomLogs` yet, so outside a replay
 * this window never opens.
 */
import type { IWiredLogPage } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredRoomLogsConfig.PAGE_SIZE` - a page of any other size is not for this window. */
export const WIRED_ROOM_LOGS_PAGE_SIZE = 50;

/** The window's frame id, which is also what brings it to the front. */
export const WIRED_ROOM_LOGS_FRAME_ID = 'wired_room_logs';

type State = {
    /** `_-47`. */
    roomLogsPage: IWiredLogPage | undefined;
    roomLogsVisible: boolean;
    /** `_-S1z` - the next page is wanted even if the window is closed, and resets the filters when it lands. */
    roomLogsRequested: boolean;
    /** Whether the page on screen came from such a request (`displayNewPage(!_-S1z)`): the filters then follow the page. */
    roomLogsPageRequested: boolean;
};

type Actions = {
    patchWiredRoomLogs: (patch: Partial<State>) => void;
};

export const WiredRoomLogsSliceInitialState: State = {
    roomLogsPage: undefined,
    roomLogsVisible: false,
    roomLogsRequested: false,
    roomLogsPageRequested: false,
};

export type WiredRoomLogsSlice = State & Actions;

export const createWiredRoomLogsSlice: StateCreator<WiredRoomLogsSlice, [], [], WiredRoomLogsSlice> = set => ({
    ...WiredRoomLogsSliceInitialState,
    patchWiredRoomLogs: patch => set(patch),
});
