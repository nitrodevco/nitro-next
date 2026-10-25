import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionDetachedMessageType = object;

export class GuideSessionDetachedMessage implements IIncomingPacket<GuideSessionDetachedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuideSessionDetachedMessageType {
        const packet: GuideSessionDetachedMessageType = {
        };

        return packet;
    }
}
