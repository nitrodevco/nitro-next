import { IRoomInfo } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The room-entry popup the navigator shows while a locked/password room is being entered
 * (the Flash `GuestRoomDoorbell` / `GuestRoomPasswordInput` windows):
 * - `doorbell`: ask to ring; `doorbell_rung`: rung, window hidden until the server answers; `doorbell_waiting`:
 *   the server acknowledged the ring; `doorbell_no_answer`: nobody let us in.
 * - `password`: ask for the password; `password_sent`: window hidden while the server checks it; `password_retry`: rejected.
 * The `_rung`/`_sent` modes are the Flash windows' hidden-but-not-disposed state: a later
 * server reply re-shows the same window instead of creating a new one.
 */
export type NavigatorRoomEntryDialogMode = 'doorbell' | 'doorbell_rung' | 'doorbell_waiting' | 'doorbell_no_answer' | 'password' | 'password_sent' | 'password_retry';

export interface NavigatorRoomEntryDialog {
    room: IRoomInfo;
    mode: NavigatorRoomEntryDialogMode;
}

/** A modal message (the Flash `SimpleAlertView`): localization keys for the title and body. */
export interface NavigatorAlert {
    titleKey: string;
    messageKey: string;
}

/**
 * Where you are standing in the line into a full room. Flash raised one `RoomSessionQueueEvent`
 * per queue set and the widget kept only the active one, which is all this holds.
 */
export interface NavigatorRoomQueue {
    /** How many are ahead, plus you. */
    position: number;
    /** The spectator line rather than the visitor one. */
    spectator: boolean;
    /** Standing in the club lane, which moves faster. */
    clubQueue: boolean;
    /** There is another line to move to. */
    canChangeQueue: boolean;
}

/** Getting into a room: the doorbell or password window, the queue, and the alerts a refused entry shows. */
type State = {
    roomEntryDialog: NavigatorRoomEntryDialog | undefined;
    alert: NavigatorAlert | undefined;
    roomQueue: NavigatorRoomQueue | undefined;
    /**
     * `HabboNavigator.webRoomReport` / `webRoomReportedName`: the last `enterRoomWebRequest` was a
     * report (`navigator/report/<globalId>/<name>`), so the `ConvertedRoomIdMessage` it asked for
     * opens the room's report rather than forwarding there. Flash never clears it.
     */
    webRoomReport: boolean;
    webRoomReportedName: string | null;
};

type Actions = {
    setRoomEntryDialog: (dialog: NavigatorRoomEntryDialog | undefined) => void;
    /** Changes the mode of the open room-entry dialog; a no-op when none is open (the Flash windows ignore state changes once disposed). */
    setRoomEntryDialogMode: (mode: NavigatorRoomEntryDialogMode) => void;
    setAlert: (alert: NavigatorAlert | undefined) => void;
    setRoomQueue: (roomQueue: NavigatorRoomQueue | undefined) => void;
    setWebRoomReport: (webRoomReport: boolean, webRoomReportedName: string | null) => void;
};

export const NavigatorRoomEntrySliceInitialState: State = {
    roomEntryDialog: undefined,
    alert: undefined,
    roomQueue: undefined,
    webRoomReport: false,
    webRoomReportedName: null,
};

export type NavigatorRoomEntrySlice = State & Actions;

export const createNavigatorRoomEntrySlice: StateCreator<NavigatorRoomEntrySlice, [], [], NavigatorRoomEntrySlice> = set => ({
    ...NavigatorRoomEntrySliceInitialState,
    setRoomEntryDialog: roomEntryDialog => set({ roomEntryDialog }),
    setRoomEntryDialogMode: mode => set(x => (x.roomEntryDialog ? { roomEntryDialog: { ...x.roomEntryDialog, mode } } : {})),
    setAlert: alert => set({ alert }),
    setRoomQueue: roomQueue => set({ roomQueue }),
    setWebRoomReport: (webRoomReport, webRoomReportedName) => set({ webRoomReport, webRoomReportedName }),
});
