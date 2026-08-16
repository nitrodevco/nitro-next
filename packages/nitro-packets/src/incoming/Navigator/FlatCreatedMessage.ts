import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatCreatedMessageType = {
  roomId: number;
  name: string;
};

export class FlatCreatedMessage implements IIncomingPacket<FlatCreatedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FlatCreatedMessageType
  {

    const packet: FlatCreatedMessageType = {
      roomId: wrapper.readInt(),
      name: wrapper.readString(),
    };

    return packet;
  }
}
