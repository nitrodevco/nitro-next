import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CollectibleMintTokenOffersMessageType = object;

export class CollectibleMintTokenOffersMessage implements IIncomingPacket<CollectibleMintTokenOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleMintTokenOffersMessageType {
        const packet: CollectibleMintTokenOffersMessageType = {
        };

        return packet;
    }
}
