import { useHomeRoomId } from '#base/context';

import { useForwardToRoom } from './useForwardToRoom';

/**
 * `HabboNavigator.goToHomeRoom` -> `HabboNewNavigator.goToHomeRoom`: the home room is entered
 * through a room forward (`goToRoom(homeRoomId, "external")`), so a locked or password
 * protected home room still shows its popup. Returns false when no home room is set.
 *
 * `homeRoomId` may be passed for callers that hold a fresher value than the store has
 * rendered yet (the NavigatorSettings handler that just received it).
 */
export const useGoToHomeRoom = () => {
    const storedHomeRoomId = useHomeRoomId();
    const forwardToRoom = useForwardToRoom();

    return (homeRoomId: number = storedHomeRoomId) => {
        if (homeRoomId < 1) return false;

        forwardToRoom(homeRoomId);

        return true;
    };
};
