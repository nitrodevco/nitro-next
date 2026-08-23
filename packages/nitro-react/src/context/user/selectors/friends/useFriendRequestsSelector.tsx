import { useUserContext } from '../../useUserContext';

export const useFriendRequestsSelector = () => useUserContext(x => x.requests);
