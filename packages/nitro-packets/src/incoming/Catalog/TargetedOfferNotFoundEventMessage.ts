import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TargetedOfferNotFoundEventMessageType = object;

export class TargetedOfferNotFoundEventMessage implements IIncomingPacket<TargetedOfferNotFoundEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TargetedOfferNotFoundEventMessageType {
        const packet: TargetedOfferNotFoundEventMessageType = {
        };

        return packet;
    }
}
