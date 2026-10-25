// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `CollectibleWalletAddressesMessageEvent` (parser `§_-02y§`): the user's Collector (stardust)
 * wallet, then the wallets linked to the account. `walletAddresses` is the parser's: the stardust
 * wallet first when there is one, then the linked ones.
 */
export type CollectibleWalletAddressesMessageType = {
    stardustWalletAddress: string;
    walletAddresses: string[];
};

export class CollectibleWalletAddressesMessage implements IIncomingPacket<CollectibleWalletAddressesMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleWalletAddressesMessageType {
        const stardustWalletAddress = wrapper.readString();
        const walletAddresses: string[] = [];

        if (stardustWalletAddress !== '') walletAddresses.push(stardustWalletAddress);

        const count = wrapper.readInt();

        for (let i = 0; i < count; i++) walletAddresses.push(wrapper.readString());

        return { stardustWalletAddress, walletAddresses };
    }
}
