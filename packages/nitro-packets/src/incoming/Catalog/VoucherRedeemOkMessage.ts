import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type VoucherRedeemOkMessageType = {
    productDescription: string;
    productName: string;
};

export class VoucherRedeemOkMessage implements IIncomingPacket<VoucherRedeemOkMessageType> {
    public parse(wrapper: IMessageDataWrapper): VoucherRedeemOkMessageType {
        const packet: VoucherRedeemOkMessageType = {
            productDescription: wrapper.readString(),
            productName: wrapper.readString(),
        };

        return packet;
    }
}
