import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CitizenshipVipOfferPromoEnabledMessageType = object;

export class CitizenshipVipOfferPromoEnabledMessage implements IIncomingPacket<CitizenshipVipOfferPromoEnabledMessageType> {
    public parse(wrapper: IMessageDataWrapper): CitizenshipVipOfferPromoEnabledMessageType {
        return {};
    }
}
