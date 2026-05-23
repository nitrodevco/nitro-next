import type { IRoom, IRoomCamera } from "@nitrodevco/nitro-api";
import { createStore } from "zustand";

import type { RoomSessionSlice } from "./RoomSessionSlice";
import { createRoomSessionSlice } from "./RoomSessionSlice";
import { RoomCamera } from "@nitrodevco/nitro-renderer";

type State = {
    roomId: number;
    room: IRoom;
    camera: IRoomCamera;
}

type Actions = {
}

export type RoomStore = State & Actions & RoomSessionSlice;

export const createRoomStore = (room: IRoom) => createStore<RoomStore>()((set, get, store) => ({
    roomId: room.roomId,
    room: room,
    camera: new RoomCamera(),
    ...createRoomSessionSlice(set, get, store),
}));