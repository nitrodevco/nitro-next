// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCatalogPageComposerType = {
    pageId: number;
    offerId: number;
    catalogType: string;
};

export class GetCatalogPageComposer implements IOutgoingPacket<GetCatalogPageComposerType> {
    public constructor(private params: GetCatalogPageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pageId,
            this.params.offerId,
            this.params.catalogType,
        ];
    }
}
