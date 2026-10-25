import { useFriends } from './useFriends';

/** The user's friends who are online. */
export const useOnlineFriends = () => {
    const friends = useFriends();

    return Object.values(friends).filter(x => x.isOnline);
};
