import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CatalogPageWithEarliestExpiryMessageType = {
    pageName: string;
    secondsToExpiry: number;
    image: string;
};

export class CatalogPageWithEarliestExpiryMessage implements IIncomingPacket<CatalogPageWithEarliestExpiryMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogPageWithEarliestExpiryMessageType {
        const packet: CatalogPageWithEarliestExpiryMessageType = {
            pageName: wrapper.readString(),
            secondsToExpiry: wrapper.readInt(),
            image: wrapper.readString(),
        };

        return packet;
    }
}
