// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FlatControllerParser } from './Data/FlatControllerParser';
import { IFlatController } from './Data/IFlatController';

export type FlatControllersEventMessageType = {
    roomId: number;
    controllers: IFlatController[];
};

export class FlatControllersEventMessage implements IIncomingPacket<FlatControllersEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatControllersEventMessageType {
        const packet: FlatControllersEventMessageType = {
            roomId: wrapper.readInt(),
            controllers: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.controllers.push(FlatControllerParser(wrapper));

            count--;
        }

        return packet;
    }
}
