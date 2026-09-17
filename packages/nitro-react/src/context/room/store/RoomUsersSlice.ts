import { IRoomUserData, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

type State = {
    usersByRoomObjectId: Record<number, IRoomUserData>;
    /**
     * Room object id by the user's server id. Pets, bots and users number their ids separately,
     * so the type is part of the key - see `roomUserWebIdKey`. Packets name people by server id
     * and the room by object id; this saves scanning every user to translate one to the other.
     */
    objectIdsByWebId: Record<string, number>;
    userBadges: Record<number, string[]>;
};

type Actions = {
    getUserByRoomObjectId: (objectId: number) => IRoomUserData | undefined;
    getUserByWebId: (webId: number, userType: RoomObjectUserType) => IRoomUserData | undefined;
    updateUsers: (datas: IRoomUserData[]) => void;
    updateUser: (data: IRoomUserData) => void;
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => void;
    removeUser: (objectId: number) => void;
    setBadges: (webId: number, badges: string[]) => void;
};

export const RoomUsersSliceInitialState: State = {
    usersByRoomObjectId: {},
    objectIdsByWebId: {},
    userBadges: {},
};

export type RoomUsersSlice = State & Actions;

export const roomUserWebIdKey = (userType: RoomObjectUserType | number, webId: number) => `${userType}:${webId}`;

/** Adds users to both maps, dropping the index entry a replaced user held under its old id. */
const withUsers = (x: State, datas: IRoomUserData[]): Partial<State> => {
    const usersByRoomObjectId = { ...x.usersByRoomObjectId };
    const objectIdsByWebId = { ...x.objectIdsByWebId };

    for (const data of datas) {
        const previous = usersByRoomObjectId[data.objectId];

        if (previous) delete objectIdsByWebId[roomUserWebIdKey(previous.userType, previous.webID)];

        usersByRoomObjectId[data.objectId] = data;
        objectIdsByWebId[roomUserWebIdKey(data.userType, data.webID)] = data.objectId;
    }

    return { usersByRoomObjectId, objectIdsByWebId };
};

export const createRoomUsersSlice: StateCreator<RoomUsersSlice, [], [], RoomUsersSlice> = (set, get) => ({
    ...RoomUsersSliceInitialState,
    getUserByRoomObjectId: (objectId: number) => {
        return get().usersByRoomObjectId[objectId];
    },
    getUserByWebId: (webId: number, userType: RoomObjectUserType) => {
        const { objectIdsByWebId, usersByRoomObjectId } = get();
        const objectId = objectIdsByWebId[roomUserWebIdKey(userType, webId)];

        return (objectId === undefined) ? undefined : usersByRoomObjectId[objectId];
    },
    updateUsers: (datas: IRoomUserData[]) => set(x => withUsers(x, datas)),
    updateUser: (data: IRoomUserData) => set(x => withUsers(x, [ data ])),
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => set((x) => {
        const existing = x.usersByRoomObjectId[objectId];

        // A patch for someone not in the room would otherwise invent a user with no id or type.
        if (!existing) return x;

        return withUsers(x, [ { ...existing, ...data } ]);
    }),
    removeUser: (objectId: number) => set((x) => {
        const { [objectId]: removed, ...usersByRoomObjectId } = x.usersByRoomObjectId;

        if (!removed) return x;

        const { [roomUserWebIdKey(removed.userType, removed.webID)]: _, ...objectIdsByWebId } = x.objectIdsByWebId;

        return { usersByRoomObjectId, objectIdsByWebId };
    }),
    setBadges: (webId: number, badges: string[]) => set(x => ({
        userBadges: { ...x.userBadges, [webId]: badges },
    })),
});
