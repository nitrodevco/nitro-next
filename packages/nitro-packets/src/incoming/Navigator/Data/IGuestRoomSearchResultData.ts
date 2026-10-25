// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOfficialRoomsAdRoom } from './IOfficialRoomsAdRoom';
import { IRoomInfo } from './RoomSettingsParser';

export interface IGuestRoomSearchResultData {
    searchType: number;
    searchParam: string;
    rooms: IRoomInfo[];
    ad?: IOfficialRoomsAdRoom;
}
