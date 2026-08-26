import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboBroadcastMessageType = {
    message: string;
};

export class HabboBroadcastMessage implements IIncomingPacket<HabboBroadcastMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboBroadcastMessageType {
        const packet: HabboBroadcastMessageType = {
            message: wrapper.readString()
        };

        return packet;
    }
}
