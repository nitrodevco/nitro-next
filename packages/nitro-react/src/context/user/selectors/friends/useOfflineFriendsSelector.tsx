import { useFriendsSelector } from './useFriendsSelector';

export const useOfflineFriendsSelector = () => {
    const friends = useFriendsSelector();

    return Object.values(friends).filter(x => !x.isOnline);
};
