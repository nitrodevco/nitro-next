import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CatalogPublishedMessageType = {
    instantlyRefreshCatalogue: boolean;
    newFurniDataHash: string;
};

export class CatalogPublishedMessage implements IIncomingPacket<CatalogPublishedMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogPublishedMessageType {
        const packet: CatalogPublishedMessageType = {
            instantlyRefreshCatalogue: false,
            newFurniDataHash: '',
        };

        packet.instantlyRefreshCatalogue = wrapper.readBoolean();
        if (wrapper.bytesAvailable) {
            packet.newFurniDataHash = wrapper.readString();
        }

        return packet;
    }
}
