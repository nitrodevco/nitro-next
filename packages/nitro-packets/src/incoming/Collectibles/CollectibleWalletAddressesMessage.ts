import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleWalletAddressesMessageType = object;

export class CollectibleWalletAddressesMessage implements IIncomingPacket<CollectibleWalletAddressesMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleWalletAddressesMessageType {
        const packet: CollectibleWalletAddressesMessageType = {
        };

        return packet;
    }
}
