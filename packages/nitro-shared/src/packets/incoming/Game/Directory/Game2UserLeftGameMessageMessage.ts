import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2UserLeftGameMessageMessageType = {
  // no fields

};

export class Game2UserLeftGameMessageMessage implements IIncomingPacket<Game2UserLeftGameMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2UserLeftGameMessageMessageType
  {

    const packet: Game2UserLeftGameMessageMessageType = {
    };

    return packet;
  }
}
