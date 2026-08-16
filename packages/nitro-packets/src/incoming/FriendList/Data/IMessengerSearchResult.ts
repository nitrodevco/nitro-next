import { AvatarGenderType } from "@nitrodevco/nitro-api";

export interface IMessengerSearchResult {
    readonly playerId: number;
    readonly name: string;
    readonly motto: string;
    readonly isOnline: boolean;
    readonly canFollow: boolean;
    readonly unknownString: string;
    readonly gender: AvatarGenderType;
    readonly figure: string;
    readonly realName: string;
}