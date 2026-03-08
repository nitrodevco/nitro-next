import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HeightMapUpdateMessageType = {
  // no fields

};

export class HeightMapUpdateMessage implements IIncomingPacket<HeightMapUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HeightMapUpdateMessageType
  {

    const packet: HeightMapUpdateMessageType = {
    };

    return packet;
  }
}
