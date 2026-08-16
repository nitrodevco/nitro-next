import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NftCollectionsScoreMessageType = {
  // no fields

};

export class NftCollectionsScoreMessage implements IIncomingPacket<NftCollectionsScoreMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NftCollectionsScoreMessageType
  {

    const packet: NftCollectionsScoreMessageType = {
    };

    return packet;
  }
}
