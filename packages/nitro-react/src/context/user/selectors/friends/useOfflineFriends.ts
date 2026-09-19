import { useFriends } from './useFriends';

export const useOfflineFriends = () => {
    const friends = useFriends();

    return Object.values(friends).filter(x => !x.isOnline);
};
