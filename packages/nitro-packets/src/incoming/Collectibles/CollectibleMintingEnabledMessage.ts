import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintingEnabledMessageType = {
    enabled: boolean;
};

export class CollectibleMintingEnabledMessage implements IIncomingPacket<CollectibleMintingEnabledMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleMintingEnabledMessageType {
        const packet: CollectibleMintingEnabledMessageType = {
            enabled: wrapper.readBoolean(),
        };

        return packet;
    }
}
