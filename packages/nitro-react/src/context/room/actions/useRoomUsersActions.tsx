import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomUsersActions = () => useRoomContext(useShallow(x => ({
    getUserDataByIndex: x.getUserByRoomObjectId,
    updateUsers: x.updateUsers,
    updateUser: x.updateUser,
    updateUserPartial: x.updateUserPartial,
    removeUser: x.removeUser,
    setBadges: x.setBadges,
})));