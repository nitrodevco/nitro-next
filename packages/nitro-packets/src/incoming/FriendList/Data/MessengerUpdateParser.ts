import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendListUpdateActionType } from './FriendListUpdateActionType';
import { IMessengerFriend } from './IMessengerFriend';
import { IMessengerUpdate } from './IMessengerUpdate';
import { MessengerFriendParser } from './MessengerFriendParser';

/**
 * One entry of Flash `FriendListUpdateMessageParser`: -1 carries the removed friend's id, 0 and 1 a
 * `FriendData`; any other action type carries nothing (friendId -1, which the friends store skips).
 */
export const MessengerUpdateParser = (wrapper: IMessageDataWrapper): IMessengerUpdate => {
    const actionType = wrapper.readInt();

    let friendId = -1;
    let friend: IMessengerFriend | undefined = undefined;

    if (actionType === Number(FriendListUpdateActionType.Removed)) friendId = wrapper.readInt();
    else if ((actionType === Number(FriendListUpdateActionType.Updated)) || (actionType === Number(FriendListUpdateActionType.Added))) {
        friend = MessengerFriendParser(wrapper);

        friendId = friend.playerId;
    }

    return {
        actionType,
        friendId,
        friend,
    };
};
