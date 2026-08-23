import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendListUpdateActionType } from './FriendListUpdateActionType';
import { IMessengerFriend } from './IMessengerFriend';
import { IMessengerUpdate } from './IMessengerUpdate';
import { MessengerFriendParser } from './MessengerFriendParser';

export const MessengerUpdateParser = (wrapper: IMessageDataWrapper): IMessengerUpdate => {
    const actionType = wrapper.readInt();

    let friendId = -1;
    let friend: IMessengerFriend | undefined = undefined;

    if (actionType === FriendListUpdateActionType.Removed) friendId = wrapper.readInt();
    else {
        friend = MessengerFriendParser(wrapper);

        friendId = friend.playerId;
    }

    return {
        actionType,
        friendId,
        friend,
    };
};
