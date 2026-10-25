// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IGuestRoomSearchResultData } from './IGuestRoomSearchResultData';
import { IOfficialRoomsAdRoom } from './IOfficialRoomsAdRoom';
import { OfficialRoomsAdRoomParser } from './OfficialRoomsAdRoomParser';
import { RoomSettingsParser } from './RoomSettingsParser';

export const GuestRoomSearchResultDataParser = (wrapper: IMessageDataWrapper): IGuestRoomSearchResultData => {
    let ad: IOfficialRoomsAdRoom | undefined;
    const searchType = wrapper.readInt();
    const searchParam = wrapper.readString();
    const rooms = ParseArray(wrapper, RoomSettingsParser);
    const loc4 = wrapper.readBoolean();
    if (loc4) {
        ad = OfficialRoomsAdRoomParser(wrapper);
    }
    return { searchType, searchParam, rooms, ad };
};
