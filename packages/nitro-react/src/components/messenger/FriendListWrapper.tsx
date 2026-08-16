import { FriendsContextProvider } from "#base/context"

import { FriendListComponent } from "./FriendListComponent"
import { MessengerComponent } from "./MessengerComponent"

export const FriendListWrapper = () => {
    return (
        <FriendsContextProvider>
            <FriendListComponent />
            <MessengerComponent />
        </FriendsContextProvider>
    );
}