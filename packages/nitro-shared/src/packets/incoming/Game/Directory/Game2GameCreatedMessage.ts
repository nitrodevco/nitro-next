import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameCreatedMessageType = {
  // no fields

};

export class Game2GameCreatedMessage implements IIncomingPacket<Game2GameCreatedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): Game2GameCreatedMessageType
  {

    const packet: Game2GameCreatedMessageType = {
    };

    return packet;
  }
}
