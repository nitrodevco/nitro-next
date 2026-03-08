import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HeightMapMessageType = {
  width: number;
  size: number;
};

export class HeightMapMessage implements IIncomingPacket<HeightMapMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HeightMapMessageType
  {

    const packet: HeightMapMessageType = {
      width: wrapper.readInt(),
      size: wrapper.readInt(),
    };

    return packet;
  }
}
