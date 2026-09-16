import { CatalogTypeEnum, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCatalogIndexComposerType = {
    catalogType: CatalogTypeEnum;
};

export class GetCatalogIndexComposer implements IOutgoingPacket<GetCatalogIndexComposerType> {
    public constructor(private params: GetCatalogIndexComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.catalogType,
        ];
    }
}
