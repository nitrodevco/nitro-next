import { FriendsContextProvider } from '#base/context';

import { FriendListComponent } from './FriendListComponent';

/**
 * Now mounted in Nitro.tsx's Pixi tree (see MainView.tsx) alongside MessengerComponent, since
 * FriendListComponent renders theme-pixi/ views now too - a plain React Context provider like
 * FriendsContextProvider works the same wrapping Pixi JSX as it did wrapping DOM JSX.
 */
export const FriendListWrapper = () => {
    return (
        <FriendsContextProvider>
            <FriendListComponent />
        </FriendsContextProvider>
    );
};
