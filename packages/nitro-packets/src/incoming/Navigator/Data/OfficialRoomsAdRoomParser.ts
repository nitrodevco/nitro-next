// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IOfficialRoomsAdRoom } from './IOfficialRoomsAdRoom';
import { IRoomInfo, RoomSettingsParser } from './RoomSettingsParser';

export const OfficialRoomsAdRoomParser = (wrapper: IMessageDataWrapper): IOfficialRoomsAdRoom => {
    let tag: string | undefined;
    let guestRoomData: IRoomInfo | undefined;
    let open: boolean | undefined;
    const index = wrapper.readInt();
    const popupCaption = wrapper.readString();
    const popupDesc = wrapper.readString();
    const showDetails = wrapper.readInt() === 1;
    const picText = wrapper.readString();
    const picRef = wrapper.readString();
    const folderId = wrapper.readInt();
    const userCount = wrapper.readInt();
    const type = wrapper.readInt();
    if (type === 1) {
        tag = wrapper.readString();
    } else if (type === 2) {
        guestRoomData = RoomSettingsParser(wrapper);
    } else {
        open = wrapper.readBoolean();
    }
    return { index, popupCaption, popupDesc, showDetails, picText, picRef, folderId, userCount, type, tag, guestRoomData, open };
};
