import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintableItemResultMessageType = {
    mintResult: number;
};

export class CollectibleMintableItemResultMessage implements IIncomingPacket<CollectibleMintableItemResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleMintableItemResultMessageType {
        const packet: CollectibleMintableItemResultMessageType = {
            mintResult: wrapper.readShort(),
        };

        return packet;
    }
}
