import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type VoucherRedeemErrorMessageType = {
  // no fields

};

export class VoucherRedeemErrorMessage implements IIncomingPacket<VoucherRedeemErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): VoucherRedeemErrorMessageType
  {

    const packet: VoucherRedeemErrorMessageType = {
    };

    return packet;
  }
}
