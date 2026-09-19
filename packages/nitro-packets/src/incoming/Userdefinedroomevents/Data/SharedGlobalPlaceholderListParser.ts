import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ISharedGlobalPlaceholderList } from './ISharedGlobalPlaceholderList';
import { SharedGlobalPlaceholderParser } from './SharedGlobalPlaceholderParser';

export const SharedGlobalPlaceholderListParser = (wrapper: IMessageDataWrapper): ISharedGlobalPlaceholderList => {
    return {
        sharedPlaceholders: ParseArray(wrapper, SharedGlobalPlaceholderParser),
    };
};
