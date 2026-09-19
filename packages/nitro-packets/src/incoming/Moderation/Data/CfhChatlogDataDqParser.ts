import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ICfhChatlogDataDq } from './ICfhChatlogDataDq';

export const CfhChatlogDataDqParser = (wrapper: IMessageDataWrapper): ICfhChatlogDataDq => {
    return {
        timeStamp: wrapper.readString(),
        chatterId: wrapper.readInt(),
        chatterName: wrapper.readString(),
        msg: wrapper.readString(),
        hasHighlighting: wrapper.readBoolean(),
    };
};
