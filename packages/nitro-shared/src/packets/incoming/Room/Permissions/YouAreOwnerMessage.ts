import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreOwnerMessageType = {
  roomId: number;
};

export class YouAreOwnerMessage implements IIncomingPacket<YouAreOwnerMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YouAreOwnerMessageType
  {

    const packet: YouAreOwnerMessageType = {
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
