import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IOfficialRoomsPromotedRoom } from './IOfficialRoomsPromotedRoom';
import { OfficialRoomsData3rParser } from './OfficialRoomsData3rParser';

export const OfficialRoomsPromotedRoomParser = (wrapper: IMessageDataWrapper): IOfficialRoomsPromotedRoom => {
    return {
        entries: ParseArray(wrapper, OfficialRoomsData3rParser),
    };
};
