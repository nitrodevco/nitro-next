import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameNotFoundMessageMessageType = {
  // no fields

};

export class Game2GameNotFoundMessageMessage implements IIncomingPacket<Game2GameNotFoundMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameNotFoundMessageMessageType
  {

    const packet: Game2GameNotFoundMessageMessageType = {
    };

    return packet;
  }
}
