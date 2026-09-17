// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatControllerRemovedEventMessageType = {
    roomId: number;
    userId: number;
};

export class FlatControllerRemovedEventMessage implements IIncomingPacket<FlatControllerRemovedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatControllerRemovedEventMessageType {
        return {
            roomId: wrapper.readInt(),
            userId: wrapper.readInt(),
        };
    }
}
