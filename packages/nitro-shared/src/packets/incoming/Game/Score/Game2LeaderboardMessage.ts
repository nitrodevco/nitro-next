import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2LeaderboardMessageType = {
  // no fields

};

export class Game2LeaderboardMessage implements IIncomingPacket<Game2LeaderboardMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2LeaderboardMessageType
  {

    const packet: Game2LeaderboardMessageType = {
    };

    return packet;
  }
}
