import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { ILiftedRoomData } from '../Data/LiftedRoomDataParser';
import { LiftedRoomDataParser } from '../Data/LiftedRoomDataParser';

export type NavigatorLiftedRoomsMessageType = {
    liftedRooms: ILiftedRoomData[];
};

export class NavigatorLiftedRoomsMessage implements IIncomingPacket<NavigatorLiftedRoomsMessageType> {
    public parse(wrapper: IMessageDataWrapper): NavigatorLiftedRoomsMessageType {
        const packet: NavigatorLiftedRoomsMessageType = {
            liftedRooms: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.liftedRooms.push(LiftedRoomDataParser(wrapper));
            v1--;
        }

        return packet;
    }
}
