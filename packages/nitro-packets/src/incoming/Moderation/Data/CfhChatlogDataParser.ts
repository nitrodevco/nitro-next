import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ICfhChatlogData } from './ICfhChatlogData';
import { RoomChatlogDataParser } from './RoomChatlogDataParser';

export const CfhChatlogDataParser = (wrapper: IMessageDataWrapper): ICfhChatlogData => {
    return {
        callId: wrapper.readInt(),
        callerUserId: wrapper.readInt(),
        reportedUserId: wrapper.readInt(),
        chatRecordId: wrapper.readInt(),
        chatRecord: RoomChatlogDataParser(wrapper),
    };
};
