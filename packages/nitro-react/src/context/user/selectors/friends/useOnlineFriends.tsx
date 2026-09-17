import { useFriends } from './useFriends';

export const useOnlineFriends = () => {
    const friends = useFriends();

    return Object.values(friends).filter(x => x.isOnline);
};
