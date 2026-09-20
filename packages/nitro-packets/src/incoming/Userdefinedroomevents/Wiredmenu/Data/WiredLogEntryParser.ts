// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { IWiredLogEntry } from './IWiredLogEntry';

/** Flash `WiredLogEntry`. */
export const WiredLogEntryParser = (wrapper: IMessageDataWrapper): IWiredLogEntry => {
    return {
        id: ReadLong(wrapper),
        logLevel: wrapper.readByte(),
        logSource: wrapper.readByte(),
        logMessage: wrapper.readString(),
        timestamp: ReadLong(wrapper),
        timestampStr: wrapper.readString(),
    };
};
