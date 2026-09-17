import { useUserStore } from '../../useUserStore';

export const useFriends = () => useUserStore(x => x.friends);
