import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PlayListSongAddedMessageType = {
  // no fields

};

export class PlayListSongAddedMessage implements IIncomingPacket<PlayListSongAddedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PlayListSongAddedMessageType
  {

    const packet: PlayListSongAddedMessageType = {
    };

    return packet;
  }
}
