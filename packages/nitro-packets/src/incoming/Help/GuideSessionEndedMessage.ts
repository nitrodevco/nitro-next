import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionEndedMessageType = object;

export class GuideSessionEndedMessage implements IIncomingPacket<GuideSessionEndedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuideSessionEndedMessageType {
        const packet: GuideSessionEndedMessageType = {
        };

        return packet;
    }
}
