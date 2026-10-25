import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsOfferGiftableMessageType = {
    offerId: number;
    isGiftable: boolean;
};

/**
 * `IsOfferGiftableMessageEvent` (`IsOfferGiftableMessageParser`): the answer to `GetIsOfferGiftableComposer`.
 * Flash registers it and listens to it nowhere, as nothing calls `HabboCatalog.checkGiftable`.
 */
export class IsOfferGiftableMessage implements IIncomingPacket<IsOfferGiftableMessageType> {
    public parse(wrapper: IMessageDataWrapper): IsOfferGiftableMessageType {
        const offerId = wrapper.readInt();
        const isGiftable = wrapper.readBoolean();

        return { offerId, isGiftable };
    }
}
