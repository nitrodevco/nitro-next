import { useUserStore } from '../../useUserStore';

export const useFriendRequests = () => useUserStore(x => x.requests);
