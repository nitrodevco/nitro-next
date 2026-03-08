import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2ArenaEnteredMessageType = {
  // no fields

};

export class Game2ArenaEnteredMessage implements IIncomingPacket<Game2ArenaEnteredMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2ArenaEnteredMessageType
  {

    const packet: Game2ArenaEnteredMessageType = {
    };

    return packet;
  }
}
