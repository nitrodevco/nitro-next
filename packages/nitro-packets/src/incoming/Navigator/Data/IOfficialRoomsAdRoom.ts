// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IRoomInfo } from './RoomSettingsParser';

export interface IOfficialRoomsAdRoom {
    index: number;
    popupCaption: string;
    popupDesc: string;
    showDetails: boolean;
    picText: string;
    picRef: string;
    folderId: number;
    userCount: number;
    type: number;
    tag?: string;
    guestRoomData?: IRoomInfo;
    open?: boolean;
}
