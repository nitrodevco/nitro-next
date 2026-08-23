import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExtendedProfileChangedMessageType = {
    userId: number;
};

export class ExtendedProfileChangedMessage implements IIncomingPacket<ExtendedProfileChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): ExtendedProfileChangedMessageType {
        const packet: ExtendedProfileChangedMessageType = {
            userId: wrapper.readInt(),
        };

        return packet;
    }
}
