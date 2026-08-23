import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CitizenshipVipOfferPromoEnabledEventMessageType = object;

export class CitizenshipVipOfferPromoEnabledEventMessage implements IIncomingPacket<CitizenshipVipOfferPromoEnabledEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): CitizenshipVipOfferPromoEnabledEventMessageType {
        const packet: CitizenshipVipOfferPromoEnabledEventMessageType = {
        };

        return packet;
    }
}
