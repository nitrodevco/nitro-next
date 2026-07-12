import type { RoomStore } from "../RoomStore"

export type RoomUsersActions = {
    getUserByRoomObjectId: RoomStore['getUserByRoomObjectId'];
    updateUsers: RoomStore['updateUsers'];
    updateUser: RoomStore['updateUser'];
    updateUserPartial: RoomStore['updateUserPartial'];
    removeUser: RoomStore['removeUser'];
    setBadges: RoomStore['setBadges'];
}

export const extractRoomUsersActions = (store: RoomStore) => ({
    getUserDataByIndex: store.getUserByRoomObjectId,
    updateUsers: store.updateUsers,
    updateUser: store.updateUser,
    updateUserPartial: store.updateUserPartial,
    removeUser: store.removeUser,
    setBadges: store.setBadges,
});