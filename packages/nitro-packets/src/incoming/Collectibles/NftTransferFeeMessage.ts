import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftTransferFeeMessageType = {
  // no fields

};

export class NftTransferFeeMessage implements IIncomingPacket<NftTransferFeeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftTransferFeeMessageType
  {

    const packet: NftTransferFeeMessageType = {
    };

    return packet;
  }
}
