import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2AccountGameStatusMessageMessageType = {
  // no fields

};

export class Game2AccountGameStatusMessageMessage implements IIncomingPacket<Game2AccountGameStatusMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2AccountGameStatusMessageMessageType
  {

    const packet: Game2AccountGameStatusMessageMessageType = {
    };

    return packet;
  }
}
