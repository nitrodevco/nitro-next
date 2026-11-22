import { IRoom } from '@nitrodevco/nitro-api';
import { createStore, StoreApi } from 'zustand';

import { createRoomBotsSlice, RoomBotsSlice } from './RoomBotsSlice';
import { createRoomCameraSlice, RoomCameraSlice } from './RoomCameraSlice';
import { createRoomChatSlice, RoomChatSlice } from './RoomChatSlice';
import { createRoomChooserSlice, RoomChooserSlice } from './RoomChooserSlice';
import { createRoomCustomUserNotificationSlice, RoomCustomUserNotificationSlice } from './RoomCustomUserNotificationSlice';
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

/**
 * The room store: the room on screen and every per-room slice, composed into one Zustand store.
 * A new room (or none) resets every slice to its initial state.
 */
type State = {
    room: IRoom | undefined;
};

/** A room's values in the store, its actions left out (`roomStateOf`): what a room drawn before it was entered brings with it. */
export type RoomState = Partial<RoomStore>;

export interface SetRoomOptions {
    /** The state the room was drawn with before the session entered it (a client module's secondary room), in place of a fresh one. */
    state?: RoomState;
    /** The room left is not disposed: a client module goes on drawing it. */
    keepPrevious?: boolean;
}

type Actions = {
    /**
     * Adopts a new room (or none) and resets every slice to a fresh copy of its initial state - or to
     * `options.state`, for a room that was drawn before it was entered.
     */
    setRoom: (room: IRoom | undefined, options?: SetRoomOptions) => void;
};

export type RoomStore = State & Actions & RoomMouseSlice & RoomSessionSlice & RoomCameraSlice & RoomChatSlice & RoomSelectedObjectSlice & RoomStackingHeightMapSlice & RoomUsersSlice & RoomWidgetSlice & RoomDoorbellSlice & RoomPollSlice & RoomCustomUserNotificationSlice & RoomQuizSlice & RoomFriendRequestSlice & RoomSettingsFormSlice & RoomFloorPlanSlice & RoomPetsSlice & RoomBotsSlice & RoomSoundSlice & RoomChooserSlice;

/**
 * Everything a room starts with, as a fresh deep copy: the store's own initial state with the
 * actions left out. Deriving it from the store means a new slice resets with the room without
 * being listed anywhere, and copying it means state a slice mutates in place - the mouse slice's
 * event id maps - cannot carry the previous room's contents into the next one.
 */
const freshRoomState = (store: StoreApi<RoomStore>): Partial<RoomStore> => structuredClone(Object.fromEntries(
    Object.entries(store.getInitialState()).filter(([ , value ]) => typeof value !== 'function'),
));

/** The values of a room store, its actions left out. */
export const roomStateOf = (store: StoreApi<RoomStore>): RoomState => Object.fromEntries(
    Object.entries(store.getState()).filter(([ , value ]) => typeof value !== 'function'),
);

/** The store the client's own `roomStore` reads and writes in place of its own while `runInRoomStoreScope` runs. */
let scope: StoreApi<RoomStore> | undefined = undefined;

/**
 * Not Flash's: runs `run` with `roomStore` - its `getState`, `setState` and every action of it, the ones a
 * packet handler took when it was registered too - reading and writing `store` instead, and `getRoom`
 * answering `store`'s room. It is how a client module's secondary room is fed through the client's own
 * room handlers (`commands/room/secondaryRooms.ts`) without touching the room on screen: nothing that
 * listens to `roomStore` hears it. Synchronous only; a scope inside a scope is the inner one's.
 */
export const runInRoomStoreScope = <T>(store: StoreApi<RoomStore>, run: () => T): T => {
    const previous = scope;

    scope = store;

    try {
        return run();
    } finally {
        scope = previous;
    }
};

/** Whether `runInRoomStoreScope` is running: the handlers are feeding a secondary room. */
export const inRoomStoreScope = () => scope !== undefined;

/**
 * A room store. The client's one (`scopable`) takes `runInRoomStoreScope`; a secondary room's own,
 * which the scope points at, does not.
 */
export const createRoomStore = (scopable: boolean = false) => createStore<RoomStore>()((ownSet, ownGet, store) => {
    let set = ownSet;
    let get = ownGet;

    if (scopable) {
        const ownGetState = store.getState;
        const ownSetState = store.setState;

        set = ((...args: Parameters<typeof ownSet>) => (scope ? scope.setState(...args) : ownSet(...args))) as typeof ownSet;
        get = () => (scope ? scope.getState() : ownGet());
        store.getState = () => (scope ? scope.getState() : ownGetState());
        store.setState = ((...args: Parameters<typeof ownSetState>) => (scope ? scope.setState(...args) : ownSetState(...args))) as typeof ownSetState;
    }

    return {
        room: undefined,
        setRoom: (room: IRoom | undefined, options: SetRoomOptions = {}) => set((x) => {
            if (x.room && x.room !== room && !options.keepPrevious) {
                x.room.dispose();
            }

            // The room reads tile heights off this store, live, so the map the handlers fill in is the one it sees.
            room?.setStackingHeightMap({ getTileHeight: (tileX, tileY) => ownGet().getTileHeight(tileX, tileY) });

            return { ...freshRoomState(store), ...options.state, room };
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
        ...createRoomCustomUserNotificationSlice(set, get, store),
        ...createRoomQuizSlice(set, get, store),
        ...createRoomFriendRequestSlice(set, get, store),
        ...createRoomSettingsFormSlice(set, get, store),
        ...createRoomFloorPlanSlice(set, get, store),
        ...createRoomPetsSlice(set, get, store),
        ...createRoomBotsSlice(set, get, store),
        ...createRoomSoundSlice(set, get, store),
        ...createRoomChooserSlice(set, get, store),
    };
});

/**
 * The one RoomStore for the whole client. There is only ever one room on screen, and the store
 * resets itself per room in `setRoom`, so it can live as long as the app: components read it
 * through their hooks, and packet handlers read and write it through `getState()`, which is
 * always current - a batch of packets is dispatched without React rendering in between.
 */
export const roomStore = createRoomStore(true);
