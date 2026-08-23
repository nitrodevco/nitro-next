import { IRoom } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { createRoomCameraSlice, RoomCameraSlice, RoomCameraSliceInitialState } from './RoomCameraSlice';
import { createRoomMouseSlice, RoomMouseSlice, RoomMouseSliceInitialState } from './RoomMouseSlice';
import { createRoomSelectedObjectSlice, RoomSelectedObjectSlice, RoomSelectedObjectSliceInitialState } from './RoomSelectedObjectSlice';
import { createRoomSessionSlice, RoomSessionSlice, RoomSessionSliceInitialState } from './RoomSessionSlice';
import { createRoomStackingHeightMapSlice, RoomStackingHeightMapSlice, RoomStackingHeightMapSliceInitialState } from './RoomStackingHeightMapSlice';
import { createRoomUsersSlice, RoomUsersSlice, RoomUsersSliceInitialState } from './RoomUsersSlice';

type State = {
    room: IRoom | undefined;
    ownUserId: number;
};

type Actions = {
    setRoom: (room: IRoom | undefined) => void;
    setOwnUserId: (ownUserId: number) => void;
};

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomSelectedObjectSlice & RoomStackingHeightMapSlice & RoomUsersSlice;

export const createRoomStore = () => createStore<RoomStore>()((set, get, store) => ({
    room: undefined,
    ownUserId: -1,
    setRoom: (room: IRoom | undefined) => set((x) => {
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
            room,
        };
    }),
    setOwnUserId: (ownUserId: number) => set({ ownUserId }),
    ...createRoomMouseSlice(set, get, store),
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store),
    ...createRoomStackingHeightMapSlice(set, get, store),
    ...createRoomUsersSlice(set, get, store),
}));
