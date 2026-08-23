import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FriendRequestStateType } from './FriendRequestStateType';
import { IFriendRequest } from './IFriendRequest';

export const FriendRequestParser = (wrapper: IMessageDataWrapper): IFriendRequest => {
    const packet = {
        playerId: wrapper.readInt(),
        name: wrapper.readString(),
        figure: wrapper.readString(),
        state: FriendRequestStateType.Open,
    } as IFriendRequest;

    return packet;
};
