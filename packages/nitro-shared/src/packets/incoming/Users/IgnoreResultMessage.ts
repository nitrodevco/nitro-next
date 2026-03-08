import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IgnoreResultMessageType = {
    result: number;
    userId: number;
};

export class IgnoreResultMessage implements IIncomingPacket<IgnoreResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): IgnoreResultMessageType {
        const packet: IgnoreResultMessageType = {
            result: wrapper.readInt(),
            userId: wrapper.readInt(),
        };

        return packet;
    }
}
