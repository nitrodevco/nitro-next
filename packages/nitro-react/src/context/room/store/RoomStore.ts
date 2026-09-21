import { IRoom } from '@nitrodevco/nitro-api';
import { createStore, StoreApi } from 'zustand';

import { createRoomBotsSlice, RoomBotsSlice } from './RoomBotsSlice';
import { createRoomCameraSlice, RoomCameraSlice } from './RoomCameraSlice';
import { createRoomChatSlice, RoomChatSlice } from './RoomChatSlice';
import { createRoomDoorbellSlice, RoomDoorbellSlice } from './RoomDoorbellSlice';
import { createRoomFloorPlanSlice, RoomFloorPlanSlice } from './RoomFloorPlanSlice';
import { createRoomFriendRequestSlice, RoomFriendRequestSlice } from './RoomFriendRequestSlice';
import { createRoomMouseSlice, RoomMouseSlice } from './RoomMouseSlice';
import { createRoomPetsSlice, RoomPetsSlice } from './RoomPetsSlice';
import { createRoomPollSlice, RoomPollSlice } from './RoomPollSlice';
import { createRoomQuizSlice, RoomQuizSlice } from './RoomQuizSlice';
import { createRoomSelectedObjectSlice, RoomSelectedObjectSlice } from './RoomSelectedObjectSlice';
import { createRoomSessionSlice, RoomSessionSlice } from './RoomSessionSlice';
import { createRoomSettingsFormSlice, RoomSettingsFormSlice } from './RoomSettingsFormSlice';
import { createRoomSoundSlice, RoomSoundSlice } from './RoomSoundSlice';
import { createRoomStackingHeightMapSlice, RoomStackingHeightMapSlice } from './RoomStackingHeightMapSlice';
import { createRoomUsersSlice, RoomUsersSlice } from './RoomUsersSlice';
import { createRoomWidgetSlice, RoomWidgetSlice } from './RoomWidgetSlice';

type State = {
    room: IRoom | undefined;
};

type Actions = {
    /** Adopts a new room (or none) and resets every slice to a fresh copy of its initial state. */
    setRoom: (room: IRoom | undefined) => void;
};

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomChatSlice & RoomSelectedObjectSlice & RoomStackingHeightMapSlice & RoomUsersSlice & RoomWidgetSlice & RoomDoorbellSlice & RoomPollSlice & RoomQuizSlice & RoomFriendRequestSlice & RoomSettingsFormSlice & RoomFloorPlanSlice & RoomPetsSlice & RoomBotsSlice & RoomSoundSlice;

/**
 * Everything a room starts with, as a fresh deep copy: the store's own initial state with the
 * actions left out. Deriving it from the store means a new slice resets with the room without
 * being listed anywhere, and copying it means state a slice mutates in place - the mouse slice's
 * event id maps - cannot carry the previous room's contents into the next one.
 */
const freshRoomState = (store: StoreApi<RoomStore>): Partial<RoomStore> => structuredClone(Object.fromEntries(
    Object.entries(store.getInitialState()).filter(([ , value ]) => typeof value !== 'function'),
));

export const createRoomStore = () => createStore<RoomStore>()((set, get, store) => ({
    room: undefined,
    setRoom: (room: IRoom | undefined) => set((x) => {
        if (x.room && x.room !== room) {
            x.room.dispose();
        }

        // The room reads tile heights off this store, live, so the map the handlers fill in is the one it sees.
        room?.setStackingHeightMap({ getTileHeight: (tileX, tileY) => get().getTileHeight(tileX, tileY) });

        return { ...freshRoomState(store), room };
    }),
    ...createRoomMouseSlice(set, get, store),
    ...createRoomSessionSlice(set, get, store),
    ...createRoomCameraSlice(set, get, store),
    ...createRoomChatSlice(set, get, store),
    ...createRoomSelectedObjectSlice(set, get, store),
    ...createRoomStackingHeightMapSlice(set, get, store),
    ...createRoomUsersSlice(set, get, store),
    ...createRoomWidgetSlice(set, get, store),
    ...createRoomDoorbellSlice(set, get, store),
    ...createRoomPollSlice(set, get, store),
    ...createRoomQuizSlice(set, get, store),
    ...createRoomFriendRequestSlice(set, get, store),
    ...createRoomSettingsFormSlice(set, get, store),
    ...createRoomFloorPlanSlice(set, get, store),
    ...createRoomPetsSlice(set, get, store),
    ...createRoomBotsSlice(set, get, store),
    ...createRoomSoundSlice(set, get, store),
}));

/**
 * The one RoomStore for the whole client. There is only ever one room on screen, and the store
 * resets itself per room in `setRoom`, so it can live as long as the app: components read it
 * through their hooks, and packet handlers read and write it through `getState()`, which is
 * always current - a batch of packets is dispatched without React rendering in between.
 */
export const roomStore = createRoomStore();
