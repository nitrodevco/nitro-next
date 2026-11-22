/**
 * The friends list in the preview host's design window, drawn by the game's own `FriendListView` with
 * sample friends - online and offline - and friend requests, on the state's tab, as `MessengerInit` and
 * `FriendRequests` would fill them, so its rows are drawn inside it and a press names them
 * (`DesignPreviewView`). Nothing is sent. Not a Flash feature.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { FriendRequestStateType, IFriendRequest, IMessengerFriend, MessengerFriendRelationType } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { FriendsContextProvider } from '#base/context/friend';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { FriendListView } from '#base/views/friendlist/FriendListView';

import { designState, FRIENDS_WINDOW } from './designStates';

const FIGURE = 'hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64';

const friend = (playerId: number, name: string, isOnline: boolean, motto: string): IMessengerFriend => ({
    playerId, name, gender: AvatarGenderType.Male, isOnline, canFollow: isOnline, figure: FIGURE, categoryId: 0, motto, realName: '', facebookId: '',
    persistedUser: true, vipMember: false, pocketHabboUser: false, relationshipType: MessengerFriendRelationType.Zero,
});

export const SAMPLE_FRIENDS = [ friend(1, 'Bonnie', true, 'Building all day'), friend(2, 'Frank', true, 'Welcome!'), friend(3, 'Marcy', false, 'Back soon'), friend(4, 'Pixel', false, 'Pixels everywhere') ];
const REQUESTS: IFriendRequest[] = [ { playerId: 5, name: 'Newbie', figure: FIGURE, state: FriendRequestStateType.Open }, { playerId: 6, name: 'Quizmaster', figure: FIGURE, state: FriendRequestStateType.Open } ];

export const DesignFriendListView = ({ state }: { state: string }) => {
    useEffect(() => {
        const own = userStore.getState();
        const { processFriends, replaceFriendRequests } = own;

        processFriends(SAMPLE_FRIENDS);
        replaceFriendRequests(REQUESTS);

        return () => userStore.setState(own, true);
    }, []);

    useEffect(() => {
        const tab = designState(FRIENDS_WINDOW, state)?.tab ?? 'friends';

        systemStore.getState().showWindow('friendlist', { tab: tab as 'friends' });
    }, [ state ]);

    return (
        <FriendsContextProvider>
            <FriendListView />
        </FriendsContextProvider>
    );
};
