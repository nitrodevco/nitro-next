// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { CfhChatlogDataDqParser } from './CfhChatlogDataDqParser';
import { IRoomChatlogData } from './IRoomChatlogData';

export const RoomChatlogDataParser = (wrapper: IMessageDataWrapper): IRoomChatlogData => {
    const context = new Map();
    const recordType = wrapper.readByte();
    const count = wrapper.readShort();
    for (let i = 0; i < count; i++) {
        const key = wrapper.readString();
        const dataType = wrapper.readByte();

        switch (dataType) {
            case 0:
                context.set(key, wrapper.readBoolean());
                break;
            case 1:
                context.set(key, wrapper.readInt());
                break;
            case 2:
                context.set(key, wrapper.readString());
                break;
            default:
                throw new Error(`Unknown data type ${dataType}`);
        }
    }
    const chatlog = ParseArray(wrapper, CfhChatlogDataDqParser);
    return { recordType, context, chatlog };
};
