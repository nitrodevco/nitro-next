import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameCancelledMessageMessageType = {
  // no fields

};

export class Game2GameCancelledMessageMessage implements IIncomingPacket<Game2GameCancelledMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameCancelledMessageMessageType
  {

    const packet: Game2GameCancelledMessageMessageType = {
    };

    return packet;
  }
}
