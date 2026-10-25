import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NoSuchFlatMessageType = {
    flatId: number;
};

export class NoSuchFlatMessage implements IIncomingPacket<NoSuchFlatMessageType> {
    public parse(wrapper: IMessageDataWrapper): NoSuchFlatMessageType {
        const flatId = wrapper.readInt();
        return { flatId };
    }
}
