import type { RoomStore } from "../RoomStore"

export type RoomUsersActions = {
    updateUsers: RoomStore['updateUsers'];
    updateUser: RoomStore['updateUser'];
    updateUserPartial: RoomStore['updateUserPartial'];
    removeUser: RoomStore['removeUser'];
    setBadges: RoomStore['setBadges'];
}

export const extractRoomUsersActions = (store: RoomStore) => ({
    updateUsers: store.updateUsers,
    updateUser: store.updateUser,
    updateUserPartial: store.updateUserPartial,
    removeUser: store.removeUser,
    setBadges: store.setBadges,
});