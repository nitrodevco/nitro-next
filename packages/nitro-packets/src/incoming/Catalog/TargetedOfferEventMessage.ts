import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TargetedOfferEventMessageType = object;

export class TargetedOfferEventMessage implements IIncomingPacket<TargetedOfferEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TargetedOfferEventMessageType {
        const packet: TargetedOfferEventMessageType = {
        };

        return packet;
    }
}
