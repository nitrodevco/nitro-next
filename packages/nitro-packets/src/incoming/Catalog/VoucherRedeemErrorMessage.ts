import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type VoucherRedeemErrorMessageType = {
    errorCode: string;
};

export class VoucherRedeemErrorMessage implements IIncomingPacket<VoucherRedeemErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): VoucherRedeemErrorMessageType {
        const packet: VoucherRedeemErrorMessageType = {
            errorCode: wrapper.readString(),
        };

        return packet;
    }
}
