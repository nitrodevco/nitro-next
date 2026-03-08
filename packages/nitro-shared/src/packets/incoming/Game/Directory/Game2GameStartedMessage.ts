import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameStartedMessageType = {
  // no fields

};

export class Game2GameStartedMessage implements IIncomingPacket<Game2GameStartedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameStartedMessageType
  {

    const packet: Game2GameStartedMessageType = {
    };

    return packet;
  }
}
