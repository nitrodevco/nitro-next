import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISearchResultList, SearchResultListParser } from './SearchResultListParser';

export interface ISearchResultSet {
    searchCodeOriginal: string;
    filteringData: string;
    blocks: ISearchResultList[];
}

export const SearchResultSetParser = (wrapper: IMessageDataWrapper): ISearchResultSet => {
    const result: ISearchResultSet = {
        searchCodeOriginal: wrapper.readString(),
        filteringData: wrapper.readString(),
        blocks: [],
    };

    let count = wrapper.readInt();

    while (count > 0) {
        result.blocks.push(SearchResultListParser(wrapper));

        count--;
    }

    return result;
};
