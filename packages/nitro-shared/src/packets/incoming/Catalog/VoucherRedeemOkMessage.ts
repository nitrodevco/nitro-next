import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type VoucherRedeemOkMessageType = {
  // no fields

};

export class VoucherRedeemOkMessage implements IIncomingPacket<VoucherRedeemOkMessageType>
{
  public parse(wrapper: IMessageDataWrapper): VoucherRedeemOkMessageType
  {

    const packet: VoucherRedeemOkMessageType = {
    };

    return packet;
  }
}
