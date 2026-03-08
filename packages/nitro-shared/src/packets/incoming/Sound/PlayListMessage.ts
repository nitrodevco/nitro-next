import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PlayListMessageType = {
  // no fields

};

export class PlayListMessage implements IIncomingPacket<PlayListMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PlayListMessageType
  {

    const packet: PlayListMessageType = {
    };

    return packet;
  }
}
