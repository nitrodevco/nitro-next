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
    getMouseEventId: (category: RoomObjectCategoryEnum, type: string) => number | undefined;
    setMouseEventId: (category: RoomObjectCategoryEnum, type: string, eventId: number) => void;
    setOwnUserId: (userId: number) => void;
    resetRoomState: () => void;
}

export type RoomStore = State & Actions & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice;

export const createRoomStore = (room: IRoom) => createStore<RoomStore>()((set, get, store) => ({
    roomId: room.roomId,
    room: room,
    ownUserId: -1,
    eventIds: new Map(),
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
    setOwnUserId: (userId: number) => set({ ownUserId: userId }),
    resetRoomState: () => {
        set(state => {
            const newState = { ...state };
            newState.eventIds.clear();
            return {
                ...newState,
                doorMode: 0,
                tradeMode: 0,
                controllerLevel: 1,
                ownRoomIndex: -1,
                allowPets: false,
                isGuildRoom: false,
                isRoomOwner: true,
                isDecorating: false,
                isSpectator: false,
                isPlayingGame: false,
                targetId: -1,
                targetCategory: 0,
                cameraFollowDisabled: false,
                followDuration: 1000,
                selectedAvatarId: -1,
                selectedObjectId: -1,
                selectedObjectCategory: 0,
                selectedObject: undefined,
                placedObject: undefined,
                objectPlacementSource: 1,
            };
        });
    },
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store)
}));