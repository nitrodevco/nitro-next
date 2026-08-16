import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreNotSpectatorMessageType = {
  roomId: number;
};

export class YouAreNotSpectatorMessage implements IIncomingPacket<YouAreNotSpectatorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YouAreNotSpectatorMessageType
  {

    const packet: YouAreNotSpectatorMessageType = {
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
