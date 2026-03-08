import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NowPlayingMessageType = {
  // no fields

};

export class NowPlayingMessage implements IIncomingPacket<NowPlayingMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NowPlayingMessageType
  {

    const packet: NowPlayingMessageType = {
    };

    return packet;
  }
}
