import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftCollectionsMessageType = object;

export class NftCollectionsMessage implements IIncomingPacket<NftCollectionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftCollectionsMessageType {
        const packet: NftCollectionsMessageType = {
        };

        return packet;
    }
}
