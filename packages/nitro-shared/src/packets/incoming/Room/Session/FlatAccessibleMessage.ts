import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatAccessibleMessageType = {
  roomId: number;
  username: string;
};

export class FlatAccessibleMessage implements IIncomingPacket<FlatAccessibleMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FlatAccessibleMessageType
  {

    const packet: FlatAccessibleMessageType = {
      roomId: wrapper.readInt(),
      username: wrapper.readString(),
    };

    return packet;
  }
}
