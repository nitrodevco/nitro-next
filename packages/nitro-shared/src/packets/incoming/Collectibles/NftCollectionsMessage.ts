import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftCollectionsMessageType = {
  // no fields

};

export class NftCollectionsMessage implements IIncomingPacket<NftCollectionsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftCollectionsMessageType
  {

    const packet: NftCollectionsMessageType = {
    };

    return packet;
  }
}
