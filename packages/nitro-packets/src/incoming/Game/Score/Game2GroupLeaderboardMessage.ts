import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GroupLeaderboardMessageType = {
  // no fields

};

export class Game2GroupLeaderboardMessage implements IIncomingPacket<Game2GroupLeaderboardMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GroupLeaderboardMessageType
  {

    const packet: Game2GroupLeaderboardMessageType = {
    };

    return packet;
  }
}
