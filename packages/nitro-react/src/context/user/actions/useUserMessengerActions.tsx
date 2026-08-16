import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useUserMessengerActions = () => useUserContext(useShallow(x => ({
    setFriendLimits: x.setFriendLimits,
    setFriendCategories: x.setFriendCategories,
    processFriends: x.processFriends,
    processFriendUpdates: x.processFriendUpdates,
    processFriendRequests: x.processFriendRequests
})));