import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

import type { IRoomInfo } from "../../Navigator/Data/RoomSettingsParser";
import { RoomSettingsParser } from "../../Navigator/Data/RoomSettingsParser";

export interface ISearchResultList {
    searchCode: string;
    text: string;
    actionAllowed: number;
    forceClosed: boolean;
    viewMode: number;
    guestRooms: IRoomInfo[];
}

export const SearchResultListParser = (wrapper: IMessageDataWrapper): ISearchResultList => {
    const list: ISearchResultList = {
        searchCode: wrapper.readString(),
        text: wrapper.readString(),
        actionAllowed: wrapper.readInt(),
        forceClosed: wrapper.readBoolean(),
        viewMode: wrapper.readInt(),
        guestRooms: []
    };

    let count = wrapper.readInt();

    while (count > 0) {
        // the SWF reuses GuestRoomData here — RoomSettingsParser is its equivalent
        list.guestRooms.push(RoomSettingsParser(wrapper));

        count--;
    }

    return list;
}
