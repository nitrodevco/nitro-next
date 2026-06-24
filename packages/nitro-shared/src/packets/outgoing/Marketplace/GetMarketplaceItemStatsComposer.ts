import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMarketplaceItemStatsComposerType = object;

export class GetMarketplaceItemStatsComposer implements IOutgoingPacket<GetMarketplaceItemStatsComposerType> {
    public constructor(private params: GetMarketplaceItemStatsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
