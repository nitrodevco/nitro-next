import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameLongDataMessageType = {
  // no fields

};

export class Game2GameLongDataMessage implements IIncomingPacket<Game2GameLongDataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameLongDataMessageType
  {

    const packet: Game2GameLongDataMessageType = {
    };

    return packet;
  }
}
