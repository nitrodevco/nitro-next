import { IRoomEventData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The answer `RoomEventViewCtrl.onRoomAdError` takes: the field it names gets the filtered text
 * and the error. `serial` tells one answer from the next.
 */
export interface NavigatorRoomAdError {
    errorCode: number;
    filteredText: string;
    serial: number;
}

/** The current room's event: its info card (`RoomEventInfoCtrl`) and its settings window (`RoomEventViewCtrl`). */
type State = {
    /** `NavigatorData.roomEventData`: the event running in the room the user is in, if any. */
    roomEventData: IRoomEventData | undefined;
    /**
     * `RoomEventInfoCtrl.canExtend`. Flash works it out on each `refresh`; here when the event
     * arrives, which is the refresh it changes on - the time passing between refreshes moves it by
     * minutes at most.
     */
    roomEventExtendable: boolean;
    /** `RoomEventInfoCtrl._expanded`. */
    roomEventInfoExpanded: boolean;
    /** `RoomEventViewCtrl`'s window is up. */
    roomEventSettingsVisible: boolean;
    roomAdError: NavigatorRoomAdError | undefined;
};

type Actions = {
    /** The event and whether it may be extended (`RoomEventInfoCtrl.canExtend`, worked out as it arrives). */
    setRoomEventData: (roomEventData: IRoomEventData | undefined, roomEventExtendable?: boolean) => void;
    setRoomEventInfoExpanded: (expanded: boolean) => void;
    setRoomEventSettingsVisible: (visible: boolean) => void;
    setRoomAdError: (errorCode: number, filteredText: string) => void;
};

export const NavigatorRoomEventSliceInitialState: State = {
    roomEventData: undefined,
    roomEventExtendable: false,
    roomEventInfoExpanded: true,
    roomEventSettingsVisible: false,
    roomAdError: undefined,
};

export type NavigatorRoomEventSlice = State & Actions;

export const createNavigatorRoomEventSlice: StateCreator<NavigatorRoomEventSlice, [], [], NavigatorRoomEventSlice> = set => ({
    ...NavigatorRoomEventSliceInitialState,
    setRoomEventData: (roomEventData, roomEventExtendable = false) => set({ roomEventData, roomEventExtendable }),
    setRoomEventInfoExpanded: roomEventInfoExpanded => set({ roomEventInfoExpanded }),
    setRoomEventSettingsVisible: roomEventSettingsVisible => set({ roomEventSettingsVisible }),
    setRoomAdError: (errorCode, filteredText) => set(x => ({ roomAdError: { errorCode, filteredText, serial: (x.roomAdError?.serial ?? 0) + 1 } })),
});
