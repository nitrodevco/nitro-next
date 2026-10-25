import { useFriends } from './useFriends';

/** The user's friends who are offline. */
export const useOfflineFriends = () => {
    const friends = useFriends();

    return Object.values(friends).filter(x => !x.isOnline);
};
