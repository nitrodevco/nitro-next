// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IWiredUserVariablesPage } from './IWiredUserVariablesPage';
import { WiredUserVariablesElementParser } from './WiredUserVariablesElementParser';

/** Flash `WiredUserVariablesPage`. */
export const WiredUserVariablesPageParser = (wrapper: IMessageDataWrapper): IWiredUserVariablesPage => {
    const variableId = wrapper.readString();
    const totalEntries = wrapper.readInt();
    const currentPage = wrapper.readInt();
    const amount = wrapper.readInt();
    const elements = ParseArray(wrapper, WiredUserVariablesElementParser);
    const userTypeFilter = wrapper.readInt();
    const sortTypeFilter = wrapper.readInt();

    return { variableId, totalEntries, currentPage, amount, elements, userTypeFilter, sortTypeFilter };
};
