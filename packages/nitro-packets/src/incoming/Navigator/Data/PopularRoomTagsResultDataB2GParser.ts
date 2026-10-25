import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPopularRoomTagsResultDataB2G } from './IPopularRoomTagsResultDataB2G';

export const PopularRoomTagsResultDataB2GParser = (wrapper: IMessageDataWrapper): IPopularRoomTagsResultDataB2G => {
    return {
        tagName: wrapper.readString(),
        userCount: wrapper.readInt(),
    };
};
