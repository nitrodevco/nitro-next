import type { IRoom } from "@nitrodevco/nitro-api";
import { createStore } from "zustand";

import type { RoomCameraSlice } from "./RoomCameraSlice";
import { createRoomCameraSlice, RoomCameraSliceInitialState } from "./RoomCameraSlice";
import type { RoomMouseSlice } from "./RoomMouseSlice";
import { createRoomMouseSlice, RoomMouseSliceInitialState } from "./RoomMouseSlice";
import type { RoomSelectedObjectSlice } from "./RoomSelectedObjectSlice";
import { createRoomSelectedObjectSlice, RoomSelectedObjectSliceInitialState } from "./RoomSelectedObjectSlice";
import type { RoomSessionSlice } from "./RoomSessionSlice";
import { createRoomSessionSlice, RoomSessionSliceInitialState } from "./RoomSessionSlice";
import type { RoomStackingHeightMapSlice } from "./RoomStackingHeightMapSlice";
import { createRoomStackingHeightMapSlice, RoomStackingHeightMapSliceInitialState } from "./RoomStackingHeightMapSlice";
import type { RoomUsersSlice } from "./RoomUsersSlice";
import { createRoomUsersSlice, RoomUsersSliceInitialState } from "./RoomUsersSlice";

type State = {
    room: IRoom | undefined;
    ownUserId: number;
    landingViewVisible: boolean;
    /*
     * RoomToolsWidget session-global state — the SWF keeps ROOM_VISIT_HISTORY as a
     * static across room sessions, so it lives OUTSIDE the slices that setRoom
     * resets on every entry. Capped at 20 entries.
     */
    toolsCanRate: boolean;
    toolsRoomId: number;
    visitHistory: { flatId: number; roomName: string }[];
    visitHistoryIndex: number;
    /* AccountPreferences uiFlags — bit 2 keeps the room tools panel expanded */
    uiFlags: number;
    roomToolsCollapsed: boolean;
}

type Actions = {
    setRoom: (room: IRoom | undefined) => void;
    setOwnUserId: (ownUserId: number) => void;
    setLandingViewVisible: (landingViewVisible: boolean) => void;
    setToolsCanRate: (canRate: boolean) => void;
    setToolsRoomEntered: (roomId: number, roomName: string) => void;
    visitHistoryGo: (direction: number) => { flatId: number; roomName: string } | null;
    setUiFlags: (uiFlags: number) => void;
    setRoomToolsCollapsed: (roomToolsCollapsed: boolean) => void;
}

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice & RoomStackingHeightMapSlice & RoomUsersSlice;

export const createRoomStore = () => createStore<RoomStore>()((set, get, store) => ({
    room: undefined,
    ownUserId: -1,
    landingViewVisible: true,
    toolsCanRate: false,
    toolsRoomId: -1,
    visitHistory: [],
    visitHistoryIndex: -1,
    uiFlags: 0,
    roomToolsCollapsed: false,
    setRoom: (room: IRoom | undefined) => set(x => {
        if (x.room && x.room !== room) {
            x.room.dispose();
        }

        return {
            ...RoomMouseSliceInitialState,
            ...RoomSessionSliceInitialState,
            ...RoomCameraSliceInitialState,
            ...RoomSelectedObjectSliceInitialState,
            ...RoomStackingHeightMapSliceInitialState,
            ...RoomUsersSliceInitialState,
            room
        };
    }),
    setOwnUserId: (ownUserId: number) => set({ ownUserId }),
    setLandingViewVisible: (landingViewVisible: boolean) => set({ landingViewVisible }),
    setToolsCanRate: (canRate: boolean) => set({ toolsCanRate: canRate }),
    setUiFlags: (uiFlags: number) => set({ uiFlags, roomToolsCollapsed: !(uiFlags & 2) }),
    setRoomToolsCollapsed: (roomToolsCollapsed: boolean) => set({ roomToolsCollapsed }),
    /*
     * RoomVisitHistory.onRoomEntered — names refresh everywhere; entering a new room
     * mid-history REVERSES the forward suffix (nothing is discarded) before appending,
     * unless the tail already is this room. canRate clears until RoomRating arrives.
     */
    setToolsRoomEntered: (roomId: number, roomName: string) => set(x => {
        const history = x.visitHistory.map(y => (y.flatId === roomId ? { ...y, roomName } : y));
        let index = x.visitHistoryIndex;

        if (history.length === 0) {
            return { toolsRoomId: roomId, toolsCanRate: false, visitHistory: [{ flatId: roomId, roomName }], visitHistoryIndex: 0 };
        }

        if (index < 0) index = 0;
        if (index >= history.length) index = history.length - 1;

        if (history[index].flatId === roomId) {
            return { toolsRoomId: roomId, toolsCanRate: false, visitHistory: history, visitHistoryIndex: index };
        }

        if (index < history.length - 1) {
            const suffix = history.splice(index, history.length - index).reverse();

            history.push(...suffix);
        }

        if (history[history.length - 1].flatId !== roomId) {
            history.push({ flatId: roomId, roomName });

            while (history.length > 20) history.shift();
        }

        return { toolsRoomId: roomId, toolsCanRate: false, visitHistory: history, visitHistoryIndex: history.length - 1 };
    }),
    visitHistoryGo: (direction: number) => {
        const { visitHistory, visitHistoryIndex } = get();
        const target = visitHistoryIndex + direction;

        if (target < 0 || target >= visitHistory.length) return null;

        set({ visitHistoryIndex: target });

        return visitHistory[target];
    },
    ...createRoomMouseSlice(set, get, store),
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store),
    ...createRoomStackingHeightMapSlice(set, get, store),
    ...createRoomUsersSlice(set, get, store)
}));