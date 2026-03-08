import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2EnterArenaMessageType = {
  // no fields

};

export class Game2EnterArenaMessage implements IIncomingPacket<Game2EnterArenaMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2EnterArenaMessageType
  {

    const packet: Game2EnterArenaMessageType = {
    };

    return packet;
  }
}
