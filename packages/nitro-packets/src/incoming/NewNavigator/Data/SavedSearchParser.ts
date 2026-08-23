import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ISavedSearch {
    id: number;
    searchCode: string;
    filter: string;
    localization: string;
}

export const SavedSearchParser = (wrapper: IMessageDataWrapper): ISavedSearch => {
    return {
        id: wrapper.readInt(),
        searchCode: wrapper.readString(),
        filter: wrapper.readString(),
        localization: wrapper.readString(),
    };
};
