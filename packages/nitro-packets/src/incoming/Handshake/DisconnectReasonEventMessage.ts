import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type DisconnectReasonEventMessageType = object;

export class DisconnectReasonEventMessage implements IIncomingPacket<DisconnectReasonEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): DisconnectReasonEventMessageType {
        const packet: DisconnectReasonEventMessageType = {
        };

        return packet;
    }
}
