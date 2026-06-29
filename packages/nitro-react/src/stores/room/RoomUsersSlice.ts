import { IRoomUserData, RoomControllerLevelEnum, RoomDoorModeEnum, RoomTradeModeEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    usersByRoomObjectId: Record<number, IRoomUserData>;
    userBadges: Record<number, string[]>;
}

type Actions = {
    updateUsers: (datas: IRoomUserData[]) => void;
    updateUser: (data: IRoomUserData) => void;
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => void;
    removeUser: (objectId: number) => void;
    setBadges: (webId: number, badges: string[]) => void;
};

export const RoomUsersSliceInitialState: State = {
    usersByRoomObjectId: {},
    userBadges: {}
};

export type RoomUsersSlice = State & Actions;

export const createRoomUsersSlice: StateCreator<RoomUsersSlice, [], [], RoomUsersSlice> = (set, get, store) => ({
    ...RoomUsersSliceInitialState,
    updateUsers: (datas: IRoomUserData[]) => set(x => {
        const updates = datas.reduce((acc, data) => ({
            ...acc,
            [data.objectId]: data
        }), {});

        return {
            usersByRoomObjectId: { ...x.usersByRoomObjectId, ...updates }
        };
    }),
    updateUser: (data: IRoomUserData) => set(x => ({
        usersByRoomObjectId: { ...x.usersByRoomObjectId, [data.objectId]: data }
    })),
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => set(x => ({
        usersByRoomObjectId: { ...x.usersByRoomObjectId, [objectId]: { ...x.usersByRoomObjectId[objectId], ...data } }
    })),
    removeUser: (objectId: number) => set(x => {
        const { [objectId]: _, ...rest } = x.usersByRoomObjectId;

        return { usersByRoomObjectId: rest };
    }),
    setBadges: (webId: number, badges: string[]) => set(x => ({
        userBadges: { ...x.userBadges, [webId]: badges }
    }))
});