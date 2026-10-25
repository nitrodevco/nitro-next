import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IRoomVisitsData } from './IRoomVisitsData';
import { RoomVisitsDatadParser } from './RoomVisitsDatadParser';

export const RoomVisitsDataParser = (wrapper: IMessageDataWrapper): IRoomVisitsData => {
    return {
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        rooms: ParseArray(wrapper, RoomVisitsDatadParser),
    };
};
