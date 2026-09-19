import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { GuestRoomSearchResultDataParser } from './Data/GuestRoomSearchResultDataParser';
import { IGuestRoomSearchResultData } from './Data/IGuestRoomSearchResultData';

export type GuestRoomSearchResultMessageType = {
    data: IGuestRoomSearchResultData;
};

export class GuestRoomSearchResultMessage implements IIncomingPacket<GuestRoomSearchResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuestRoomSearchResultMessageType {
        const data = GuestRoomSearchResultDataParser(wrapper);
        return { data };
    }
}
