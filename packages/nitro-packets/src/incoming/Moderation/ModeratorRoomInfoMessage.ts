import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IModeratorRoomInfoData } from './Data/IModeratorRoomInfoData';
import { ModeratorRoomInfoDataParser } from './Data/ModeratorRoomInfoDataParser';

export type ModeratorRoomInfoMessageType = {
    data: IModeratorRoomInfoData;
};

export class ModeratorRoomInfoMessage implements IIncomingPacket<ModeratorRoomInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorRoomInfoMessageType {
        const data = ModeratorRoomInfoDataParser(wrapper);
        return { data };
    }
}
