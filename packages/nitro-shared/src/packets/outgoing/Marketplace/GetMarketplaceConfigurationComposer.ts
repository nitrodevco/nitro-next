import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMarketplaceConfigurationComposerType = object;

export class GetMarketplaceConfigurationComposer implements IOutgoingPacket<GetMarketplaceConfigurationComposerType> {
    public constructor(private params: GetMarketplaceConfigurationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
