import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/* FlatControllerAddedParser (§_-94§/§_-vL§) — flatId + FlatControllerData */
export type FlatControllerAddedEventMessageType = {
    roomId: number;
    userId: number;
    userName: string;
};

export class FlatControllerAddedEventMessage implements IIncomingPacket<FlatControllerAddedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatControllerAddedEventMessageType {
        return {
            roomId: wrapper.readInt(),
            userId: wrapper.readInt(),
            userName: wrapper.readString(),
        };
    }
}
