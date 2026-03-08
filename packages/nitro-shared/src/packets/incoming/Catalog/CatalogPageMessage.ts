import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CatalogPageMessageType = {};

export class CatalogPageMessage implements IIncomingPacket<CatalogPageMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogPageMessageType {
        const packet: CatalogPageMessageType = {};

        return packet;
    }
}
