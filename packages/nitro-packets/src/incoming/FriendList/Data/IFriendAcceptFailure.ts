import { FriendListErrorCodeType } from './FriendListErrorCodeType';

export interface IFriendAcceptFailure {
    readonly playerId: number;
    readonly errorCode: FriendListErrorCodeType;
}
