import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCatalogPageWithEarliestExpiryComposerType = object;

export class GetCatalogPageWithEarliestExpiryComposer implements IOutgoingPacket<GetCatalogPageWithEarliestExpiryComposerType> {
    public constructor(private params: GetCatalogPageWithEarliestExpiryComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
