import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YoutubeDisplayVideoMessageType = {
  // no fields

};

export class YoutubeDisplayVideoMessage implements IIncomingPacket<YoutubeDisplayVideoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YoutubeDisplayVideoMessageType
  {

    const packet: YoutubeDisplayVideoMessageType = {
    };

    return packet;
  }
}
