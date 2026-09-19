import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPopularRoomTagsResultData } from './Data/IPopularRoomTagsResultData';
import { PopularRoomTagsResultDataParser } from './Data/PopularRoomTagsResultDataParser';

export type PopularRoomTagsResultMessageType = {
    data: IPopularRoomTagsResultData;
};

export class PopularRoomTagsResultMessage implements IIncomingPacket<PopularRoomTagsResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): PopularRoomTagsResultMessageType {
        const data = PopularRoomTagsResultDataParser(wrapper);
        return { data };
    }
}
