import { IModeratorRoomInfoRoom } from './IModeratorRoomInfoRoom';

export interface IModeratorRoomInfoData {
    flatId: number;
    userCount: number;
    ownerInRoom: boolean;
    ownerId: number;
    ownerName: string;
    room: IModeratorRoomInfoRoom;
}
