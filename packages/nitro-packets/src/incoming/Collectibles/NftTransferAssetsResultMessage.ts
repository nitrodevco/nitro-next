import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftTransferAssetsResultMessageType = {
  // no fields

};

export class NftTransferAssetsResultMessage implements IIncomingPacket<NftTransferAssetsResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftTransferAssetsResultMessageType
  {

    const packet: NftTransferAssetsResultMessageType = {
    };

    return packet;
  }
}
