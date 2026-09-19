import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { IWiredErrorLogsError } from './IWiredErrorLogsError';

export const WiredErrorLogsErrorParser = (wrapper: IMessageDataWrapper): IWiredErrorLogsError => {
    return {
        errorId: wrapper.readInt(),
        errorName: wrapper.readString(),
        category: wrapper.readString(),
        throwCount: wrapper.readInt(),
        msSinceLastOccurrence: ReadLong(wrapper),
    };
};
