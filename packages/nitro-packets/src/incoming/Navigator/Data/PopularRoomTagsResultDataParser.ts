import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IPopularRoomTagsResultData } from './IPopularRoomTagsResultData';
import { PopularRoomTagsResultDataB2GParser } from './PopularRoomTagsResultDataB2GParser';

export const PopularRoomTagsResultDataParser = (wrapper: IMessageDataWrapper): IPopularRoomTagsResultData => {
    return {
        tags: ParseArray(wrapper, PopularRoomTagsResultDataB2GParser),
    };
};
