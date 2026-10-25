import { StateCreator } from 'zustand';

/** `DoorbellWidget.MAX_USERS_ON_DOORBELL_LIST` - anyone ringing past this is turned away unheard. */
export const MAX_DOORBELL_USERS = 50;

type State = {
    /** Who is waiting at the door, in the order they rang. */
    doorbellUsers: string[];
};

type Actions = {
    /** Adds whoever rang; hands back false when the list is full and they should be refused instead. */
    addDoorbellUser: (username: string) => boolean;
    removeDoorbellUser: (username: string) => void;
};

export const RoomDoorbellSliceInitialState: State = {
    doorbellUsers: [],
};

export type RoomDoorbellSlice = State & Actions;

export const createRoomDoorbellSlice: StateCreator<RoomDoorbellSlice, [], [], RoomDoorbellSlice> = (set, get) => ({
    ...RoomDoorbellSliceInitialState,
    addDoorbellUser: (username: string) => {
        const { doorbellUsers } = get();

        if (doorbellUsers.includes(username)) return true;
        if (doorbellUsers.length >= MAX_DOORBELL_USERS) return false;

        set({ doorbellUsers: [ ...doorbellUsers, username ] });

        return true;
    },
    removeDoorbellUser: (username: string) => set(x => ({ doorbellUsers: x.doorbellUsers.filter(name => name !== username) })),
});
