/**
 * The friends list in the preview host's design window, drawn by the game's own `FriendListView` with
 * sample friends - online and offline - and friend requests, on the state's tab, as `MessengerInit` and
 * `FriendRequests` would fill them, so its rows are drawn inside it and a press names them
 * (`DesignPreviewView`). Nothing is sent. Not a Flash feature.
 */
import { useEffect } from 'react';

import { FriendsContextProvider } from '#base/context/friend';
import { useWindowActions } from '#base/context/system';
import { fillSampleFriends } from '#base/preview/designSamples';
import { designState, FRIENDS_WINDOW } from '#base/preview/designStates';
import { usePreviewSample } from '#base/preview/usePreviewSample';
import { FriendListView } from '#base/views/friendlist/FriendListView';

export const DesignFriendListView = ({ state }: { state: string }) => {
    const { showWindow } = useWindowActions();

    usePreviewSample(fillSampleFriends);

    useEffect(() => {
        const tab = designState(FRIENDS_WINDOW, state)?.tab ?? 'friends';

        showWindow('friendlist', { tab: tab as 'friends' });
    }, [ state ]);

    return (
        <FriendsContextProvider>
            <FriendListView />
        </FriendsContextProvider>
    );
};
