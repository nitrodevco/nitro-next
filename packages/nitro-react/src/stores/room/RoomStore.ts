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

type State = {
    room: IRoom | undefined;
    ownUserId: number;
}

type Actions = {
    setRoom: (room: IRoom) => void;
    setOwnUserId: (ownUserId: number) => void;
}

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice;

export const createRoomStore = () => createStore<RoomStore>()((set, get, store) => ({
    room: undefined,
    ownUserId: -1,
    setRoom: (room: IRoom | undefined) => set(x => x.room ? {
        ...RoomMouseSliceInitialState,
        ...RoomSessionSliceInitialState,
        ...RoomCameraSliceInitialState,
        ...RoomSelectedObjectSliceInitialState,
        room
    } : { room }),
    setOwnUserId: (ownUserId: number) => set({ ownUserId }),
    ...createRoomMouseSlice(set, get, store),
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store)
}));