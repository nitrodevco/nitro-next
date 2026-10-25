import { FriendsContextProvider } from '#base/context/friend';

import { FriendListComponent } from './FriendListComponent';

/**
 * The friend list's mount: `FriendListComponent` inside `FriendsContextProvider`, the
 * window-scoped store the friend list and its handlers read.
 */
export const FriendListWrapper = () => {
    return (
        <FriendsContextProvider>
            <FriendListComponent />
        </FriendsContextProvider>
    );
};
