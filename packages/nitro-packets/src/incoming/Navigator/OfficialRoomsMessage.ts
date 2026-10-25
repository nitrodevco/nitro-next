import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IOfficialRoomsAdRoom } from './Data/IOfficialRoomsAdRoom';
import { IOfficialRoomsData } from './Data/IOfficialRoomsData';
import { IOfficialRoomsPromotedRoom } from './Data/IOfficialRoomsPromotedRoom';
import { OfficialRoomsAdRoomParser } from './Data/OfficialRoomsAdRoomParser';
import { OfficialRoomsDataParser } from './Data/OfficialRoomsDataParser';
import { OfficialRoomsPromotedRoomParser } from './Data/OfficialRoomsPromotedRoomParser';

export type OfficialRoomsMessageType = {
    data: IOfficialRoomsData;
    adRoom?: IOfficialRoomsAdRoom;
    promotedRooms: IOfficialRoomsPromotedRoom;
};

export class OfficialRoomsMessage implements IIncomingPacket<OfficialRoomsMessageType> {
    public parse(wrapper: IMessageDataWrapper): OfficialRoomsMessageType {
        let adRoom: IOfficialRoomsAdRoom | undefined;
        const data = OfficialRoomsDataParser(wrapper);
        const loc2 = wrapper.readInt();
        if (loc2 > 0) {
            adRoom = OfficialRoomsAdRoomParser(wrapper);
        }
        const promotedRooms = OfficialRoomsPromotedRoomParser(wrapper);
        return { data, adRoom, promotedRooms };
    }
}
