import type { IRoom, IRoomCamera } from "@nitrodevco/nitro-api";
import { createStore } from "zustand";

import { RoomCamera } from "@nitrodevco/nitro-renderer";
import type { RoomSessionSlice } from "./RoomSessionSlice";
import { createRoomSessionSlice } from "./RoomSessionSlice";

type State = {
    roomId: number;
    room: IRoom;
    camera: IRoomCamera;
    ownUserId: number;
}

type Actions = {
}

export type RoomStore = State & Actions & RoomSessionSlice;

export const createRoomStore = (room: IRoom) => createStore<RoomStore>()((set, get, store) => ({
    roomId: room.roomId,
    room: room,
    camera: new RoomCamera(),
    ownUserId: -1,
    ...createRoomSessionSlice(set, get, store),
}));