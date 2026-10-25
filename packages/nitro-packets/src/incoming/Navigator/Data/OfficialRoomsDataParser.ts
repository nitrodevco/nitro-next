import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IOfficialRoomsData } from './IOfficialRoomsData';
import { OfficialRoomsAdRoomParser } from './OfficialRoomsAdRoomParser';

export const OfficialRoomsDataParser = (wrapper: IMessageDataWrapper): IOfficialRoomsData => {
    return {
        entries: ParseArray(wrapper, OfficialRoomsAdRoomParser),
    };
};
