import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CfhChatlogDataParser } from './Data/CfhChatlogDataParser';
import { ICfhChatlogData } from './Data/ICfhChatlogData';

export type CfhChatlogMessageType = {
    data: ICfhChatlogData;
};

export class CfhChatlogMessage implements IIncomingPacket<CfhChatlogMessageType> {
    public parse(wrapper: IMessageDataWrapper): CfhChatlogMessageType {
        const data = CfhChatlogDataParser(wrapper);
        return { data };
    }
}
