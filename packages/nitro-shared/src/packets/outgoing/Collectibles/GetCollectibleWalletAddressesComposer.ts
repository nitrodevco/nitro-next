import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCollectibleWalletAddressesComposerType = object;

export class GetCollectibleWalletAddressesComposer implements IOutgoingPacket<GetCollectibleWalletAddressesComposerType> {
    public constructor(private params: GetCollectibleWalletAddressesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
