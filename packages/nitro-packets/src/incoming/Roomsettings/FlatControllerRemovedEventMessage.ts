import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* FlatControllerRemovedParser (§_-94§/§_-6w§) — flatId, userId */
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
