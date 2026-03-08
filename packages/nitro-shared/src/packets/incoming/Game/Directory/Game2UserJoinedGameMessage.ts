import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2UserJoinedGameMessageType = {
  // no fields

};

export class Game2UserJoinedGameMessage implements IIncomingPacket<Game2UserJoinedGameMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2UserJoinedGameMessageType
  {

    const packet: Game2UserJoinedGameMessageType = {
    };

    return packet;
  }
}
