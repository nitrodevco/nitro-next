import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FloodControlMessageType = {
    seconds: number;
};

export class FloodControlMessage implements IIncomingPacket<FloodControlMessageType> {
    public parse(wrapper: IMessageDataWrapper): FloodControlMessageType {
        const packet: FloodControlMessageType = {
            seconds: wrapper.readInt(),
        };

        return packet;
    }
}
