import type { ICatalogPage, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogPageParser } from './Data/CatalogPageParser';

export type CatalogPageMessageType = {
    page: ICatalogPage;
};

export class CatalogPageMessage implements IIncomingPacket<CatalogPageMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogPageMessageType {
        return {
            page: CatalogPageParser(wrapper)
        }
    }
}
