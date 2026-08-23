import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FloodControlMessageType = {
    seconds: number;
};

export class FloodControlMessage implements IIncomingPacket<FloodControlMessageType> {
    public parse(wrapper: IMessageDataWrapper): FloodControlMessageType {
        const packet: FloodControlMessageType = {
            seconds: 0,
        };

        packet.seconds = wrapper.readInt();

        return packet;
    }
}
