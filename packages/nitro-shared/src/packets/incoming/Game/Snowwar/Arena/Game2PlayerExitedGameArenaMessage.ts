import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2PlayerExitedGameArenaMessageType = {
  // no fields

};

export class Game2PlayerExitedGameArenaMessage implements IIncomingPacket<Game2PlayerExitedGameArenaMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2PlayerExitedGameArenaMessageType
  {

    const packet: Game2PlayerExitedGameArenaMessageType = {
    };

    return packet;
  }
}
