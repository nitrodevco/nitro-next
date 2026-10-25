import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftTransferFeeMessageType = {
    transferFee: number;
};

export class NftTransferFeeMessage implements IIncomingPacket<NftTransferFeeMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftTransferFeeMessageType {
        const packet: NftTransferFeeMessageType = {
            transferFee: wrapper.readInt(),
        };

        return packet;
    }
}
