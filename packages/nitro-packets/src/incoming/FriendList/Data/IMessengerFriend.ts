import { AvatarGenderType } from "@nitrodevco/nitro-api";
import { MessengerFriendRelationType } from "./MessengerFriendRelationType";

export interface IMessengerFriend {
    readonly playerId: number;
    readonly name: string;
    readonly gender: AvatarGenderType;
    readonly isOnline: boolean;
    readonly canFollow: boolean;
    readonly figure: string;
    readonly categoryId: number;
    readonly motto: string;
    readonly realName: string;
    readonly facebookId: string;
    readonly persistedUser: boolean;
    readonly vipMember: boolean;
    readonly pocketHabboUser: boolean;
    readonly relationshipType: MessengerFriendRelationType;
}