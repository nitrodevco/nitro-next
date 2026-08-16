import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreSpectatorMessageType = {
  roomId: number;
};

export class YouAreSpectatorMessage implements IIncomingPacket<YouAreSpectatorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YouAreSpectatorMessageType
  {

    const packet: YouAreSpectatorMessageType = {
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
