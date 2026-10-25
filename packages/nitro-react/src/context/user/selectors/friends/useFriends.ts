import { useUserStore } from '../../useUserStore';

/** The user's friends, by player id. */
export const useFriends = () => useUserStore(x => x.friends);
