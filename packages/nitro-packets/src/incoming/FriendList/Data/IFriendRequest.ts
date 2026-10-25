import { FriendRequestStateType } from './FriendRequestStateType';

export interface IFriendRequest {
    readonly playerId: number;
    readonly name: string;
    readonly figure: string;
    state: FriendRequestStateType;
}
