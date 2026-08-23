import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISavedSearch, SavedSearchParser } from './SavedSearchParser';

export interface ITopLevelContext {
    searchCode: string;
    quickLinks: ISavedSearch[];
}

export const TopLevelContextParser = (wrapper: IMessageDataWrapper): ITopLevelContext => {
    const context: ITopLevelContext = {
        searchCode: wrapper.readString(),
        quickLinks: [],
    };

    let count = wrapper.readInt();

    while (count > 0) {
        context.quickLinks.push(SavedSearchParser(wrapper));

        count--;
    }

    return context;
};
