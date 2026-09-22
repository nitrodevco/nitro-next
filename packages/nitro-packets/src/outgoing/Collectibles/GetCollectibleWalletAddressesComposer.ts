// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetCollectibleWalletAddressesMessageComposer`: the user's wallets.
 */
export type GetCollectibleWalletAddressesComposerType = object;

export class GetCollectibleWalletAddressesComposer implements IOutgoingPacket<GetCollectibleWalletAddressesComposerType> {
    public constructor(private params: GetCollectibleWalletAddressesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
