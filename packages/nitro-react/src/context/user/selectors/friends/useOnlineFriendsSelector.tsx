import { useFriendsSelector } from './useFriendsSelector';

export const useOnlineFriendsSelector = () => {
    const friends = useFriendsSelector();

    return Object.values(friends).filter(x => x.isOnline);
};
