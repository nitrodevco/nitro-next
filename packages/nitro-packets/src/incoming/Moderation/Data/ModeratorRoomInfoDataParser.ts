import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IModeratorRoomInfoData } from './IModeratorRoomInfoData';
import { ModeratorRoomInfoRoomParser } from './ModeratorRoomInfoRoomParser';

export const ModeratorRoomInfoDataParser = (wrapper: IMessageDataWrapper): IModeratorRoomInfoData => {
    return {
        flatId: wrapper.readInt(),
        userCount: wrapper.readInt(),
        ownerInRoom: wrapper.readBoolean(),
        ownerId: wrapper.readInt(),
        ownerName: wrapper.readString(),
        room: ModeratorRoomInfoRoomParser(wrapper),
    };
};
