// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { FlatControllerParser } from './Data/FlatControllerParser';
import { IFlatController } from './Data/IFlatController';

export type FlatControllerAddedEventMessageType = {
    roomId: number;
    controller: IFlatController;
};

export class FlatControllerAddedEventMessage implements IIncomingPacket<FlatControllerAddedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatControllerAddedEventMessageType {
        return {
            roomId: wrapper.readInt(),
            controller: FlatControllerParser(wrapper),
        };
    }
}
