import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintTokenCountMessageType = {
    totalTokens: number;
};

export class CollectibleMintTokenCountMessage implements IIncomingPacket<CollectibleMintTokenCountMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleMintTokenCountMessageType {
        const packet: CollectibleMintTokenCountMessageType = {
            totalTokens: wrapper.readInt(),
        };

        return packet;
    }
}
