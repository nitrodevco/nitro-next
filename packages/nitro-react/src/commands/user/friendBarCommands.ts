/**
 * What the friend bar asks of the rest of the client - `HabboFriendBarData`'s `followToRoom`,
 * `startConversation` and `findNewFriends`, each with the `EventLogMessageComposer` it sends
 * beside the request - and `HabboFriendBarView.toggleCollapsedState`'s save of the bar's state.
 */
import { EventLogComposer, FindNewFriendsComposer, FollowFriendComposer, SetUIFlagsComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { UiFlagEnum, userStore } from '#base/context/user';

import { openMessengerConversation } from './messengerCommands';

/** The `EventLogMessageComposer` every friend bar action sends: category `Navigation`, type `Friend Bar`. */
const logFriendBarAction = (send: Send, action: string) => send(new EventLogComposer({ event: 'Navigation', data: 'Friend Bar', action, extraString: '', extraInt: 0 }));

/** `followToRoom`: a tab's `btn_visit`. */
export const followFriendFromBar = (send: Send, friendId: number) => {
    send(new FollowFriendComposer({ playerId: friendId }));
    logFriendBarAction(send, 'go.friendbar');
};

/** `startConversation`: a tab's `btn_chat`. */
export const startFriendBarConversation = (send: Send, friendId: number) => {
    openMessengerConversation(send, friendId);
    logFriendBarAction(send, 'chat_btn_click');
};

/** `findNewFriends`: the find friends tab's button; the server answers with `FindFriendsProcessResult`. */
export const findNewFriends = (send: Send) => {
    send(new FindNewFriendsComposer({}));
    logFriendBarAction(send, 'find_friends_btn_click');
};

/** `toggleCollapsedState`: the other state, saved to the account's UI flags (`SetUIFlagsMessageComposer`). */
export const saveFriendBarExpanded = (send: Send, expanded: boolean) => send(new SetUIFlagsComposer({ flags: userStore.getState().setUiFlag(UiFlagEnum.FriendBarExpanded, expanded) }));
