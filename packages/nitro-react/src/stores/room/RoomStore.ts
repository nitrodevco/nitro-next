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

type State = {
    room: IRoom | undefined;
    ownUserId: number;
}

type Actions = {
    setRoom: (room: IRoom) => void;
    setOwnUserId: (ownUserId: number) => void;
}

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice & RoomStackingHeightMapSlice;

export const createRoomStore = () => createStore<RoomStore>()((set, get, store) => ({
    room: undefined,
    ownUserId: -1,
    setRoom: (room: IRoom | undefined) => set(x => {
        if (x.room) {
            x.room.dispose();

            return {
                ...RoomMouseSliceInitialState,
                ...RoomSessionSliceInitialState,
                ...RoomCameraSliceInitialState,
                ...RoomSelectedObjectSliceInitialState,
                ...RoomStackingHeightMapSliceInitialState,
                room
            };
        }

        return { room };
    }),
    setOwnUserId: (ownUserId: number) => set({ ownUserId }),
    ...createRoomMouseSlice(set, get, store),
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store),
    ...createRoomStackingHeightMapSlice(set, get, store)
}));