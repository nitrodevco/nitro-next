import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YoutubeControlVideoMessageType = {
  // no fields

};

export class YoutubeControlVideoMessage implements IIncomingPacket<YoutubeControlVideoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): YoutubeControlVideoMessageType
  {

    const packet: YoutubeControlVideoMessageType = {
    };

    return packet;
  }
}
