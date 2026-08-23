import { CatalogTypeEnum, ICatalogNode, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogNodeParser } from './Data/CatalogNodeParser';

export type CatalogIndexMessageType = {
    root: ICatalogNode;
    newAdditionsAvailable: boolean;
    catalogType: CatalogTypeEnum;
};

export class CatalogIndexMessage implements IIncomingPacket<CatalogIndexMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogIndexMessageType {
        return {
            root: CatalogNodeParser(wrapper),
            newAdditionsAvailable: wrapper.readBoolean(),
            catalogType: wrapper.readString() as CatalogTypeEnum,
        };
    }
}
