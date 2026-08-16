import { RoomObjectUserType } from "@nitrodevco/nitro-api";

export interface IRoomAvatar {
    webId: number;
    name: string;
    motto: string;
    figure: string;
    objectId: number;
    x: number;
    y: number;
    z: number;
    bodyRotation: number;
    avatarType: RoomObjectUserType;
}