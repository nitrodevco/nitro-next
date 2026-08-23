import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftTransferAssetsResultMessageType = object;

export class NftTransferAssetsResultMessage implements IIncomingPacket<NftTransferAssetsResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftTransferAssetsResultMessageType {
        const packet: NftTransferAssetsResultMessageType = {
        };

        return packet;
    }
}
