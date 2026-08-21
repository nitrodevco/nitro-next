import { FriendsContextProvider } from "#base/context"

import { FriendListComponent } from "./FriendListComponent"

/**
 * MessengerComponent moved out to Nitro.tsx's Pixi tree (see MainView.tsx) once its view was
 * ported to theme-pixi - FriendListComponent still renders theme/ (DOM) views, so it can't
 * follow until FriendList itself is migrated. Both still share FriendsContextProvider, which
 * Messenger doesn't itself consume - only FriendListComponent needs it, so this wrapper still
 * exists purely for that.
 */
export const FriendListWrapper = () => {
    return (
        <FriendsContextProvider>
            <FriendListComponent />
        </FriendsContextProvider>
    );
}