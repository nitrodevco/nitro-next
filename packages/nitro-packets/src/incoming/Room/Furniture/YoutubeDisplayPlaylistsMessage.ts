import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YoutubeDisplayPlaylistsMessageType = {
  // no fields

};

export class YoutubeDisplayPlaylistsMessage implements IIncomingPacket<YoutubeDisplayPlaylistsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YoutubeDisplayPlaylistsMessageType
  {

    const packet: YoutubeDisplayPlaylistsMessageType = {
    };

    return packet;
  }
}
