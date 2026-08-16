import { FriendListUpdateActionType } from "./FriendListUpdateActionType";
import { IMessengerFriend } from "./IMessengerFriend";

export interface IMessengerUpdate {
    readonly actionType: FriendListUpdateActionType;
    readonly friendId: number;
    readonly friend: IMessengerFriend | undefined;
}