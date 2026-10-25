import { useUserStore } from '../../useUserStore';

/** The friend requests the friend list holds, by requester id. */
export const useFriendRequests = () => useUserStore(x => x.requests);
