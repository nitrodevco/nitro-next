import type { IRoom, RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { createStore } from "zustand";

import type { RoomCameraSlice } from "./RoomCameraSlice";
import { createRoomCameraSlice } from "./RoomCameraSlice";
import type { RoomSelectedObjectSlice } from "./RoomSelectedObjectSlice";
import { createRoomSelectedObjectSlice } from "./RoomSelectedObjectSlice";
import type { RoomSessionSlice } from "./RoomSessionSlice";
import { createRoomSessionSlice } from "./RoomSessionSlice";

type State = {
    roomId: number;
    room: IRoom;
    ownUserId: number;
    eventIds: Map<RoomObjectCategoryEnum, Map<string, number>>;
}

type Actions = {
    setOwnUserId: (ownUserId: number) => void;
    getMouseEventId: (category: RoomObjectCategoryEnum, type: string) => number | undefined;
    setMouseEventId: (category: RoomObjectCategoryEnum, type: string, eventId: number) => void;
}

export type RoomStore = State & Actions & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice;

export const createRoomStore = (room: IRoom) => createStore<RoomStore>()((set, get, store) => ({
    roomId: room.roomId,
    room: room,
    ownUserId: -1,
    eventIds: new Map(),
    setOwnUserId: (ownUserId: number) => set({ ownUserId }),
    getMouseEventId: (category: RoomObjectCategoryEnum, type: string) => {
        return get().eventIds.get(category)?.get(type);
    },
    setMouseEventId: (category: RoomObjectCategoryEnum, type: string, eventId: number) => {
        let map = get().eventIds.get(category);

        if (!map) {
            map = new Map();
            get().eventIds.set(category, map);
        }

        map.set(type, eventId);
    },
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store)
}));