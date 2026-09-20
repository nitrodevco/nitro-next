// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IWiredLogPage } from './IWiredLogPage';
import { WiredLogEntryParser } from './WiredLogEntryParser';

/** Flash `WiredLogPage`: each of the three filters sits behind its own flag, and the two numeric ones are bytes. */
export const WiredLogPageParser = (wrapper: IMessageDataWrapper): IWiredLogPage => {
    const totalEntries = wrapper.readInt();
    const currentPage = wrapper.readInt();
    const amount = wrapper.readInt();
    const elements = ParseArray(wrapper, WiredLogEntryParser);
    const logLevelFilter = wrapper.readBoolean() ? wrapper.readByte() : -1;
    const logSourceFilter = wrapper.readBoolean() ? wrapper.readByte() : -1;
    const query = wrapper.readBoolean() ? wrapper.readString() : undefined;

    return { totalEntries, currentPage, amount, elements, logLevelFilter, logSourceFilter, query };
};
