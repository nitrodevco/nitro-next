import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LimitedOfferAppearingNextMessageType = {
    appearsInSeconds: number;
    pageId: number;
    offerId: number;
    productClassName: string;
};

export class LimitedOfferAppearingNextMessage implements IIncomingPacket<LimitedOfferAppearingNextMessageType> {
    public parse(wrapper: IMessageDataWrapper): LimitedOfferAppearingNextMessageType {
        return {
            appearsInSeconds: wrapper.readInt(),
            pageId: wrapper.readInt(),
            offerId: wrapper.readInt(),
            productClassName: wrapper.readString()
        }
    }
}
