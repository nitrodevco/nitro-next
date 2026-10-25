// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IOfficialRoomsData3r } from './IOfficialRoomsData3r';
import { RoomSettingsParser } from './RoomSettingsParser';

export const OfficialRoomsData3rParser = (wrapper: IMessageDataWrapper): IOfficialRoomsData3r => {
    const rooms: unknown[] = [];
    const code = wrapper.readString();
    const leaderFigure = wrapper.readString();
    const count = wrapper.readInt();
    const bestRoom = RoomSettingsParser(wrapper);
    // the count includes the best room, read above
    for (let i = 1; i < count; i++) rooms.push(RoomSettingsParser(wrapper));
    return { code, leaderFigure, bestRoom, rooms };
};
