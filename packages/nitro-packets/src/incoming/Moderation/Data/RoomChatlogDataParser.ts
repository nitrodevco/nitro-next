// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CfhChatlogDataDqParser } from './CfhChatlogDataDqParser';
import { ICfhChatlogDataDq } from './ICfhChatlogDataDq';
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
    // The line count is a short (`_-g1M.as:54`), not ParseArray's int.
    const chatlog: ICfhChatlogDataDq[] = [];

    for (let lines = wrapper.readShort(); lines > 0; lines--) chatlog.push(CfhChatlogDataDqParser(wrapper));
    return { recordType, context, chatlog };
};
